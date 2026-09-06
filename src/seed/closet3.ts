import { recommendedPrice } from '../money'
import type { InventoryAdapter } from '../storage/adapter'
import type { ItemRecord } from '../types'

export type Closet3SeedSpec = {
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

export const CLOSET3_SEED: Closet3SeedSpec[] = [
  {
    id: 'closet3-andersen-spring',
    name: "(Andersen) screen door tension spring",
    description: "Andersen screen door tension spring; used to hold screen",
    quantity: 1,
    cost: 5.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-andersen-spring.jpg',
    listingPhotoFile: 'closet3-listing/closet3-andersen-spring.jpg',
  },
  {
    id: 'closet3-screen-spline',
    name: "ADFORS .125 x 25 ft screen spline",
    description: "ADFORS black screen spline .125 in x 25 ft (package marks .125 in)",
    quantity: 2,
    cost: 15.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-screen-spline.jpg',
    listingPhotoFile: 'closet3-listing/closet3-screen-spline.jpg',
  },
  {
    id: 'closet3-wire-12-3',
    name: "12/3 wire",
    description: "12/3 electrical wire, about 10 ft",
    quantity: 1,
    cost: 2.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-wire-12-3.jpg',
    listingPhotoFile: 'closet3-listing/closet3-wire-12-3.jpg',
  },
  {
    id: 'closet3-wire-14-3',
    name: "14/3 wire",
    description: "14/3 electrical wire, about 125 ft",
    quantity: 1,
    cost: 1.5,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-wire-14-3.jpg',
    listingPhotoFile: 'closet3-listing/closet3-wire-14-3.jpg',
  },
  {
    id: 'closet3-gfci-15a',
    name: "15 amp GFCI outlet",
    description: "Leviton 15 amp tamper-resistant GFCI outlet",
    quantity: 1,
    cost: 12.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-gfci-15a.jpg',
    listingPhotoFile: 'closet3-listing/closet3-gfci-15a.jpg',
  },
  {
    id: 'closet3-outlet-15a-tr',
    name: "15 amp outlet (tamper resistant)",
    description: "15 amp tamper-resistant duplex outlet",
    quantity: 1,
    cost: 5.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-outlet-15a-tr.jpg',
    listingPhotoFile: 'closet3-listing/closet3-outlet-15a-tr.jpg',
  },
  {
    id: 'closet3-outlet-15a',
    name: "15 amp outlet",
    description: "15 amp duplex outlet",
    quantity: 1,
    cost: 3.5,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-outlet-15a.jpg',
    listingPhotoFile: 'closet3-listing/closet3-outlet-15a.jpg',
  },
  {
    id: 'closet3-ceiling-box-4in',
    name: "4 in new work ceiling box",
    description: "4 inch new-work round plastic ceiling box",
    quantity: 2,
    cost: 3.5,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-ceiling-box-4in.jpg',
    listingPhotoFile: 'closet3-listing/closet3-ceiling-box-4in.jpg',
  },
  {
    id: 'closet3-double-blank',
    name: "Double gang blank wallplate",
    description: "White double-gang blank wall plate",
    quantity: 1,
    cost: 5.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-double-blank.jpg',
    listingPhotoFile: 'closet3-listing/closet3-double-blank.jpg',
  },
  {
    id: 'closet3-screen-closer',
    name: "Heavy duty screen door closer",
    description: "Heavy duty pneumatic screen door closer",
    quantity: 1,
    cost: 35.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-screen-closer.jpg',
    listingPhotoFile: 'closet3-listing/closet3-screen-closer.jpg',
  },
  {
    id: 'closet3-hinge-light',
    name: "Hinge (light duty)",
    description: "Light duty square corner hinge",
    quantity: 7,
    cost: 2.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-hinge-light.jpg',
    listingPhotoFile: 'closet3-listing/closet3-hinge-light.jpg',
  },
  {
    id: 'closet3-kwikset-knob',
    name: "Keyed Kwikset doorknob (exterior)",
    description: "Keyed Kwikset exterior doorknob set",
    quantity: 1,
    cost: 15.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-kwikset-knob.jpg',
    listingPhotoFile: 'closet3-listing/closet3-kwikset-knob.jpg',
  },
  {
    id: 'closet3-lv-double',
    name: "Low voltage double gang",
    description: "Orange low-voltage double-gang mounting bracket",
    quantity: 1,
    cost: 5.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-lv-double.jpg',
    listingPhotoFile: 'closet3-listing/closet3-lv-double.jpg',
  },
  {
    id: 'closet3-lv-single',
    name: "Low voltage single gang",
    description: "Orange low-voltage single-gang mounting bracket",
    quantity: 1,
    cost: 4.5,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-lv-single.jpg',
    listingPhotoFile: 'closet3-listing/closet3-lv-single.jpg',
  },
  {
    id: 'closet3-misc-doorknob',
    name: "Misc doorknob pieces",
    description: "Assorted doorknob/door hardware parts",
    quantity: 0,
    cost: 0.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-misc-doorknob.jpg',
    listingPhotoFile: 'closet3-listing/closet3-misc-doorknob.jpg',
  },
  {
    id: 'closet3-chandelier-box',
    name: "Old work chandelier box",
    description: "Old-work chandelier/ceiling fan support box with brace",
    quantity: 1,
    cost: 35.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-chandelier-box.jpg',
    listingPhotoFile: 'closet3-listing/closet3-chandelier-box.jpg',
  },
  {
    id: 'closet3-paddle-switch',
    name: "Paddle light switch",
    description: "White paddle/rocker light switch",
    quantity: 1,
    cost: 5.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-paddle-switch.jpg',
    listingPhotoFile: 'closet3-listing/closet3-paddle-switch.jpg',
  },
  {
    id: 'closet3-blank-metal',
    name: "Single gang blank metal wall plate",
    description: "Single-gang blank metal wall plate, primed white",
    quantity: 1,
    cost: 5.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-blank-metal.jpg',
    listingPhotoFile: 'closet3-listing/closet3-blank-metal.jpg',
  },
  {
    id: 'closet3-conduit-plate',
    name: "Single gang conduit plate",
    description: "Single-gang metal conduit cover plate",
    quantity: 1,
    cost: 3.5,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-conduit-plate.jpg',
    listingPhotoFile: 'closet3-listing/closet3-conduit-plate.jpg',
  },
  {
    id: 'closet3-switch-outlet-cover',
    name: "Single gang light switch/outlet cover",
    description: "Single-gang decorator/GFCI style wall plate",
    quantity: 1,
    cost: 2.5,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-switch-outlet-cover.jpg',
    listingPhotoFile: 'closet3-listing/closet3-switch-outlet-cover.jpg',
  },
  {
    id: 'closet3-outlet-cover',
    name: "Single gang outlet cover (standard)",
    description: "Standard duplex outlet wall plate",
    quantity: 2,
    cost: 3.5,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-outlet-cover.jpg',
    listingPhotoFile: 'closet3-listing/closet3-outlet-cover.jpg',
  },
  {
    id: 'closet3-toggle-cover',
    name: "Single gang standard light switch cover",
    description: "Standard single-gang toggle switch wall plate",
    quantity: 4,
    cost: 2.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-toggle-cover.jpg',
    listingPhotoFile: 'closet3-listing/closet3-toggle-cover.jpg',
  },
  {
    id: 'closet3-wire-fish',
    name: "Wire fish",
    description: "Wire fishing tool (fish tape)",
    quantity: 0,
    cost: 0.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-wire-fish.jpg',
    listingPhotoFile: 'closet3-listing/closet3-wire-fish.jpg',
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

function toRecord(spec: Closet3SeedSpec, photoCount: number, now: number): ItemRecord {
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
    createdAt: now,
    updatedAt: now,
  }
}

/** Insert any missing Black closet 3rd shelf seed items (does not overwrite existing). */
export async function seedCloset3Missing(adapter: InventoryAdapter): Promise<void> {
  const existing = await adapter.list()
  const byId = new Map(existing.map((item) => [item.id, item]))
  const now = Date.now()
  for (const spec of CLOSET3_SEED) {
    const existingItem = byId.get(spec.id)
    if (existingItem) {
      if (/cost\s*check/i.test(existingItem.description || "")) {
        await adapter.upsert({
          ...existingItem,
          description: spec.description,
          updatedAt: Date.now(),
        })
      }
      continue
    }
    const shot = await fetchSeedPhoto(spec.photoFile)
    const listing = await fetchSeedPhoto(spec.listingPhotoFile)
    const photos = [shot, listing]
    const count = photos.filter(Boolean).length
    await adapter.upsert(toRecord(spec, count, now), photos)
  }
}
