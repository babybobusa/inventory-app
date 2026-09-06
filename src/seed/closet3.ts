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
    name: "Andersen-compatible screen door tension spring",
    description: "Prime-Line 4 in sliding screen door top tension spring, Andersen-compatible (2-pack listing; stock 1 spring)",
    quantity: 1,
    cost: 6.72,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-andersen-spring.jpg',
    listingPhotoFile: 'closet3-listing/closet3-andersen-spring.jpg',
  },
  {
    id: 'closet3-screen-spline',
    name: "Phifer .125 x 25 ft black screen spline",
    description: "Phifer 0.125 in x 25 ft black vinyl screen spline",
    quantity: 2,
    cost: 4.98,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-screen-spline.jpg',
    listingPhotoFile: 'closet3-listing/closet3-screen-spline.jpg',
  },
  {
    id: 'closet3-wire-12-3',
    name: "12/3 NM-B wire remnant (~10 ft)",
    description: "Yellow 12/3 NM-B electrical cable remnant, about 10 ft; value from Home Depot per-foot pricing",
    quantity: 1,
    cost: 19.8,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-wire-12-3.jpg',
    listingPhotoFile: 'closet3-listing/closet3-wire-12-3.jpg',
  },
  {
    id: 'closet3-wire-14-3',
    name: "14/3 NM-B wire remnant (~125 ft)",
    description: "White-jacket 14/3 NM-B electrical cable remnant, about 125 ft; value from Home Depot per-foot pricing",
    quantity: 1,
    cost: 98.75,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-wire-14-3.jpg',
    listingPhotoFile: 'closet3-listing/closet3-wire-14-3.jpg',
  },
  {
    id: 'closet3-gfci-15a',
    name: "Leviton 15A tamper-resistant GFCI outlet",
    description: "Leviton SmartlockPro 15 Amp 125V self-test tamper-resistant GFCI outlet, white",
    quantity: 1,
    cost: 21.4,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-gfci-15a.jpg',
    listingPhotoFile: 'closet3-listing/closet3-gfci-15a.jpg',
  },
  {
    id: 'closet3-outlet-15a-tr',
    name: "15 amp tamper-resistant duplex outlet",
    description: "Leviton 15 Amp 125V tamper-resistant duplex outlet, white",
    quantity: 1,
    cost: 1.5,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-outlet-15a-tr.jpg',
    listingPhotoFile: 'closet3-listing/closet3-outlet-15a-tr.jpg',
  },
  {
    id: 'closet3-outlet-15a',
    name: "15 amp duplex outlet",
    description: "Standard 15 Amp duplex receptacle, white",
    quantity: 1,
    cost: 1.28,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-outlet-15a.jpg',
    listingPhotoFile: 'closet3-listing/closet3-outlet-15a.jpg',
  },
  {
    id: 'closet3-ceiling-box-4in',
    name: "4 in new work PVC ceiling box",
    description: "Carlon 4 in 20 cu in PVC new-work electrical ceiling box",
    quantity: 2,
    cost: 2.48,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-ceiling-box-4in.jpg',
    listingPhotoFile: 'closet3-listing/closet3-ceiling-box-4in.jpg',
  },
  {
    id: 'closet3-double-blank',
    name: "Double gang blank wall plate",
    description: "White 2-gang blank thermoplastic wall plate",
    quantity: 1,
    cost: 1.48,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-double-blank.jpg',
    listingPhotoFile: 'closet3-listing/closet3-double-blank.jpg',
  },
  {
    id: 'closet3-screen-closer',
    name: "Heavy duty pneumatic screen door closer",
    description: "Wright Products heavy duty pneumatic screen and storm door closer, black",
    quantity: 1,
    cost: 14.34,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-screen-closer.jpg',
    listingPhotoFile: 'closet3-listing/closet3-screen-closer.jpg',
  },
  {
    id: 'closet3-hinge-light',
    name: "Light duty door hinge",
    description: "Light duty square-corner residential door hinge, satin nickel/steel",
    quantity: 7,
    cost: 2.48,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-hinge-light.jpg',
    listingPhotoFile: 'closet3-listing/closet3-hinge-light.jpg',
  },
  {
    id: 'closet3-kwikset-knob',
    name: "Kwikset keyed exterior doorknob",
    description: "Kwikset keyed entry exterior doorknob with SmartKey (typical entry knob)",
    quantity: 1,
    cost: 35.37,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-kwikset-knob.jpg',
    listingPhotoFile: 'closet3-listing/closet3-kwikset-knob.jpg',
  },
  {
    id: 'closet3-lv-double',
    name: "Low voltage double gang bracket",
    description: "Orange low-voltage double-gang mounting bracket",
    quantity: 1,
    cost: 2.97,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-lv-double.jpg',
    listingPhotoFile: 'closet3-listing/closet3-lv-double.jpg',
  },
  {
    id: 'closet3-lv-single',
    name: "Low voltage single gang bracket",
    description: "Orange low-voltage single-gang mounting bracket",
    quantity: 1,
    cost: 1.97,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-lv-single.jpg',
    listingPhotoFile: 'closet3-listing/closet3-lv-single.jpg',
  },
  {
    id: 'closet3-misc-doorknob',
    name: "Misc doorknob pieces",
    description: "Assorted doorknob and door hardware parts",
    quantity: 0,
    cost: 0.0,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-misc-doorknob.jpg',
    listingPhotoFile: 'closet3-listing/closet3-misc-doorknob.jpg',
  },
  {
    id: 'closet3-chandelier-box',
    name: "Old work chandelier / fan support box",
    description: "Old-work chandelier and ceiling fan support box with brace",
    quantity: 1,
    cost: 18.97,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-chandelier-box.jpg',
    listingPhotoFile: 'closet3-listing/closet3-chandelier-box.jpg',
  },
  {
    id: 'closet3-paddle-switch',
    name: "Paddle / rocker light switch",
    description: "15 Amp single-pole decorator paddle rocker light switch, white",
    quantity: 1,
    cost: 1.85,
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
    cost: 2.48,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-blank-metal.jpg',
    listingPhotoFile: 'closet3-listing/closet3-blank-metal.jpg',
  },
  {
    id: 'closet3-conduit-plate',
    name: "Single gang conduit cover plate",
    description: "Single-gang metal conduit / blank cover plate",
    quantity: 1,
    cost: 1.98,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-conduit-plate.jpg',
    listingPhotoFile: 'closet3-listing/closet3-conduit-plate.jpg',
  },
  {
    id: 'closet3-switch-outlet-cover',
    name: "Single gang decorator / GFCI wall plate",
    description: "Single-gang decorator or GFCI-style wall plate, white",
    quantity: 1,
    cost: 0.98,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-switch-outlet-cover.jpg',
    listingPhotoFile: 'closet3-listing/closet3-switch-outlet-cover.jpg',
  },
  {
    id: 'closet3-outlet-cover',
    name: "Single gang duplex outlet cover",
    description: "Standard single-gang duplex outlet wall plate, white",
    quantity: 2,
    cost: 0.78,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-outlet-cover.jpg',
    listingPhotoFile: 'closet3-listing/closet3-outlet-cover.jpg',
  },
  {
    id: 'closet3-toggle-cover',
    name: "Single gang toggle switch cover",
    description: "Standard single-gang toggle switch wall plate, white",
    quantity: 4,
    cost: 0.68,
    location: 'Black closet 3rd shelf',
    application: 'Hardware / electrical & door hardware',
    photoFile: 'closet3/closet3-toggle-cover.jpg',
    listingPhotoFile: 'closet3-listing/closet3-toggle-cover.jpg',
  },
  {
    id: 'closet3-wire-fish',
    name: "Wire fish tape",
    description: "Wire fishing tool / fish tape",
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
    timeAlertEnabled: false,
    timeAlertIntervalDays: 0,
    timeAlertAnchorAt: 0,
    createdAt: now,
    updatedAt: now,
  }
}

const CLOSET3_RETAIL_VERSION = '4'
const CLOSET3_RETAIL_KEY = 'inventory-closet3-retail-version'

/** Insert missing closet3 items; refresh photos + costs away from StoDo when version bumps. */
export async function seedCloset3Missing(adapter: InventoryAdapter): Promise<void> {
  const existing = await adapter.list()
  const byId = new Map(existing.map((item) => [item.id, item]))
  const now = Date.now()
  const needsRetailRefresh =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(CLOSET3_RETAIL_KEY) !== CLOSET3_RETAIL_VERSION

  for (const spec of CLOSET3_SEED) {
    const shot = await fetchSeedPhoto(spec.photoFile)
    const listing = await fetchSeedPhoto(spec.listingPhotoFile)
    const photos = [shot, listing]
    const count = photos.filter(Boolean).length
    const current = byId.get(spec.id)
    if (!current) {
      await adapter.upsert(toRecord(spec, count, now), photos)
      continue
    }
    if (needsRetailRefresh) {
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
    } else if (/cost\s*check/i.test(current.description || '')) {
      await adapter.upsert({ ...current, description: spec.description, updatedAt: now })
    }
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CLOSET3_RETAIL_KEY, CLOSET3_RETAIL_VERSION)
  }
}
