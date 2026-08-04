'use client'

import type { Wine } from '@/lib/types'
import WineCard from './wineCard'

/**
 * WineList Component
 *
 * Renders the cellar as a horizontal inventory table: one clickable WineCard
 * row per wine. The sortable column header lives in the sticky Header above,
 * so the rows stay aligned with it. Clicking a row opens the detail flyout
 * (handled by the parent via `onSelect`).
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