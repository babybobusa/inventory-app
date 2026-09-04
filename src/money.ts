import { MARKUP_RATE } from './types'

export function recommendedPrice(cost: number): number {
  const n = Number.isFinite(cost) ? cost : 0
  return Math.round(n * MARKUP_RATE * 100) / 100
}

export function money(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number.isFinite(n) ? n : 0)
}
