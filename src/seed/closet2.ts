import { recommendedPrice } from '../money'
import type { InventoryAdapter } from '../storage/adapter'
import type { ItemRecord } from '../types'

export type Closet2SeedSpec = {
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

export const CLOSET2_SEED: Closet2SeedSpec[] = [
  {
    id: 'closet2-pvc-elbow-1in',
    name: "1 in 90 degree pipe elbow",
    description: "White PVC 90-degree elbow, 1 inch",
    quantity: 2,
    cost: 1.48,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-pvc-elbow-1in.jpg',
    listingPhotoFile: 'closet2-listing/closet2-pvc-elbow-1in.jpg',
  },
  {
    id: 'closet2-oatey-washer-1-5',
    name: "1-1/2 washer",
    description: "Oatey red rubber washers for 1-1/2 in fittings",
    quantity: 2,
    cost: 3.15,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-oatey-washer-1-5.jpg',
    listingPhotoFile: 'closet2-listing/closet2-oatey-washer-1-5.jpg',
  },
  {
    id: 'closet2-pvc-elbow-1-5',
    name: "1-1/2 in 90 degree elbow",
    description: "White PVC 90-degree elbow, 1-1/2 inch",
    quantity: 1,
    cost: 2.92,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-pvc-elbow-1-5.jpg',
    listingPhotoFile: 'closet2-listing/closet2-pvc-elbow-1-5.jpg',
  },
  {
    id: 'closet2-pvc-coupling-1-5',
    name: "1-1/2 in coupling",
    description: "White PVC coupling, 1-1/2 inch",
    quantity: 5,
    cost: 1.78,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-pvc-coupling-1-5.jpg',
    listingPhotoFile: 'closet2-listing/closet2-pvc-coupling-1-5.jpg',
  },
  {
    id: 'closet2-jhook-hanger',
    name: "1-1/2 J-hook pipe hanger",
    description: "White plastic J-hook pipe hanger for 1-1/2 in pipe",
    quantity: 1,
    cost: 1.28,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-jhook-hanger.jpg',
    listingPhotoFile: 'closet2-listing/closet2-jhook-hanger.jpg',
  },
  {
    id: 'closet2-faucet-washers',
    name: "Assorted flat faucet washers",
    description: "Everbilt assorted flat faucet washers, 24 pcs",
    quantity: 1,
    cost: 3.48,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-faucet-washers.jpg',
    listingPhotoFile: 'closet2-listing/closet2-faucet-washers.jpg',
  },
  {
    id: 'closet2-oatey-assorted-washers',
    name: "Assorted washers",
    description: "Oatey assorted washers 1-1/4 & 1-1/2",
    quantity: 1,
    cost: 4.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-oatey-assorted-washers.jpg',
    listingPhotoFile: 'closet2-listing/closet2-oatey-assorted-washers.jpg',
  },
  {
    id: 'closet2-popup-drain-washer',
    name: "Bathroom pop-up drain washer",
    description: "Everbilt bathroom pop-up drain washer",
    quantity: 1,
    cost: 2.48,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-popup-drain-washer.jpg',
    listingPhotoFile: 'closet2-listing/closet2-popup-drain-washer.jpg',
  },
  {
    id: 'closet2-duck-tape',
    name: "Duck tape",
    description: "Duck brand silver duct tape roll",
    quantity: 1,
    cost: 5.48,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-duck-tape.jpg',
    listingPhotoFile: 'closet2-listing/closet2-duck-tape.jpg',
  },
  {
    id: 'closet2-ge-silicone',
    name: "GE silicone",
    description: "GE white silicone caulk, 7x stronger formula",
    quantity: 1,
    cost: 10.09,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-ge-silicone.jpg',
    listingPhotoFile: 'closet2-listing/closet2-ge-silicone.jpg',
  },
  {
    id: 'closet2-goo-gone',
    name: "Goo Gone",
    description: "Goo Gone Pro-Power adhesive remover",
    quantity: 1,
    cost: 6.66,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-goo-gone.jpg',
    listingPhotoFile: 'closet2-listing/closet2-goo-gone.jpg',
  },
  {
    id: 'closet2-gorilla-tape',
    name: "Gorilla tape",
    description: "Gorilla brand heavy-duty duct tape",
    quantity: 1,
    cost: 8.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-gorilla-tape.jpg',
    listingPhotoFile: 'closet2-listing/closet2-gorilla-tape.jpg',
  },
  {
    id: 'closet2-door-closer',
    name: "Heavy duty commercial hydraulic door closer",
    description: "Commercial hydraulic door closer in retail box",
    quantity: 1,
    cost: 79.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-door-closer.jpg',
    listingPhotoFile: 'closet2-listing/closet2-door-closer.jpg',
  },
  {
    id: 'closet2-hvac-tape',
    name: "HVAC duct tape",
    description: "Silver HVAC foil duct tape",
    quantity: 2,
    cost: 6.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-hvac-tape.jpg',
    listingPhotoFile: 'closet2-listing/closet2-hvac-tape.jpg',
  },
  {
    id: 'closet2-laundry-strainer',
    name: "Laundry tub strainer",
    description: "Bathtub/laundry tub metal mesh hair catcher strainer",
    quantity: 1,
    cost: 3.27,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-laundry-strainer.jpg',
    listingPhotoFile: 'closet2-listing/closet2-laundry-strainer.jpg',
  },
  {
    id: 'closet2-liquid-nails',
    name: "Liquid Nails Fuze-It Max",
    description: "Liquid Nails Fuze-It Max 5x adhesive tube",
    quantity: 1,
    cost: 11.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-liquid-nails.jpg',
    listingPhotoFile: 'closet2-listing/closet2-liquid-nails.jpg',
  },
  {
    id: 'closet2-loctite-foam',
    name: "Loctite Tite Foam Gaps & Cracks",
    description: "Loctite Tite Foam gaps and cracks insulating foam",
    quantity: 1,
    cost: 7.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-loctite-foam.jpg',
    listingPhotoFile: 'closet2-listing/closet2-loctite-foam.jpg',
  },
  {
    id: 'closet2-primer-cement',
    name: "Plumbers primer/cement",
    description: "Oatey purple primer and PVC cement pair",
    quantity: 1,
    cost: 10.94,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-primer-cement.jpg',
    listingPhotoFile: 'closet2-listing/closet2-primer-cement.jpg',
  },
  {
    id: 'closet2-plumbers-putty',
    name: "Plumbers putty",
    description: "Oatey plumber's putty tub",
    quantity: 1,
    cost: 2.52,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-plumbers-putty.jpg',
    listingPhotoFile: 'closet2-listing/closet2-plumbers-putty.jpg',
  },
  {
    id: 'closet2-ball-rod',
    name: "Pop up ball rod assembly",
    description: "Bathroom sink pop-up ball rod assembly",
    quantity: 1,
    cost: 8.28,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-ball-rod.jpg',
    listingPhotoFile: 'closet2-listing/closet2-ball-rod.jpg',
  },
  {
    id: 'closet2-rod-clips',
    name: "Pop up drain rod clips",
    description: "Metal V-shaped pop-up drain rod clips",
    quantity: 2,
    cost: 2.36,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-rod-clips.jpg',
    listingPhotoFile: 'closet2-listing/closet2-rod-clips.jpg',
  },
  {
    id: 'closet2-drain-stopper',
    name: "Pop-up drain stopper",
    description: "White plastic pop-up drain stopper approx 1-3/8 in x 4-1/4 in",
    quantity: 2,
    cost: 7.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-drain-stopper.jpg',
    listingPhotoFile: 'closet2-listing/closet2-drain-stopper.jpg',
  },
  {
    id: 'closet2-recessed-kit',
    name: "Recessed lights converter kit",
    description: "Recessed light converter kit retail box",
    quantity: 1,
    cost: 6.97,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-recessed-kit.jpg',
    listingPhotoFile: 'closet2-listing/closet2-recessed-kit.jpg',
  },
  {
    id: 'closet2-ptrap-washers',
    name: "Reducing P-trap washers",
    description: "Red rubber reducing washers 1-1/4 x 1-1/2 for P-trap",
    quantity: 8,
    cost: 2.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-ptrap-washers.jpg',
    listingPhotoFile: 'closet2-listing/closet2-ptrap-washers.jpg',
  },
  {
    id: 'closet2-rubber-coupling',
    name: "Rubber 1-1/2 x 1-1/2 black coupling",
    description: "Black rubber pipe coupling 1-1/2 x 1-1/2 with metal clamps",
    quantity: 1,
    cost: 4.17,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-rubber-coupling.jpg',
    listingPhotoFile: 'closet2-listing/closet2-rubber-coupling.jpg',
  },
  {
    id: 'closet2-tub-stopper',
    name: "Rubber stopper with chain",
    description: "White rubber tub stopper with bead chain, fits ~1-1/2 in",
    quantity: 1,
    cost: 4.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-tub-stopper.jpg',
    listingPhotoFile: 'closet2-listing/closet2-tub-stopper.jpg',
  },
  {
    id: 'closet2-spray-paint-satin',
    name: "Spray paint",
    description: "Rust-Oleum 2X Ultra Cover satin primer & paint",
    quantity: 1,
    cost: 6.48,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-spray-paint-satin.jpg',
    listingPhotoFile: 'closet2-listing/closet2-spray-paint-satin.jpg',
  },
  {
    id: 'closet2-spray-paint-gold',
    name: "Spray paint, gold",
    description: "Rust-Oleum Metallic shiny gold spray paint",
    quantity: 1,
    cost: 9.2,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-spray-paint-gold.jpg',
    listingPhotoFile: 'closet2-listing/closet2-spray-paint-gold.jpg',
  },
  {
    id: 'closet2-faucet-supply',
    name: "Standard faucet supply line",
    description: "Braided faucet supply line, 20 in, 1/2 in connections",
    quantity: 2,
    cost: 8.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-faucet-supply.jpg',
    listingPhotoFile: 'closet2-listing/closet2-faucet-supply.jpg',
  },
  {
    id: 'closet2-teflon-tape',
    name: "Teflon tape",
    description: "White PTFE thread seal tape 1/2 in x ~22 ft",
    quantity: 1,
    cost: 1.48,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-teflon-tape.jpg',
    listingPhotoFile: 'closet2-listing/closet2-teflon-tape.jpg',
  },
  {
    id: 'closet2-toilet-lever',
    name: "Toilet lever",
    description: "Universal chrome toilet tank lever (Korky/StrongArm style)",
    quantity: 1,
    cost: 16.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-toilet-lever.jpg',
    listingPhotoFile: 'closet2-listing/closet2-toilet-lever.jpg',
  },
  {
    id: 'closet2-turpentine',
    name: "Turpentine",
    description: "Klean-Strip turpentine metal can",
    quantity: 1,
    cost: 11.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-turpentine.jpg',
    listingPhotoFile: 'closet2-listing/closet2-turpentine.jpg',
  },
  {
    id: 'closet2-frost-spray',
    name: "Window Frost spray paint",
    description: "Rust-Oleum frosted glass / window frost spray paint",
    quantity: 3,
    cost: 7.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-frost-spray.jpg',
    listingPhotoFile: 'closet2-listing/closet2-frost-spray.jpg',
  },
  {
    id: 'closet2-wood-filler',
    name: "Wood filler",
    description: "DAP Plastic Wood-X natural color wood filler",
    quantity: 1,
    cost: 10.38,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-wood-filler.jpg',
    listingPhotoFile: 'closet2-listing/closet2-wood-filler.jpg',
  },
  {
    id: 'closet2-drain-weasel-handle',
    name: "Drain Weasel starter kit (handle)",
    description: "FlexiSnake Drain Weasel starter kit with reusable spinning handle and refill wands",
    quantity: 1,
    cost: 6.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-drain-weasel-handle.jpg',
    listingPhotoFile: 'closet2-listing/closet2-drain-weasel-handle.jpg',
  },
  {
    id: 'closet2-drain-weasel-refill',
    name: "Drain Weasel hair clog refill (3 wands)",
    description: "Drain Weasel 18 in hair clog refill wands, 3-pack; handle sold separately",
    quantity: 1,
    cost: 6.98,
    location: 'Black closet 2nd shelf',
    application: 'Hardware / plumbing supplies',
    photoFile: 'closet2/closet2-drain-weasel-refill.jpg',
    listingPhotoFile: 'closet2-listing/closet2-drain-weasel-refill.jpg',
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

function toRecord(spec: Closet2SeedSpec, photoCount: number, now: number): ItemRecord {
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

const CLOSET2_RETAIL_VERSION = '4'
const CLOSET2_RETAIL_KEY = 'inventory-closet2-retail-version'

/** Insert missing closet2 items; refresh photos + costs away from StoDo when version bumps. */
export async function seedCloset2Missing(adapter: InventoryAdapter): Promise<void> {
  const existing = await adapter.list()
  const byId = new Map(existing.map((item) => [item.id, item]))
  const now = Date.now()
  const needsRetailRefresh =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(CLOSET2_RETAIL_KEY) !== CLOSET2_RETAIL_VERSION

  for (const spec of CLOSET2_SEED) {
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
    localStorage.setItem(CLOSET2_RETAIL_KEY, CLOSET2_RETAIL_VERSION)
  }
}
