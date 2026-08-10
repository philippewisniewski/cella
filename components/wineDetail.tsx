'use client'

import Link from 'next/link'
import type { Wine } from '@/lib/types'

export default function WineDetail({
    wine,
    onClose,
    onDelete,
}: {
    wine: Wine
    onClose?: () => void
    onDelete?: (id: string) => void
}) {
    // A single stat row: label (left, muted) + value (right, wraps).
    const stat = (label: string, value: string) => (
        <div className="flex items-start justify-between gap-4">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="text-sm text-muted text-right">{value}</dd>
        </div>
    )

    // A labelled prose block (Description / Tasting Notes) per the design:
    // Cinzel heading + muted body, 8px gap.
    const prose = (label: string, value: string) => (
        <div className="flex flex-col gap-2">
            <p className="font-display text-base font-semibold">{label}</p>
            <p className="text-sm text-muted">{value}</p>
        </div>
    )

    return (
        <div className="flex flex-col justify-between gap-8 p-4">
            <button
                onClick={() => onClose?.()}
                className="cursor-pointer self-start bg-secondary px-4 py-[7px] text-xs text-ink hover:bg-secondary-hover active:bg-secondary-active"
            >
                ✕ Close
            </button>
            <h2 className="font-display text-base font-semibold">{wine.name}</h2>

            <dl className="flex flex-col gap-4">
                {stat('Producer', wine.producer)}
                {stat('Type', wine.type)}
                {stat('Grape Variety', wine.grapeVariety.join(', '))}
                {stat('Year', String(wine.year))}
                {stat('Quantity', String(wine.quantity))}
                {stat('Appellation', wine.appellation)}
                {stat('Price', `£${wine.price.toFixed(2)}`)}
                {stat('Alcoholic Strength', `${wine.alcoholicStrength}%`)}
                {stat('Bottle Volume', `${wine.bottleVolume} ml`)}
                {stat('Contains Sulphites', wine.containsSulphites ? 'Yes' : 'No')}
                {stat('Country', wine.country)}
                {stat('Region', wine.region)}
                {wine.address ? stat('Address', wine.address) : null}
                {stat('Score', String(wine.score))}
                {stat('Ready to Drink', wine.readyToDrink ? 'Yes' : 'No')}
                {wine.description ? prose('Description', wine.description) : null}
                {wine.tastingNotes ? prose('Tasting Notes', wine.tastingNotes) : null}
            </dl>

            <div className="flex items-center gap-4">
                <Link
                    href={`/edit/${wine.id}`}
                    className="cursor-pointer bg-primary px-4 py-[7px] text-sm text-white hover:bg-primary-hover active:bg-primary-active"
                >
                    Edit Wine
                </Link>
                <button
                    onClick={() => {
                        if (confirm('Remove this wine from your cellar? This cannot be undone.')) {
                            onDelete?.(wine.id)
                        }
                    }}
                    className="cursor-pointer bg-secondary px-4 py-[7px] text-sm text-ink hover:bg-secondary-hover active:bg-secondary-active"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
