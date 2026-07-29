'use client'

import type { Wine } from '@/lib/types'

export default function WineDetail({
    wine,
    onClose,
    onEdit,
    onDrink,
    onDelete,
}: {
    wine: Wine
    onClose?: () => void
    onEdit?: () => void
    onDrink?: (id: string) => void
    onDelete?: (id: string) => void
}) {
    // Helper function to render a field with label and value
    const field = (label: string, value: string) => (
        <div>
            <dt>{label}</dt>
            <dd>{value}</dd>
        </div>
    )

    return (
        <div>
            <button onClick={() => onClose?.()}>← Back to dashboard</button>
            <h2>{wine.name}</h2>
            
            <dl>
                {field('Producer', wine.producer)}
                {field('Type', wine.type)}
                {field('Grape Variety', wine.grapeVariety.join(', '))}
                {field('Year', String(wine.year))}
                {field('Quantity', String(wine.quantity))}
                {field('Appellation', wine.appellation)}
                {field('Price', `£${wine.price}`)}
                {field('Alcoholic Strength', `${wine.alcoholicStrength}%`)}
                {field('Bottle Volume', `${wine.bottleVolume} ml`)}
                {field('Contains Sulphites', wine.containsSulphites ? 'Yes' : 'No')}
                {field('Country', wine.country)}
                {field('Region', wine.region)}
                {wine.address ? field('Address', wine.address) : null}
                {field('Score', String(wine.score))}
                {field('Ready to Drink', wine.readyToDrink ? 'Yes' : 'No')}
                {wine.description ? field('Description', wine.description) : null}
                {wine.tastingNotes ? field('Tasting Notes', wine.tastingNotes) : null}
            </dl>

            <div>
                <button onClick={() => onEdit?.()}>Edit Wine</button>
                <button onClick={() => onDrink?.(wine.id)}>Drink (-1)</button>
                <button
                    onClick={() => {
                        if (confirm('Remove this wine from your cellar? This cannot be undone.')) {
                            onDelete?.(wine.id)
                        }
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
