import type { ItemRecord } from '../types'

/** Blob = replace photo, null = remove photo, undefined = leave as-is */
export type PhotoChange = Blob | null | undefined

/**
 * Thin storage interface. Today this is IndexedDB on the phone.
 * Later a NAS/network adapter can implement the same methods.
 */
export type InventoryAdapter = {
  init(): Promise<void>
  list(): Promise<ItemRecord[]>
  get(id: string): Promise<ItemRecord | undefined>
  upsert(item: ItemRecord, photo?: PhotoChange): Promise<void>
  remove(id: string): Promise<void>
  getPhoto(id: string): Promise<Blob | undefined>
  exportJson(): Promise<string>
  importJson(json: string): Promise<number>
}
