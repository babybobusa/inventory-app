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
import type { PhotoChange } from '../storage/adapter'
import type { ItemDraft, ItemRecord } from '../types'

type InventoryContextValue = {
  items: ItemRecord[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  getById: (id: string) => ItemRecord | undefined
  save: (draft: ItemDraft, opts: { id?: string; photo?: PhotoChange; hasPhoto?: boolean }) => Promise<ItemRecord>
  remove: (id: string) => Promise<void>
  exportJson: () => Promise<string>
  importJson: (json: string) => Promise<number>
}

const InventoryContext = createContext<InventoryContextValue | null>(null)

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
    async (draft: ItemDraft, opts: { id?: string; photo?: PhotoChange; hasPhoto?: boolean }) => {
      const now = Date.now()
      const existing = opts.id ? await inventoryDb.get(opts.id) : undefined
      let hasPhoto = existing?.hasPhoto ?? false
      if (opts.photo instanceof Blob) hasPhoto = true
      else if (opts.photo === null) hasPhoto = false
      if (typeof opts.hasPhoto === 'boolean') hasPhoto = opts.hasPhoto

      const item: ItemRecord = {
        id: opts.id ?? crypto.randomUUID(),
        name: draft.name.trim(),
        description: draft.description.trim(),
        quantity: Number(draft.quantity) || 0,
        cost: Number(draft.cost) || 0,
        recommendedPrice: recommendedPrice(Number(draft.cost) || 0),
        location: draft.location.trim() || 'TBD',
        application: draft.application.trim(),
        hasPhoto,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      }
      await inventoryDb.upsert(item, opts.photo)
      await refresh()
      return item
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
    }),
    [items, loading, error, refresh, getById, save, remove, exportJson, importJson],
  )

  return createElement(InventoryContext.Provider, { value }, children)
}

export function useInventory(): InventoryContextValue {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used inside InventoryProvider')
  return ctx
}
