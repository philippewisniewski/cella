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
            {/* One selectable row per wine. Each row is a real <button> so
                keyboard users can tab through the cellar and press Enter to
                open a wine (screen readers announce them as buttons).
                Three responsive tiers inside:
                - >= lg (1024px): horizontal table row
                - sm..lg (640-1023px): tablet layout (name row + wrapping data)
                - < sm (639px): fully-stacked card */}
            {wines.map((wine) => (
                <button
                    key={wine.id}
                    type="button"
                    onClick={() => onSelect(wine)}
                    className="block w-full cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:outline-none"
                    aria-label={`View ${wine.name} ${wine.year}, ${wine.producer}`}
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
                </button>
            ))}
        </div>
    )
}