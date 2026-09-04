import type { ExportPayload, ItemRecord } from '../types'
import {
  MAX_PHOTOS,
  normalizeLowStockEnabled,
  normalizeLowStockThreshold,
  normalizePhotoCount,
} from '../types'
import type { InventoryAdapter, PhotosChange } from './adapter'

const DB_NAME = 'inventory-app'
const DB_VERSION = 1
const ITEMS = 'items'
const PHOTOS = 'photos'

function asRequest<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error ?? new Error('IndexedDB request failed'))
  })
}

function asTx(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed'))
    tx.onabort = () => reject(tx.error ?? new Error('IndexedDB transaction aborted'))
  })
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error('Could not read photo'))
    reader.readAsDataURL(blob)
  })
}

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl)
  return await res.blob()
}

/** Legacy single Blob, or array of Blob|null (length ≤ MAX_PHOTOS). */
function coercePhotoSlots(raw: unknown): (Blob | undefined)[] {
  const slots: (Blob | undefined)[] = [undefined, undefined, undefined]
  if (!raw) return slots
  if (raw instanceof Blob) {
    slots[0] = raw
    return slots
  }
  if (Array.isArray(raw)) {
    for (let i = 0; i < MAX_PHOTOS; i += 1) {
      const entry = raw[i]
      slots[i] = entry instanceof Blob ? entry : undefined
    }
  }
  return slots
}

function countPhotos(slots: (Blob | undefined)[]): number {
  return slots.reduce((n, b) => n + (b ? 1 : 0), 0)
}

function packSlots(slots: (Blob | undefined)[]): (Blob | null)[] {
  return slots.map((b) => b ?? null)
}

function normalizeItem(raw: ItemRecord & { hasPhoto?: boolean }): ItemRecord {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    quantity: raw.quantity,
    cost: raw.cost,
    recommendedPrice: raw.recommendedPrice,
    location: raw.location,
    application: raw.application,
    photoCount: normalizePhotoCount(raw),
    lowStockAlertEnabled: normalizeLowStockEnabled(raw),
    lowStockThreshold: normalizeLowStockThreshold(raw),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(ITEMS)) {
        db.createObjectStore(ITEMS, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(PHOTOS)) {
        db.createObjectStore(PHOTOS)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error ?? new Error('Could not open inventory database'))
  })
}

