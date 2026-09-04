export const MARKUP_RATE = 1.2
export const MAX_PHOTOS = 3
export const DEFAULT_LOW_STOCK_THRESHOLD = 2

export type ItemRecord = {
  id: string
  name: string
  description: string
  quantity: number
  cost: number
  recommendedPrice: number
  location: string
  application: string
  /** Number of stored photos for this item (0–3). */
  photoCount: number
  /** When true, compare quantity to lowStockThreshold. */
  lowStockAlertEnabled: boolean
  /** Alert when quantity is at or below this number (if enabled). */
  lowStockThreshold: number
  createdAt: number
  updatedAt: number
}

export type ItemDraft = {
  name: string
  description: string
  quantity: number
  cost: number
  location: string
  application: string
  lowStockAlertEnabled: boolean
  lowStockThreshold: number
}

export type ExportItem = ItemRecord & {
  /** Legacy single-photo field (first photo). */
  photoDataUrl?: string
  /** New multi-photo field (max 3). */
  photoDataUrls?: string[]
  /** Legacy boolean; treated as photoCount >= 1 when photoCount is missing. */
  hasPhoto?: boolean
}

export type ExportPayload = {
  version: 1
  exportedAt: string
  items: ExportItem[]
}

/** Normalize photoCount from a raw DB / import row. */
export function normalizePhotoCount(row: {
  photoCount?: unknown
  hasPhoto?: unknown
}): number {
  const n = Number(row.photoCount)
  if (Number.isFinite(n) && n >= 0) {
    return Math.min(MAX_PHOTOS, Math.floor(n))
  }
  return row.hasPhoto ? 1 : 0
}

export function normalizeLowStockEnabled(row: {
  lowStockAlertEnabled?: unknown
}): boolean {
  return Boolean(row.lowStockAlertEnabled)
}

export function normalizeLowStockThreshold(row: {
  lowStockThreshold?: unknown
}): number {
  const n = Number(row.lowStockThreshold)
  if (Number.isFinite(n) && n >= 0) return n
  return DEFAULT_LOW_STOCK_THRESHOLD
}

/** An item is alerting when the toggle is on and qty is at or below the threshold. */
export function isLowStock(item: {
  lowStockAlertEnabled?: boolean
  quantity: number
  lowStockThreshold?: number
}): boolean {
  if (!item.lowStockAlertEnabled) return false
  const threshold =
    typeof item.lowStockThreshold === 'number' && Number.isFinite(item.lowStockThreshold)
      ? item.lowStockThreshold
      : DEFAULT_LOW_STOCK_THRESHOLD
  return item.quantity <= threshold
}
