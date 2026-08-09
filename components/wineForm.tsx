'use client'

import { useState } from 'react'
import type { Wine, WineType } from '@/lib/types'

// A blank wine object to use when adding a new wine.
const BLANK: Wine = {
    // Generate a unique ID for the new wine. If `crypto` is available, use `crypto.randomUUID()`, otherwise fallback to 'new'.
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
    // If `wine` is provided - wine is being edited; otherwise we're adding a new one.
    const [form, setForm] = useState<Wine>(wine ?? BLANK)

    // Helper function to update a specific field in the form state.
    const set = <K extends keyof Wine>(key: K, value: Wine[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }))

    // A labelled field: 12px uppercase label + control, 8px gap (per design).
    const field = (
        label: string,
        control: React.ReactNode,
        full = false,
    ) => (
        <div className={`flex flex-col gap-2 ${full ? 'w-full' : 'flex-1'}`}>
            <label className="text-xs font-normal uppercase tracking-wide text-ink">
                {label}
            </label>
            {control}
        </div>
    )

    // Shared input styling: matches the design's input fill + padding.
    const inputCls =
        'w-full rounded-md border border-border bg-input px-4 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30'

    return (
        <div className="mx-auto flex w-full max-w-[688px] flex-col gap-8 p-4">
            <h2 className="font-display text-2xl">{wine ? 'Edit Wine' : 'Add Wine'}</h2>

            <div className="flex flex-col gap-8">
                {/* Row 1 */}
                <div className="flex gap-5">
                    {field(
                        'Name',
                        <input
                            className={inputCls}
                            value={form.name}
                            onChange={(e) => set('name', e.target.value)}
                        />,
                    )}
                    {field(
                        'Producer',
                        <input
                            className={inputCls}
                            value={form.producer}
                            onChange={(e) => set('producer', e.target.value)}
                        />,
                    )}
                </div>

                {/* Row 2 */}
                <div className="flex gap-5">
                    {field(
                        'Type',
                        <select
                            className={inputCls}
                            value={form.type}
                            onChange={(e) => set('type', e.target.value as WineType)}
                        >
                            <option value="red">Red</option>
                            <option value="white">White</option>
                            <option value="rosé">Rosé</option>
                            <option value="sparkling">Sparkling</option>
                            <option value="fortified">Fortified</option>
                            <option value="dessert">Dessert</option>
                        </select>,
                    )}
                    {field(
                        'Grape Variety',
                        <input
                            className={inputCls}
                            value={form.grapeVariety.join(', ')}
                            onChange={(e) =>
                                set('grapeVariety', e.target.value.split(',').map((g) => g.trim()))
                            }
                        />,
                    )}
                </div>

                {/* Row 3 */}
                <div className="flex gap-5">
                    {field(
                        'Year',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.year}
                            onChange={(e) => set('year', parseInt(e.target.value) || 0)}
                        />,
                    )}
                    {field(
                        'Quantity',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.quantity}
                            onChange={(e) => set('quantity', parseInt(e.target.value) || 0)}
                        />,
                    )}
                </div>

                {/* Row 4 */}
                <div className="flex gap-5">
                    {field(
                        'Appellation',
                        <input
                            className={inputCls}
                            value={form.appellation}
                            onChange={(e) => set('appellation', e.target.value)}
                        />,
                    )}
                    {field(
                        'Price',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.price}
                            onChange={(e) => set('price', parseFloat(e.target.value) || 0)}
                        />,
                    )}
                </div>

                {/* Row 5 */}
                <div className="flex gap-5">
                    {field(
                        'Alcoholic Strength',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.alcoholicStrength}
                            onChange={(e) =>
                                set('alcoholicStrength', parseFloat(e.target.value) || 0)
                            }
                        />,
                    )}
                    {field(
                        'Bottle Volume (ml)',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.bottleVolume}
                            onChange={(e) => set('bottleVolume', parseInt(e.target.value) || 0)}
                        />,
                    )}
                </div>

                {/* Row 6 */}
                <div className="flex gap-5">
                    {field(
                        'Country',
                        <input
                            className={inputCls}
                            value={form.country}
                            onChange={(e) => set('country', e.target.value)}
                        />,
                    )}
                    {field(
                        'Region',
                        <input
                            className={inputCls}
                            value={form.region}
                            onChange={(e) => set('region', e.target.value)}
                        />,
                    )}
                </div>

                {/* Row 7 */}
                <div className="flex gap-5">
                    {field(
                        'Score',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.score}
                            onChange={(e) => set('score', parseInt(e.target.value) || 0)}
                        />,
                    )}
                    {field(
                        'Contains Sulphites',
                        <input
                            type="checkbox"
                            className="mt-2 h-4 w-4 accent-primary"
                            checked={form.containsSulphites}
                            onChange={(e) => set('containsSulphites', e.target.checked)}
                        />,
                    )}
                </div>

                {/* Row 8 */}
                <div className="flex gap-5">
                    {field(
                        'Address',
                        <input
                            className={inputCls}
                            value={form.address ?? ''}
                            onChange={(e) => set('address', e.target.value)}
                        />,
                    )}
                    {field(
                        'Ready to Drink',
                        <input
                            type="checkbox"
                            className="mt-2 h-4 w-4 accent-primary"
                            checked={form.readyToDrink}
                            onChange={(e) => set('readyToDrink', e.target.checked)}
                        />,
                    )}
                </div>

                {/* Full-width prose fields */}
                {field(
                    'Description',
                    <textarea
                        className={inputCls}
                        rows={4}
                        value={form.description}
                        onChange={(e) => set('description', e.target.value)}
                    />,
                    true,
                )}
                {field(
                    'Tasting Notes',
                    <textarea
                        className={inputCls}
                        rows={4}
                        value={form.tastingNotes}
                        onChange={(e) => set('tastingNotes', e.target.value)}
                    />,
                    true,
                )}
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => onSave(form)}
                    className="cursor-pointer rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-hover"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer rounded-md bg-secondary px-4 py-2 text-ink hover:bg-secondary-hover"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
