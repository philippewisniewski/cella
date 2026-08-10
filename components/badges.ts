import type { WineType } from '@/lib/types'

// Map each wine type to its Data Badge colors (from the Paper Data Badges artboard).
export const TYPE_BADGE: Record<WineType, string> = {
    red: 'bg-type-red-bg text-type-red-fg',
    white: 'bg-type-white-bg text-type-white-fg',
    rosé: 'bg-type-rose-bg text-type-rose-fg',
    sparkling: 'bg-type-sparkling-bg text-type-sparkling-fg',
    fortified: 'bg-type-fortified-bg text-type-fortified-fg',
    dessert: 'bg-type-dessert-bg text-type-dessert-fg',
}

// Shared badge styling: 12px uppercase, 8px/4px padding (matches the design).
export const BADGE = 'inline-flex items-center px-2 py-1 text-xs uppercase'
