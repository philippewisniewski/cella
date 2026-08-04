'use client'

import type { Wine } from '@/lib/types'
import WineCard from './wineCard'

/**
 * WineList Component
 *
 * Renders the cellar as a horizontal inventory table: a column-header row
 * followed by one clickable WineCard row per wine. Clicking a row opens
 * the detail flyout (handled by the parent via `onSelect`).
 */
export default function WineList({
    /**
     * wines: Array of Wine objects to display
     */
    wines,
    /**
     * onSelect: Callback fired when a wine row is clicked, opening its detail.
     */
    onSelect,
}: {
    wines: Wine[]
    onSelect: (wine: Wine) => void
}) {
    return (
        <div>
            {/* Column header — widths mirror WineCard so the rows line up.
                (Kept non-sticky for now to avoid overlapping the sticky page
                Header; revisit when the header is redesigned.) */}
            <div className="flex items-center gap-4 border-b border-t bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <span className="flex-1 min-w-0 font-medium">Name</span>
                <span className="w-40 truncate text-sm text-gray-500">Producer</span>
                <span className="w-20">Type</span>
                <span className="w-28">Country</span>
                <span className="w-16">Year</span>
                <span className="w-16">Score</span>
                <span className="w-16">Ready</span>
                <span className="w-20">Price</span>
                <span className="w-12">Qty</span>
            </div>

            {/* One clickable row per wine. */}
            {wines.map((wine) => (
                <div
                    key={wine.id}
                    onClick={() => onSelect(wine)}
                    className="cursor-pointer"
                >
                    <WineCard wine={wine} />
                </div>
            ))}
        </div>
    )
}