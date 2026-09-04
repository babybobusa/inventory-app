import type { ItemRecord } from '../types'
import { MAX_PHOTOS } from '../types'

export { MAX_PHOTOS }

/**
 * Per-slot photo update for slots 0..(MAX_PHOTOS-1):
 * - Blob = set / replace that slot
 * - null = clear that slot
 * - undefined = leave that slot as-is
 * Pass an array of length ≤ MAX_PHOTOS.
 */
export type PhotosChange = Array<Blob | null | undefined>

/**
 * Thin storage interface. Today this is IndexedDB on the phone.
 * Later a NAS/network adapter can implement the same methods.
 */
export type InventoryAdapter = {
  init(): Promise<void>
  list(): Promise<ItemRecord[]>
  get(id: string): Promise<ItemRecord | undefined>
  upsert(item: ItemRecord, photos?: PhotosChange): Promise<void>
  remove(id: string): Promise<void>
  /** Photo at slot (default 0 = primary / first). */
  getPhoto(id: string, slot?: number): Promise<Blob | undefined>
  /** Up to MAX_PHOTOS slots; missing slots are undefined. */
  getPhotos(id: string): Promise<(Blob | undefined)[]>
  exportJson(): Promise<string>
  importJson(json: string): Promise<number>
}
