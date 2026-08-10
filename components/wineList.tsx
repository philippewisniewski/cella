'use client'

import type { Wine } from '@/lib/types'
import WineCard from './wineCard'
import { WineCardResponsive } from './wineCardResponsive'
import { WineCardTablet } from './wineCardTablet'

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
            {/* One clickable row per wine. Three responsive tiers:
                - >= lg (1024px): horizontal table row
                - sm..lg (640-1023px): tablet layout (name row + wrapping data)
                - < sm (639px): fully-stacked card */}
            {wines.map((wine) => (
                <div
                    key={wine.id}
                    onClick={() => onSelect(wine)}
                    className="cursor-pointer"
                >
                    <div className="hidden lg:block">
                        <WineCard wine={wine} />
                    </div>
                    <div className="hidden sm:block lg:hidden">
                        <WineCardTablet wine={wine} />
                    </div>
                    <div className="sm:hidden">
                        <WineCardResponsive wine={wine} />
                    </div>
                </div>
            ))}
        </div>
    )
}