export function createIndexedDbAdapter(): InventoryAdapter {
  let dbPromise: Promise<IDBDatabase> | null = null

  const db = () => {
    if (!dbPromise) dbPromise = openDb()
    return dbPromise
  }

  async function readSlots(
    store: IDBObjectStore,
    id: string,
  ): Promise<(Blob | undefined)[]> {
    const raw = await asRequest<unknown>(store.get(id))
    return coercePhotoSlots(raw)
  }

  const adapter: InventoryAdapter = {
    async init() {
      await db()
    },

    async list() {
      const store = (await db()).transaction(ITEMS, 'readonly').objectStore(ITEMS)
      const rows = await asRequest<Array<ItemRecord & { hasPhoto?: boolean }>>(store.getAll())
      return rows
        .map(normalizeItem)
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    },

    async get(id) {
      const store = (await db()).transaction(ITEMS, 'readonly').objectStore(ITEMS)
      const raw = await asRequest<(ItemRecord & { hasPhoto?: boolean }) | undefined>(store.get(id))
      return raw ? normalizeItem(raw) : undefined
    },

    async upsert(item, photos?: PhotosChange) {
      const database = await db()
      const tx = database.transaction([ITEMS, PHOTOS], 'readwrite')
      const photoStore = tx.objectStore(PHOTOS)

      let slots = await readSlots(photoStore, item.id)
      if (photos) {
        for (let i = 0; i < MAX_PHOTOS; i += 1) {
          const change = photos[i]
          if (change instanceof Blob) slots[i] = change
          else if (change === null) slots[i] = undefined
        }
      }

      // Keep photos dense in slots 0..n-1 so the primary thumbnail is always slot 0.
      const compacted: (Blob | undefined)[] = [undefined, undefined, undefined]
      let writeAt = 0
      for (const blob of slots) {
        if (blob && writeAt < MAX_PHOTOS) {
          compacted[writeAt] = blob
          writeAt += 1
        }
      }
      slots = compacted

      const next: ItemRecord = {
        ...item,
        photoCount: countPhotos(slots),
      }
      tx.objectStore(ITEMS).put(next)

      if (next.photoCount === 0) {
        photoStore.delete(item.id)
      } else {
        photoStore.put(packSlots(slots), item.id)
      }

      await asTx(tx)
    },

    async remove(id) {
      const database = await db()
      const tx = database.transaction([ITEMS, PHOTOS], 'readwrite')
      tx.objectStore(ITEMS).delete(id)
      tx.objectStore(PHOTOS).delete(id)
      await asTx(tx)
    },

    async getPhoto(id, slot = 0) {
      const store = (await db()).transaction(PHOTOS, 'readonly').objectStore(PHOTOS)
      const slots = await readSlots(store, id)
      const index = Math.max(0, Math.min(MAX_PHOTOS - 1, slot))
      return slots[index]
    },

    async getPhotos(id) {
      const store = (await db()).transaction(PHOTOS, 'readonly').objectStore(PHOTOS)
      return await readSlots(store, id)
    },

    async exportJson() {
      const items = await adapter.list()
      const packed: ExportPayload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        items: [],
      }
      for (const item of items) {
        const slots = await adapter.getPhotos(item.id)
        const photoDataUrls: string[] = []
        for (const blob of slots) {
          if (!blob) continue
          photoDataUrls.push(await blobToDataUrl(blob))
        }
        packed.items.push({
          ...item,
          photoDataUrls,
          photoDataUrl: photoDataUrls[0],
          hasPhoto: photoDataUrls.length > 0,
        })
      }
      return JSON.stringify(packed, null, 2)
    },

    async importJson(json) {
      const parsed = JSON.parse(json) as ExportPayload
      if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.items)) {
        throw new Error('This file is not a valid inventory backup.')
      }
      let count = 0
      for (const row of parsed.items) {
        if (!row || typeof row.id !== 'string' || typeof row.name !== 'string') continue

        const urls: string[] = []
        if (Array.isArray(row.photoDataUrls)) {
          for (const u of row.photoDataUrls) {
            if (typeof u === 'string' && u && urls.length < MAX_PHOTOS) urls.push(u)
          }
        } else if (typeof row.photoDataUrl === 'string' && row.photoDataUrl) {
          urls.push(row.photoDataUrl)
        }

        const photos: PhotosChange = [null, null, null]
        let photoCount = 0
        for (let i = 0; i < MAX_PHOTOS; i += 1) {
          const url = urls[i]
          if (!url) {
            photos[i] = null
            continue
          }
          try {
            photos[i] = await dataUrlToBlob(url)
            photoCount += 1
          } catch {
            photos[i] = null
          }
        }

        if (photoCount === 0 && !urls.length) {
          photoCount = normalizePhotoCount(row)
        }

        const item: ItemRecord = {
          id: row.id,
          name: row.name,
          description: typeof row.description === 'string' ? row.description : '',
          quantity: Number(row.quantity) || 0,
          cost: Number(row.cost) || 0,
          recommendedPrice: Number(row.recommendedPrice) || 0,
          location: typeof row.location === 'string' ? row.location : 'TBD',
          application: typeof row.application === 'string' ? row.application : '',
          photoCount,
          lowStockAlertEnabled: normalizeLowStockEnabled(row),
          lowStockThreshold: normalizeLowStockThreshold(row),
          createdAt: Number(row.createdAt) || Date.now(),
          updatedAt: Date.now(),
        }

        await adapter.upsert(item, photos)
        count += 1
      }
      return count
    },
  }

  return adapter
}

export const inventoryDb: InventoryAdapter = createIndexedDbAdapter()
