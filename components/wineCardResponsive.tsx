import type { Wine } from '@/lib/types'
import { TYPE_BADGE, BADGE } from './badges'

// A single muted stat line (label + value) used in the stacked layout.
const statLine = (label: string, value: string) => (
    <span className="text-sm text-muted">
        {label}: {value}
    </span>
)

/**
 * WineCardResponsive — the mobile variant of a wine row.
 *
 * Below the `sm` breakpoint the horizontal 9-column table is hidden and this
 * stacked card is shown instead, so long names never get cropped. Layout and
 * type/ready badges mirror the Paper `WineCardResponsive` artboard.
 */
export function WineCardResponsive({ wine }: { wine: Wine }) {
    return (
        <div className="flex flex-col gap-2 px-4 py-3 border-b border-border">
            {/* Name + producer */}
            <div className="flex flex-col gap-1">
                <span className="font-display text-base font-semibold text-ink">
                    {wine.name}
                </span>
                <span className="text-sm text-muted">{wine.producer}</span>
            </div>

            {/* Type + Ready badges */}
            <div className="flex flex-wrap items-center gap-2">
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
            </div>

            {/* Remaining details as muted stat lines */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {statLine('Country', wine.country)}
                {statLine('Year', String(wine.year))}
                {statLine('Score', `${wine.score}/100`)}
                {statLine('Price', `£${wine.price.toFixed(2)}`)}
                {statLine('Quantity', String(wine.quantity))}
            </div>
        </div>
    )
}
