import type { ExportPayload, ItemRecord } from '../types'
import type { InventoryAdapter, PhotoChange } from './adapter'

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

  const adapter: InventoryAdapter = {
    async init() {
      await db()
    },

    async list() {
      const store = (await db()).transaction(ITEMS, 'readonly').objectStore(ITEMS)
      const rows = await asRequest<ItemRecord[]>(store.getAll())
      return rows.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    },

    async get(id) {
      const store = (await db()).transaction(ITEMS, 'readonly').objectStore(ITEMS)
      return await asRequest<ItemRecord | undefined>(store.get(id))
    },

    async upsert(item, photo?: PhotoChange) {
      const database = await db()
      const tx = database.transaction([ITEMS, PHOTOS], 'readwrite')
      tx.objectStore(ITEMS).put(item)
      if (photo === null) {
        tx.objectStore(PHOTOS).delete(item.id)
      } else if (photo instanceof Blob) {
        tx.objectStore(PHOTOS).put(photo, item.id)
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

    async getPhoto(id) {
      const store = (await db()).transaction(PHOTOS, 'readonly').objectStore(PHOTOS)
      const blob = await asRequest<Blob | undefined>(store.get(id))
      return blob
    },

    async exportJson() {
      const items = await adapter.list()
      const packed: ExportPayload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        items: [],
      }
      for (const item of items) {
        let photoDataUrl: string | undefined
        if (item.hasPhoto) {
          const blob = await adapter.getPhoto(item.id)
          if (blob) photoDataUrl = await blobToDataUrl(blob)
        }
        packed.items.push({ ...item, photoDataUrl })
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
        const photoDataUrl = row.photoDataUrl
        const item: ItemRecord = {
          id: row.id,
          name: row.name,
          description: typeof row.description === 'string' ? row.description : '',
          quantity: Number(row.quantity) || 0,
          cost: Number(row.cost) || 0,
          recommendedPrice: Number(row.recommendedPrice) || 0,
          location: typeof row.location === 'string' ? row.location : 'TBD',
          application: typeof row.application === 'string' ? row.application : '',
          hasPhoto: Boolean(photoDataUrl) || Boolean(row.hasPhoto),
          createdAt: Number(row.createdAt) || Date.now(),
          updatedAt: Date.now(),
        }
        let photo: Blob | undefined
        if (photoDataUrl) {
          try {
            photo = await dataUrlToBlob(photoDataUrl)
            item.hasPhoto = true
          } catch {
            item.hasPhoto = false
          }
        }
        await adapter.upsert(item, photo)
        count += 1
      }
      return count
    },
  }

  return adapter
}

export const inventoryDb: InventoryAdapter = createIndexedDbAdapter()
