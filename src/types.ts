export const MARKUP_RATE = 1.2
export const MAX_PHOTOS = 3
export const DEFAULT_LOW_STOCK_THRESHOLD = 2

export const TIME_ALERT_INTERVAL_DAYS = [15, 30, 45, 90, 180, 365] as const
export type TimeAlertIntervalDays = (typeof TIME_ALERT_INTERVAL_DAYS)[number]

export const TIME_ALERT_INTERVAL_OPTIONS: { value: TimeAlertIntervalDays; label: string }[] = [
  { value: 15, label: '15 days' },
  { value: 30, label: '30 days' },
  { value: 45, label: '45 days' },
  { value: 90, label: '3 months' },
  { value: 180, label: '6 months' },
  { value: 365, label: '1 year' },
]

const DAY_MS = 86_400_000

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
  /** When true, remind on a schedule from timeAlertAnchorAt. */
  timeAlertEnabled: boolean
  /** Interval in days (15|30|45|90|180|365) when enabled; 0 when off. */
  timeAlertIntervalDays: number
  /** Unix ms when the current interval window started. */
  timeAlertAnchorAt: number
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
  timeAlertEnabled: boolean
  timeAlertIntervalDays: number
  timeAlertAnchorAt: number
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

export function normalizeTimeAlertEnabled(row: {
  timeAlertEnabled?: unknown
}): boolean {
  return Boolean(row.timeAlertEnabled)
}

export function normalizeTimeAlertIntervalDays(row: {
  timeAlertIntervalDays?: unknown
}): number {
  const n = Number(row.timeAlertIntervalDays)
  if ((TIME_ALERT_INTERVAL_DAYS as readonly number[]).includes(n)) return n
  return 0
}

export function normalizeTimeAlertAnchorAt(row: {
  timeAlertAnchorAt?: unknown
}): number {
  const n = Number(row.timeAlertAnchorAt)
  if (Number.isFinite(n) && n >= 0) return n
  return 0
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

export function isTimeAlertDue(
  item: {
    timeAlertEnabled?: boolean
    timeAlertIntervalDays?: number
    timeAlertAnchorAt?: number
  },
  now = Date.now(),
): boolean {
  if (!item.timeAlertEnabled) return false
  const intervalDays = Number(item.timeAlertIntervalDays) || 0
  if (intervalDays <= 0) return false
  const anchor = Number(item.timeAlertAnchorAt) || 0
  return now >= anchor + intervalDays * DAY_MS
}

export function isAlerting(
  item: {
    lowStockAlertEnabled?: boolean
    quantity: number
    lowStockThreshold?: number
    timeAlertEnabled?: boolean
    timeAlertIntervalDays?: number
    timeAlertAnchorAt?: number
  },
  now = Date.now(),
): boolean {
  return isLowStock(item) || isTimeAlertDue(item, now)
}

export function timeAlertIntervalLabel(days: number): string {
  const found = TIME_ALERT_INTERVAL_OPTIONS.find((o) => o.value === days)
  return found ? found.label : `${days} days`
}

/** Build alert menu meta lines for quantity and/or time reminders. */
export function alertMetaLines(item: ItemRecord): string {
  const parts: string[] = []
  if (isLowStock(item)) {
    parts.push(`Qty ${item.quantity} · alert at ${item.lowStockThreshold}`)
  }
  if (isTimeAlertDue(item)) {
    parts.push(`Due every ${timeAlertIntervalLabel(item.timeAlertIntervalDays)}`)
  } else if (item.timeAlertEnabled && item.timeAlertIntervalDays > 0) {
    parts.push('Time reminder')
  }
  return parts.join(' · ') || 'Alert'
}
