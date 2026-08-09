import type { Wine, WineType } from '@/lib/types'

// Map each wine type to its Data Badge colors (from the Paper Data Badges artboard).
const TYPE_BADGE: Record<WineType, string> = {
    red: 'bg-type-red-bg text-type-red-fg',
    white: 'bg-type-white-bg text-type-white-fg',
    rosé: 'bg-type-rose-bg text-type-rose-fg',
    sparkling: 'bg-type-sparkling-bg text-type-sparkling-fg',
    fortified: 'bg-type-fortified-bg text-type-fortified-fg',
    dessert: 'bg-type-dessert-bg text-type-dessert-fg',
}

// Shared badge styling: 12px uppercase, 8px/4px padding (matches the design).
const BADGE = 'inline-flex items-center px-2 py-1 text-xs uppercase'

export default function WineCard({ wine }: { wine: Wine }) {
    return (
        <div className="flex items-center gap-4 px-4 py-2 border-b border-border hover:bg-ink/5">
            <span className="flex-1 min-w-0 font-display font-semibold text-base truncate">
                {wine.name}
            </span>
            <span className="w-40 truncate text-sm text-muted">{wine.producer}</span>

            {/* Type → colored Data Badge. Fixed slot keeps columns aligned. */}
            <span className="w-24 flex-shrink-0 flex items-center">
                <span className={`${BADGE} ${TYPE_BADGE[wine.type]}`}>{wine.type}</span>
            </span>

            <span className="w-28 truncate text-sm text-muted">{wine.country}</span>
            <span className="w-16 text-sm text-muted">{wine.year}</span>
            <span className="w-16 text-sm text-muted">{wine.score}/100</span>

            {/* Ready to Drink → green/red Data Badge. */}
            <span className="w-40 flex-shrink-0 flex items-center">
                <span
                    className={`${BADGE} ${
                        wine.readyToDrink
                            ? 'bg-ready-bg text-ready-fg'
                            : 'bg-notready-bg text-notready-fg'
                    }`}
                >
                    {wine.readyToDrink ? 'Ready to drink' : 'Not ready to drink'}
                </span>
            </span>

            <span className="w-20 text-sm text-muted">£{wine.price}</span>
            <span className="w-12 text-sm text-muted">{wine.quantity}</span>
        </div>
    )
}