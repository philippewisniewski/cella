'use client'

import { useState } from 'react'
import type { Wine, WineType } from '@/lib/types'

const BLANK: Wine = {
    id: typeof crypto !== 'undefined' ? crypto.randomUUID() : 'new',
    name: '',
    producer: '',
    type: 'red',
    grapeVariety: [],
    year: new Date().getFullYear(),
    quantity: 1,
    description: '',
    score: 0,
    appellation: '',
    price: 0,
    alcoholicStrength: 0,
    bottleVolume: 750,
    containsSulphites: true,
    country: '',
    region: '',
    tastingNotes: '',
    readyToDrink: false,
}

export default function WineForm({
    wine,
    onSave,
    onCancel,
}: {
    wine?: Wine
    onSave: (wine: Wine) => void
    onCancel: () => void
}) {
    // If `wine` is provided we're editing; otherwise we're adding a new one.
    const [form, setForm] = useState<Wine>(wine ?? BLANK)
    const set = <K extends keyof Wine>(key: K, value: Wine[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }))

    return (
        <div>
            <h2>{wine ? 'Edit Wine' : 'Add Wine'}</h2>

            <label>
                Name
                <input value={form.name} onChange={(e) => set('name', e.target.value)} />
            </label>

            <label>
                Producer
                <input value={form.producer} onChange={(e) => set('producer', e.target.value)} />
            </label>

            <label>
                Type
                <select value={form.type} onChange={(e) => set('type', e.target.value as WineType)}>
                    <option value="red">Red</option>
                    <option value="white">White</option>
                    <option value="rosé">Rosé</option>
                    <option value="sparkling">Sparkling</option>
                    <option value="fortified">Fortified</option>
                    <option value="dessert">Dessert</option>
                </select>
            </label>

            <label>
                Grape Variety
                <input
                    value={form.grapeVariety.join(', ')}
                    onChange={(e) =>
                        set('grapeVariety', e.target.value.split(',').map((g) => g.trim()))
                    }
                />
            </label>

            <label>
                Year
                <input type="number" value={form.year}
                    onChange={(e) => set('year', parseInt(e.target.value) || 0)} />
            </label>

            <label>
                Quantity
                <input type="number" value={form.quantity}
                    onChange={(e) => set('quantity', parseInt(e.target.value) || 0)} />
            </label>

            <label>
                Description
                <textarea value={form.description}
                    onChange={(e) => set('description', e.target.value)} />
            </label>

            <label>
                Score
                <input type="number" value={form.score}
                    onChange={(e) => set('score', parseInt(e.target.value) || 0)} />
            </label>

            <label>
                Appellation
                <input value={form.appellation}
                    onChange={(e) => set('appellation', e.target.value)} />
            </label>

            <label>
                Price
                <input type="number" value={form.price}
                    onChange={(e) => set('price', parseFloat(e.target.value) || 0)} />
            </label>

            <label>
                Alcoholic Strength
                <input type="number" value={form.alcoholicStrength}
                    onChange={(e) => set('alcoholicStrength', parseFloat(e.target.value) || 0)} />
            </label>

            <label>
                Bottle Volume (ml)
                <input type="number" value={form.bottleVolume}
                    onChange={(e) => set('bottleVolume', parseInt(e.target.value) || 0)} />
            </label>

            <label>
                Contains Sulphites
                <input type="checkbox" checked={form.containsSulphites}
                    onChange={(e) => set('containsSulphites', e.target.checked)} />
            </label>

            <label>
                Country
                <input value={form.country}
                    onChange={(e) => set('country', e.target.value)} />
            </label>

            <label>
                Region
                <input value={form.region}
                    onChange={(e) => set('region', e.target.value)} />
            </label>

            <label>
                Address
                <input value={form.address ?? ''}
                    onChange={(e) => set('address', e.target.value)} />
            </label>

            <label>
                Tasting Notes
                <textarea value={form.tastingNotes}
                    onChange={(e) => set('tastingNotes', e.target.value)} />
            </label>

            <label>
                Ready to Drink
                <input type="checkbox" checked={form.readyToDrink}
                    onChange={(e) => set('readyToDrink', e.target.checked)} />
            </label>

            <div>
                <button onClick={() => onSave(form)}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}
