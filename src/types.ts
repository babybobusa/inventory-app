export const MARKUP_RATE = 1.2
export const MAX_PHOTOS = 3

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
