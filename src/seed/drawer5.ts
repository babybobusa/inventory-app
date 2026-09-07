import { recommendedPrice } from '../money'
import type { InventoryAdapter } from '../storage/adapter'
import type { ItemRecord } from '../types'

export type Drawer5SeedSpec = {
  id: string
  name: string
  description: string
  quantity: number
  cost: number
  location: string
  application: string
  photoFile: string
}

export const DRAWER5_SEED_VERSION = '1'
const DRAWER5_SEED_KEY = 'inventory-drawer5-seed-version'

export const DRAWER5_SEED: Drawer5SeedSpec[] = [
  {
    id: 'drawer5-everbilt-face-frame-hinge-10pk',
    name: 'Everbilt Soft-Close Face Frame Hinge 10-Pack',
    description:
      'Everbilt face frame concealed hinge, 35 mm cup, 105 degree, soft close, 1/2 in overlay. Nickel finish value pack (10 pieces / 5 pairs). Home Depot SKU ~1002783073 / model H1530SE-NP-U1.',
    quantity: 1,
    cost: 56.57,
    location: 'drawer 5',
    application: 'Cabinetry',
    photoFile: 'drawer5/drawer5-everbilt-face-frame-hinge-10pk.jpg',
  },
  {
    id: 'drawer5-concealed-cabinet-hinges',
    name: 'Loose silver concealed cabinet hinges',
    description:
      'Assorted loose nickel/silver European-style concealed cabinet hinges (face-frame style), bagged plus loose pieces of the same type. Counted as individual hinges.',
    quantity: 16,
    cost: 3.5,
    location: 'drawer 5',
    application: 'Cabinetry',
    photoFile: 'drawer5/drawer5-concealed-cabinet-hinges.jpg',
  },
  {
    id: 'drawer5-primeline-n6703',
    name: 'Prime-Line Bi-Fold Top Guide Roller 7/8 in (2-Pack)',
    description:
      'Prime-Line bi-fold closet door spring-loaded top guide roller, ~7/8 in O.D. nylon roller, fits 3/8 in hole. Yellow carded 2-pack (N 6703 / similar N 6953 style).',
    quantity: 1,
    cost: 1.98,
    location: 'drawer 5',
    application: 'Door Hardware',
    photoFile: 'drawer5/drawer5-primeline-n6703.jpg',
  },
  {
    id: 'drawer5-primeline-n6704',
    name: 'Prime-Line Bi-Fold Top Guide Roller 3/4 in (2-Pack)',
    description:
      'Prime-Line N 6704 bi-fold door top guide roller, 3/4 in O.D. nylon, spring-loaded, fits 3/8 in hole. Yellow carded 2-pack.',
    quantity: 1,
    cost: 5.27,
    location: 'drawer 5',
    application: 'Door Hardware',
    photoFile: 'drawer5/drawer5-primeline-n6704.jpg',
  },
  {
    id: 'drawer5-primeline-bifold-pivot',
    name: 'Prime-Line Bi-Fold Door Bottom Pivot',
    description:
      'Prime-Line yellow-carded bi-fold door bottom pivot / bracket hardware pack (metal bracket with white plastic pivot sleeve).',
    quantity: 1,
    cost: 4.5,
    location: 'drawer 5',
    application: 'Door Hardware',
    photoFile: 'drawer5/drawer5-primeline-bifold-pivot.jpg',
  },
  {
    id: 'drawer5-closet-pole-sockets',
    name: 'Everbilt Heavy-Duty Closet Pole Sockets White 1-5/16 in',
    description:
      'Everbilt heavy-duty metal closet pole sockets, white finish, for 1-5/16 in poles. Pair includes one open-lip and one closed socket with mounting screws.',
    quantity: 1,
    cost: 8.98,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-closet-pole-sockets.jpg',
  },
  {
    id: 'drawer5-barge-cement',
    name: 'Barge All-Purpose Cement 3/4 fl oz',
    description:
      'Barge Original All-Purpose Cement contact adhesive, toluene-free formula, 3/4 fl oz (22 ml) tube on blue retail card. Bonds rubber, wood, leather, glass, cork, metal.',
    quantity: 1,
    cost: 6.5,
    location: 'drawer 5',
    application: 'Adhesives',
    photoFile: 'drawer5/drawer5-barge-cement.jpg',
  },
  {
    id: 'drawer5-craft-sticks',
    name: 'Wooden craft sticks',
    description:
      'Natural wood jumbo craft sticks / tongue-depressor style sticks. Useful as mixers, shims, or craft stock.',
    quantity: 10,
    cost: 0.15,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-craft-sticks.jpg',
  },
  {
    id: 'drawer5-folding-brackets',
    name: 'Galvanized folding shelf brackets / lid stays',
    description:
      'Articulated galvanized steel folding brackets (lid stay / folding shelf support style) with multiple mounting holes.',
    quantity: 2,
    cost: 8.0,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-folding-brackets.jpg',
  },
  {
    id: 'drawer5-brass-lid-stay',
    name: 'Brass articulated lid stay',
    description:
      'Single brass/gold-tone articulated lid stay or folding support hinge for a chest lid or cabinet door.',
    quantity: 1,
    cost: 7.0,
    location: 'drawer 5',
    application: 'Cabinetry',
    photoFile: 'drawer5/drawer5-brass-lid-stay.jpg',
  },
  {
    id: 'drawer5-lamp-nipples-6in',
    name: 'Commercial Electric 6 in Lamp Nipples 1/8-IP (2-Pack)',
    description:
      'Commercial Electric carded 2-pack of 6 in lamp nipples, 1/8-IP thread, brass/zinc finish. For lamp repair and lighting fixtures.',
    quantity: 1,
    cost: 4.5,
    location: 'drawer 5',
    application: 'Electrical',
    photoFile: 'drawer5/drawer5-lamp-nipples-6in.jpg',
  },
  {
    id: 'drawer5-mending-plates',
    name: 'Galvanized mending plates',
    description:
      'Flat galvanized steel mending plates / straps with countersunk mounting holes and retail barcode stickers. Approx 4 in class.',
    quantity: 4,
    cost: 2.25,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-mending-plates.jpg',
  },
  {
    id: 'drawer5-simpson-a23',
    name: 'Simpson Strong-Tie A23 reinforcing angle',
    description:
      'Simpson Strong-Tie A23 galvanized reinforcing angle (18 ga) for 90-degree wood connections. Stamped A23 / A-series style.',
    quantity: 1,
    cost: 2.48,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-simpson-a23.jpg',
  },
  {
    id: 'drawer5-heavy-framing-angle',
    name: 'Heavy galvanized framing angle',
    description:
      'Heavy-gauge galvanized steel L-shaped framing / structural angle with large bolt hole and nail holes. Retail barcode sticker attached.',
    quantity: 1,
    cost: 6.0,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-heavy-framing-angle.jpg',
  },
  {
    id: 'drawer5-oatey-dishwasher-wye',
    name: 'Oatey 1-1/2 in Polypropylene Dishwasher Wye',
    description:
      'Oatey / tubular polypropylene 1-1/2 in washing machine / dishwasher wye branch tailpiece in purple-labeled bag. Slip-joint style sink drain branch.',
    quantity: 1,
    cost: 5.68,
    location: 'drawer 5',
    application: 'Plumbing',
    photoFile: 'drawer5/drawer5-oatey-dishwasher-wye.jpg',
  },
  {
    id: 'drawer5-drain-saddle',
    name: 'RO drain saddle valve',
    description:
      'White plastic reverse-osmosis drain saddle clamp / valve for tapping a 1/4 in waste line into a drain pipe.',
    quantity: 1,
    cost: 5.0,
    location: 'drawer 5',
    application: 'Plumbing',
    photoFile: 'drawer5/drawer5-drain-saddle.jpg',
  },
  {
    id: 'drawer5-black-bumpers',
    name: 'Black plastic caps / bumpers (bag)',
    description:
      'Clear bag of small black plastic/rubber caps, bumpers, or screw covers. Approximate piece count.',
    quantity: 25,
    cost: 0.1,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-black-bumpers.jpg',
  },
  {
    id: 'drawer5-adfors-spline',
    name: 'ADFORS screen spline (bag)',
    description:
      'Saint-Gobain ADFORS window/door screen spline coil in retail bag. Partial/used length; street price referenced to full HD roll.',
    quantity: 1,
    cost: 8.0,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-adfors-spline.jpg',
  },
  {
    id: 'drawer5-ikea-besta-hinges',
    name: 'IKEA BESTÅ soft-close/push-open hinge kit',
    description:
      'IKEA BESTÅ soft closing / push-open hinge hardware, article 802.612.58, with instruction sheet and accompanying dark metal mounting brackets in small cardboard box.',
    quantity: 1,
    cost: 15.0,
    location: 'drawer 5',
    application: 'Furniture',
    photoFile: 'drawer5/drawer5-ikea-besta-hinges.jpg',
  },
  {
    id: 'drawer5-edge-banding',
    name: 'Wood veneer edge banding roll',
    description:
      'Small roll of thin wood-veneer / edge-banding tape (light natural tone), taped closed. Approx 2–3 in diameter remnant.',
    quantity: 1,
    cost: 3.0,
    location: 'drawer 5',
    application: 'Hardware',
    photoFile: 'drawer5/drawer5-edge-banding.jpg',
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

function toRecord(spec: Drawer5SeedSpec, photoCount: number, now: number): ItemRecord {
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

/** Insert missing drawer5 items; refresh photos/costs/names when DRAWER5_SEED_VERSION bumps. */
export async function seedDrawer5Missing(adapter: InventoryAdapter): Promise<void> {
  const existing = await adapter.list()
  const byId = new Map(existing.map((item) => [item.id, item]))
  const now = Date.now()
  const needsRefresh =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(DRAWER5_SEED_KEY) !== DRAWER5_SEED_VERSION

  for (const spec of DRAWER5_SEED) {
    const photo = await fetchSeedPhoto(spec.photoFile)
    const photos = photo ? [photo] : []
    const count = photos.length
    const current = byId.get(spec.id)
    if (!current) {
      await adapter.upsert(toRecord(spec, count, now), photos.length ? photos : undefined)
      continue
    }
    if (needsRefresh) {
      await adapter.upsert(
        {
          ...current,
          name: spec.name,
          description: spec.description,
          cost: spec.cost,
          recommendedPrice: recommendedPrice(spec.cost),
          quantity: spec.quantity,
          location: spec.location,
          application: spec.application,
          photoCount: count || current.photoCount,
          updatedAt: now,
        },
        photos.length ? photos : undefined,
      )
    }
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(DRAWER5_SEED_KEY, DRAWER5_SEED_VERSION)
  }
}
