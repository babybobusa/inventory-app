import { recommendedPrice } from '../money'
import type { InventoryAdapter } from '../storage/adapter'
import type { ItemRecord } from '../types'

export type PaintSeedSpec = {
  id: string
  name: string
  description: string
  quantity: number
  cost: number
  location: string
  application: string
  photoFile: string
  listingPhotoFile: string
}

export const PAINT_SEED: PaintSeedSpec[] = [
  {
    id: 'paint-wooster-metal-tray',
    name: "Wooster 9 in metal paint tray",
    description: "Wooster metal paint roller tray for 9 in rollers",
    quantity: 1,
    cost: 3.98,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-wooster-metal-tray.jpg',
    listingPhotoFile: 'paint-listing/paint-wooster-metal-tray.jpg',
  },
  {
    id: 'paint-white-tray',
    name: "White plastic paint tray",
    description: "White plastic 9 in paint roller tray",
    quantity: 1,
    cost: 3.0,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-white-tray.jpg',
    listingPhotoFile: 'paint-listing/paint-white-tray.jpg',
  },
  {
    id: 'paint-orange-tray',
    name: "Orange 9 in plastic roller tray",
    description: "Orange plastic 9 in roller tray (recycled material label)",
    quantity: 2,
    cost: 4.0,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-orange-tray.jpg',
    listingPhotoFile: 'paint-listing/paint-orange-tray.jpg',
  },
  {
    id: 'paint-tray-liners',
    name: "Clear plastic tray liners",
    description: "Disposable clear plastic liners for paint trays",
    quantity: 2,
    cost: 1.5,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-tray-liners.jpg',
    listingPhotoFile: 'paint-listing/paint-tray-liners.jpg',
  },
  {
    id: 'paint-handy-pail',
    name: "Handy Paint Pro pail",
    description: "Red handheld Handy Paint Pro paint pail",
    quantity: 1,
    cost: 6.0,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-handy-pail.jpg',
    listingPhotoFile: 'paint-listing/paint-handy-pail.jpg',
  },
  {
    id: 'paint-pail-liners',
    name: "Handy pail liners",
    description: "Clear plastic liners for handheld paint pail",
    quantity: 4,
    cost: 0.8,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-pail-liners.jpg',
    listingPhotoFile: 'paint-listing/paint-pail-liners.jpg',
  },
  {
    id: 'paint-wooster-brush-3pack',
    name: "Wooster Pro brush variety 3-pack",
    description: "Wooster Pro nylon/polyester firm brush variety pack (3), interior and exterior, detail/wall/moldings",
    quantity: 1,
    cost: 34.0,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-wooster-brush-3pack.jpg',
    listingPhotoFile: 'paint-listing/paint-wooster-brush-3pack.jpg',
  },
  {
    id: 'paint-blue-tape',
    name: "Blue painter's tape",
    description: "Roll of blue painter's masking tape",
    quantity: 1,
    cost: 6.0,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-blue-tape.jpg',
    listingPhotoFile: 'paint-listing/paint-blue-tape.jpg',
  },
  {
    id: 'paint-roller-9-green',
    name: "9 in x 1/4 in roller cover (green)",
    description: "9 in high-density knit roller cover, 1/4 in nap, smooth surfaces",
    quantity: 1,
    cost: 6.0,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-roller-9-green.jpg',
    listingPhotoFile: 'paint-listing/paint-roller-9-green.jpg',
  },
  {
    id: 'paint-roller-9-black',
    name: "9 in x 1/4 in roller cover (black wrap)",
    description: "9 in polyester knit roller cover (distinct SKU from green-label 1/4 in cover), smooth to semi-smooth surfaces",
    quantity: 1,
    cost: 6.5,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-roller-9-black.jpg',
    listingPhotoFile: 'paint-listing/paint-roller-9-black.jpg',
  },
  {
    id: 'paint-wooster-mini-covers',
    name: "Wooster Pro mini roller covers (2-pack)",
    description: "Wooster Pro shed-resistant knit mini roller covers, 1/2 in nap, 2-pack",
    quantity: 2,
    cost: 6.87,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-wooster-mini-covers.jpg',
    listingPhotoFile: 'paint-listing/paint-wooster-mini-covers.jpg',
  },
  {
    id: 'paint-roller-frame-9',
    name: "9 in roller frame",
    description: "Standard 9 in paint roller frame with orange handle",
    quantity: 1,
    cost: 8.0,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-roller-frame-9.jpg',
    listingPhotoFile: 'paint-listing/paint-roller-frame-9.jpg',
  },
  {
    id: 'paint-roller-frame-mini',
    name: "Mini roller frame",
    description: "Mini paint roller frame with red and grey handle",
    quantity: 1,
    cost: 7.0,
    location: 'Black closet 4th shelf',
    application: 'Painting',
    photoFile: 'paint/paint-roller-frame-mini.jpg',
    listingPhotoFile: 'paint-listing/paint-roller-frame-mini.jpg',
  },
]


async function fetchSeedPhoto(photoFile: string): Promise<Blob | undefined> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}seed-photos/${photoFile}`)
    if (res.ok) return await res.blob()
  } catch {
    // ignore
  }
  return undefined
}

function toRecord(spec: PaintSeedSpec, photoCount: number, now: number): ItemRecord {
  return {
    id: spec.id,
    name: spec.name,
    description: spec.description,
    quantity: spec.quantity,
    cost: spec.cost,
    recommendedPrice: recommendedPrice(spec.cost),
    location: spec.location,
    application: spec.application,
    photoCount,
    lowStockAlertEnabled: false,
    lowStockThreshold: 2,
    timeAlertEnabled: false,
    timeAlertIntervalDays: 0,
    timeAlertAnchorAt: 0,
    createdAt: now,
    updatedAt: now,
  }
}

const PAINT_LISTING_VERSION = '4'
const PAINT_LISTING_KEY = 'inventory-paint-listing-version'

/** Insert missing paint items; refresh both photos to full retailer shots when version bumps. */
export async function seedPaintMissing(adapter: InventoryAdapter): Promise<void> {
  const existing = await adapter.list()
  const byId = new Map(existing.map((item) => [item.id, item]))
  const now = Date.now()
  const needsListingRefresh =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(PAINT_LISTING_KEY) !== PAINT_LISTING_VERSION

  for (const spec of PAINT_SEED) {
    const shot = await fetchSeedPhoto(spec.photoFile)
    const listing = await fetchSeedPhoto(spec.listingPhotoFile)
    const photos = [shot, listing]
    const count = photos.filter(Boolean).length
    const current = byId.get(spec.id)
    if (!current) {
      await adapter.upsert(toRecord(spec, count, now), photos)
      continue
    }
    if (needsListingRefresh || (current.photoCount || 0) < 2) {
      await adapter.upsert(
        {
          ...current,
          name: spec.name,
          description: spec.description,
          cost: spec.cost,
          recommendedPrice: recommendedPrice(spec.cost),
          quantity: spec.quantity,
          photoCount: count,
          updatedAt: now,
        },
        photos,
      )
    }
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(PAINT_LISTING_KEY, PAINT_LISTING_VERSION)
  }
}
