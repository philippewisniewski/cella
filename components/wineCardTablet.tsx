import type { Wine } from '@/lib/types'
import { TYPE_BADGE, BADGE } from './badges'

/**
 * WineCardTablet — the tablet variant of a wine row.
 *
 * Between the `sm` and `lg` breakpoints the inline table is too wide and the
 * fully-stacked card leaves whitespace on the right, so this middle layout
 * keeps the wine name on its own full-width row and wraps the remaining data
 * points (producer, badges, stats) onto a second row that fills the width.
 */
export function WineCardTablet({ wine }: { wine: Wine }) {
    return (
        <div className="flex flex-col gap-2 px-4 py-3 border-b border-border">
            {/* Row 1: wine name spans the full width. */}
            <span className="font-display text-base font-semibold text-ink truncate">
                {wine.name}
            </span>

            {/* Row 2: producer + badges + stats, wrapping to use the width. */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-sm text-muted">{wine.producer}</span>
                <span className={`${BADGE} ${TYPE_BADGE[wine.type]}`}>{wine.type}</span>
                <span
                    className={`${BADGE} ${
                        wine.readyToDrink
                            ? 'bg-ready-bg text-ready-fg'
                            : 'bg-notready-bg text-notready-fg'
                    }`}
                >
                    {wine.readyToDrink ? 'Ready to drink' : 'Not ready to drink'}
                </span>
                <span className="text-sm text-muted">Country: {wine.country}</span>
                <span className="text-sm text-muted">Year: {wine.year}</span>
                <span className="text-sm text-muted">Score: {wine.score}/100</span>
                <span className="text-sm text-muted">£{wine.price.toFixed(2)}</span>
                <span className="text-sm text-muted">Qty: {wine.quantity}</span>
            </div>
        </div>
    )
}
