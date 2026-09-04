import { recommendedPrice } from '../money'
import type { InventoryAdapter } from '../storage/adapter'
import type { ItemRecord } from '../types'

export type SeedSpec = {
  id: string
  name: string
  description: string
  quantity: number
  cost: number
  location: string
  application: string
  photoFile: string
}

export const DRYWALL_SEED: SeedSpec[] = [
  {
    id: 'seed-hercules-220-pack',
    name: 'Hercules 9" Drywall Sanding Discs 220 Grit (5-Pack)',
    description:
      'Hercules HA2DWS-220. Sealed 5-pack of 9" hook-and-loop aluminum oxide drywall discs, fine 220 grit, for 9-hole drywall sanders.',
    quantity: 1,
    cost: 11.99,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'hercules-220-pack.jpg',
  },
  {
    id: 'seed-hercules-120-pack',
    name: 'Hercules 9" Drywall Sanding Discs 120 Grit (5-Pack)',
    description:
      'Hercules HA2DWS-120. Sealed 5-pack of 9" hook-and-loop aluminum oxide drywall discs, medium 120 grit, fits 9-hole drywall sanders.',
    quantity: 1,
    cost: 11.99,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'hercules-120-pack.jpg',
  },
  {
    id: 'seed-hercules-p120-disc',
    name: 'Hercules 9" Drywall Sanding Disc P120 (loose)',
    description:
      'Single loose Hercules 9" hook-and-loop drywall sanding disc, P120 grit, multi-hole dust extraction.',
    quantity: 1,
    cost: 2.4,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'hercules-p120-disc.jpg',
  },
  {
    id: 'seed-bauer-60-discs',
    name: 'Bauer 9" Drywall Sanding Discs 60 Grit (loose)',
    description:
      'Loose Bauer 9" hook-and-loop drywall discs, 60 grit (coarse), 8-hole pattern. Premium zirconia.',
    quantity: 2,
    cost: 1.5,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'bauer-60-discs.jpg',
  },
  {
    id: 'seed-bauer-120-discs',
    name: 'Bauer 9" Drywall Sanding Discs 120 Grit (loose)',
    description:
      'Loose Bauer 9" hook-and-loop drywall discs, 120 grit (medium), 8-hole pattern.',
    quantity: 2,
    cost: 1.5,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'bauer-120-discs.jpg',
  },
  {
    id: 'seed-bauer-220-discs',
    name: 'Bauer 9" Drywall Sanding Discs 220 Grit (loose)',
    description:
      'Loose Bauer 9" hook-and-loop drywall discs, 220 grit (fine), 8-hole pattern.',
    quantity: 2,
    cost: 1.5,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'bauer-220-discs.jpg',
  },
  {
    id: 'seed-3m-80-sheets',
    name: '3M Drywall Sanding Sheets 80 Grit (25-Pack)',
    description:
      '3M coarse 80 grit drywall sanding sheets, approx 4-3/16" x 11-1/4", package marked 25 sheets. Fits hand sanders.',
    quantity: 1,
    cost: 18.0,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: '3m-80-sheets.jpg',
  },
  {
    id: 'seed-3m-120-screens',
    name: '3M Drywall Sanding Screens 120 Grit (10-Pack)',
    description:
      '3M medium 120 grit drywall sanding screens, 4-3/16" x 11-1/4", 10-pack. Open mesh, washable.',
    quantity: 1,
    cost: 16.47,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: '3m-120-screens.jpg',
  },
  {
    id: 'seed-paper-joint-tape',
    name: 'Paper Drywall Joint Tape (Sheetrock)',
    description:
      'Large roll of paper drywall joint tape (Sheetrock branding on core). Standard seam reinforcement tape.',
    quantity: 1,
    cost: 5.0,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'paper-joint-tape.jpg',
  },
  {
    id: 'seed-mesh-tape-rolls',
    name: 'Fiberglass Mesh Drywall Joint Tape',
    description:
      'Self-adhesive fiberglass mesh drywall joint tape rolls (white). One fuller, one partially used.',
    quantity: 2,
    cost: 7.0,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'mesh-tape-rolls.jpg',
  },
  {
    id: 'seed-hand-sander',
    name: 'Husky Drywall Hand Sander',
    description:
      'Husky clamp-style drywall hand sander, aluminum base with black D-handle. Holds sanding sheets/screens. Used, dusty.',
    quantity: 1,
    cost: 12.0,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'hand-sander.jpg',
  },
  {
    id: 'seed-sanding-sponges',
    name: 'Sanding Sponges / Blocks (assorted)',
    description:
      'Assorted rectangular dual-grit sanding sponges/blocks (dark abrasive faces, purple foam). Includes used pieces with drywall dust.',
    quantity: 5,
    cost: 2.0,
    location: 'top shelf of black closet',
    application: 'Drywall finishing',
    photoFile: 'sanding-sponges.jpg',
  },
]

function toRecord(spec: SeedSpec, hasPhoto: boolean, now: number): ItemRecord {
  return {
    id: spec.id,
    name: spec.name,
    description: spec.description,
    quantity: spec.quantity,
    cost: spec.cost,
    recommendedPrice: recommendedPrice(spec.cost),
    location: spec.location,
    application: spec.application,
    hasPhoto,
    createdAt: now,
    updatedAt: now,
  }
}

async function fetchSeedPhoto(photoFile: string): Promise<Blob | undefined> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}seed-photos/${photoFile}`)
    if (res.ok) return await res.blob()
  } catch {
    // ignore network / 404
  }
  return undefined
}

let seedLock: Promise<void> | null = null

async function seedOnce(adapter: InventoryAdapter): Promise<void> {
  const existing = await adapter.list()
  const now = Date.now()

  if (existing.length > 0) {
    // Backfill seed photos for items that were seeded before photos loaded (404 under BASE_URL).
    const byId = new Map(existing.map((item) => [item.id, item]))
    for (const spec of DRYWALL_SEED) {
      const item = byId.get(spec.id)
      if (!item || item.hasPhoto) continue
      const photo = await fetchSeedPhoto(spec.photoFile)
      if (!photo) continue
      await adapter.upsert({ ...item, hasPhoto: true, updatedAt: Date.now() }, photo)
    }
    return
  }

  for (const spec of DRYWALL_SEED) {
    const photo = await fetchSeedPhoto(spec.photoFile)
    await adapter.upsert(toRecord(spec, Boolean(photo), now), photo)
  }
}

export async function ensureSeeded(adapter: InventoryAdapter): Promise<void> {
  if (!seedLock) {
    seedLock = seedOnce(adapter).catch((err) => {
      seedLock = null
      throw err
    })
  }
  await seedLock
}
