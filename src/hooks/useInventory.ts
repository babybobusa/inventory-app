import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { recommendedPrice } from '../money'
import { ensureSeeded } from '../seed/drywall'
import { inventoryDb } from '../storage/indexeddb'
import type { PhotosChange } from '../storage/adapter'
import type { ItemDraft, ItemRecord } from '../types'
import { isTimeAlertDue, MAX_PHOTOS } from '../types'

type InventoryContextValue = {
  items: ItemRecord[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  getById: (id: string) => ItemRecord | undefined
  save: (
    draft: ItemDraft,
    opts: { id?: string; photos?: PhotosChange; photoCount?: number },
  ) => Promise<ItemRecord>
  remove: (id: string) => Promise<void>
  exportJson: () => Promise<string>
  importJson: (json: string) => Promise<number>
  /** Reset time-alert anchors for due items (snooze / restart interval). */
  acknowledgeTimeAlerts: (ids: string[]) => Promise<void>
}

const InventoryContext = createContext<InventoryContextValue | null>(null)

function estimatePhotoCount(
  existingCount: number,
  photos: PhotosChange | undefined,
  override?: number,
): number {
  if (typeof override === 'number') {
    return Math.max(0, Math.min(MAX_PHOTOS, Math.floor(override)))
  }
  if (!photos) return existingCount
  const filled = [false, false, false]
  for (let i = 0; i < existingCount && i < MAX_PHOTOS; i += 1) filled[i] = true
  for (let i = 0; i < MAX_PHOTOS; i += 1) {
    const change = photos[i]
    if (change instanceof Blob) filled[i] = true
    else if (change === null) filled[i] = false
  }
  return filled.reduce((n, v) => n + (v ? 1 : 0), 0)
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    const all = await inventoryDb.list()
    setItems(all)
  }, [])

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        await inventoryDb.init()
        await ensureSeeded(inventoryDb)
        if (cancelled) return
        await refresh()
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not open local storage.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [refresh])

  const getById = useCallback(
    (id: string) => items.find((item) => item.id === id),
    [items],
  )

  const save = useCallback(
    async (
      draft: ItemDraft,
      opts: { id?: string; photos?: PhotosChange; photoCount?: number },
    ) => {
      const now = Date.now()
      const existing = opts.id ? await inventoryDb.get(opts.id) : undefined
      const photoCount = estimatePhotoCount(
        existing?.photoCount ?? 0,
        opts.photos,
        opts.photoCount,
      )

      const item: ItemRecord = {
        id: opts.id ?? crypto.randomUUID(),
        name: draft.name.trim(),
        description: draft.description.trim(),
        quantity: Number(draft.quantity) || 0,
        cost: Number(draft.cost) || 0,
        recommendedPrice: recommendedPrice(Number(draft.cost) || 0),
        location: draft.location.trim() || 'TBD',
        application: draft.application.trim(),
        photoCount,
        lowStockAlertEnabled: Boolean(draft.lowStockAlertEnabled),
        lowStockThreshold:
          Number.isFinite(Number(draft.lowStockThreshold)) && Number(draft.lowStockThreshold) >= 0
            ? Number(draft.lowStockThreshold)
            : 2,
        timeAlertEnabled: Boolean(draft.timeAlertEnabled),
        timeAlertIntervalDays:
          draft.timeAlertEnabled && Number(draft.timeAlertIntervalDays) > 0
            ? Number(draft.timeAlertIntervalDays)
            : 0,
        timeAlertAnchorAt: Number(draft.timeAlertAnchorAt) || 0,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      }
      await inventoryDb.upsert(item, opts.photos)
      await refresh()
      const saved = await inventoryDb.get(item.id)
      return saved ?? item
    },
    [refresh],
  )

  const remove = useCallback(
    async (id: string) => {
      await inventoryDb.remove(id)
      await refresh()
    },
    [refresh],
  )

  const acknowledgeTimeAlerts = useCallback(
    async (ids: string[]) => {
      if (!ids.length) return
      const now = Date.now()
      let changed = false
      for (const id of ids) {
        const existing = await inventoryDb.get(id)
        if (!existing || !isTimeAlertDue(existing, now)) continue
        await inventoryDb.upsert({
          ...existing,
          timeAlertAnchorAt: now,
          updatedAt: now,
        })
        changed = true
      }
      if (changed) await refresh()
    },
    [refresh],
  )

  const exportJson = useCallback(async () => inventoryDb.exportJson(), [])

  const importJson = useCallback(
    async (json: string) => {
      const count = await inventoryDb.importJson(json)
      await refresh()
      return count
    },
    [refresh],
  )

  const value = useMemo<InventoryContextValue>(
    () => ({
      items,
      loading,
      error,
      refresh,
      getById,
      save,
      remove,
      exportJson,
      importJson,
      acknowledgeTimeAlerts,
    }),
    [
      items,
      loading,
      error,
      refresh,
      getById,
      save,
      remove,
      exportJson,
      importJson,
      acknowledgeTimeAlerts,
    ],
  )

  return createElement(InventoryContext.Provider, { value }, children)
}

export function useInventory(): InventoryContextValue {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used inside InventoryProvider')
  return ctx
}
