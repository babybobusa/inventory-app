export const MARKUP_RATE = 1.2

export type ItemRecord = {
  id: string
  name: string
  description: string
  quantity: number
  cost: number
  recommendedPrice: number
  location: string
  application: string
  hasPhoto: boolean
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

export type ExportPayload = {
  version: 1
  exportedAt: string
  items: Array<
    ItemRecord & {
      photoDataUrl?: string
    }
  >
}
