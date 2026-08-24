import type { Wine } from '@/lib/types'
import { TYPE_BADGE, BADGE } from './badges'

export default function WineCard({ wine }: { wine: Wine }) {
    return (
        <div className="flex items-center gap-6 px-6 py-3.5 border-b border-border hover:bg-ink/5 transition-colors duration-150">
            {/* Name takes all remaining space with a generous minimum — the
                anchor column of the row. Everything else stays fixed-width
                for even, predictable rhythm. */}
            <span className="flex-1 min-w-72 font-display font-semibold text-base tracking-wide truncate">
                {wine.name}
            </span>
            <span className="w-44 flex-shrink-0 truncate text-sm text-muted">{wine.producer}</span>

            {/* Type → colored Data Badge. Fixed slot keeps columns aligned. */}
            <span className="w-24 flex-shrink-0 flex items-center">
                <span className={`${BADGE} ${TYPE_BADGE[wine.type]}`}>{wine.type}</span>
            </span>

            <span className="w-32 flex-shrink-0 truncate text-sm text-muted">{wine.country}</span>
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

            <span className="w-24 text-sm text-muted">£{wine.price.toFixed(2)}</span>
            <span className="w-12 text-sm text-muted">{wine.quantity}</span>
        </div>
    )
}