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
            <label className="text-xs font-normal uppercase text-ink">
                {label}
            </label>
            {control}
        </div>
    )

    // Shared input styling: matches the design's borderless input fill + padding.
    const inputCls =
        'w-full bg-input px-4 py-[7px] text-sm text-muted focus:outline-none focus:ring-2 focus:ring-primary/30'

    // A radio group (Yes/No) used for boolean fields, matching the design's
    // 12px circular radios with muted labels.
    const radioGroup = (
        name: string,
        value: boolean,
        onChange: (v: boolean) => void,
        yesLabel: string,
        noLabel: string,
    ) => (
        <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
                <input
                    type="radio"
                    name={name}
                    checked={value}
                    onChange={() => onChange(true)}
                    className="h-3 w-3 accent-primary"
                />
                <span className="text-sm text-muted">{yesLabel}</span>
            </label>
            <label className="flex items-center gap-1">
                <input
                    type="radio"
                    name={name}
                    checked={!value}
                    onChange={() => onChange(false)}
                    className="h-3 w-3 accent-primary"
                />
                <span className="text-sm text-muted">{noLabel}</span>
            </label>
        </div>
    )

    return (
        <div className="flex flex-col gap-8 p-4 md:flex-row md:gap-8">
            <div className="md:flex-1">
                <h2 className="font-display text-2xl font-semibold leading-[30px]">
                    {wine ? 'Edit Wine' : 'Add Wine'}
                </h2>
            </div>

            <div className="flex flex-col gap-8 md:flex-1">
                {/* Row 1 */}
                <div className="flex flex-col gap-5 md:flex-row md:gap-5">
                    {field(
                        'Wine Name',
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
                <div className="flex flex-col gap-5 md:flex-row md:gap-5">
                    {field(
                        'Type',
                        <select
                            className={`${inputCls} appearance-none`}
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
                <div className="flex flex-col gap-5 md:flex-row md:gap-5">
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
                <div className="flex flex-col gap-5 md:flex-row md:gap-5">
                    {field(
                        'Appellation',
                        <input
                            className={inputCls}
                            value={form.appellation}
                            onChange={(e) => set('appellation', e.target.value)}
                        />,
                    )}
                    {field(
                        'Value (£)',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.price}
                            onChange={(e) => set('price', parseFloat(e.target.value) || 0)}
                        />,
                    )}
                </div>

                {/* Row 5 */}
                <div className="flex flex-col gap-5 md:flex-row md:gap-5">
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
                        'Bottle Volume',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.bottleVolume}
                            onChange={(e) => set('bottleVolume', parseInt(e.target.value) || 0)}
                        />,
                    )}
                </div>

                {/* Row 6 */}
                <div className="flex flex-col gap-5 md:flex-row md:gap-5">
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
                <div className="flex flex-col gap-5 md:flex-row md:gap-5">
                    {field(
                        'Score (Out of 100)',
                        <input
                            type="number"
                            className={inputCls}
                            value={form.score}
                            onChange={(e) => set('score', parseInt(e.target.value) || 0)}
                        />,
                    )}
                    {field(
                        'Contains Sulphites?',
                        radioGroup(
                            'containsSulphites',
                            form.containsSulphites,
                            (v) => set('containsSulphites', v),
                            'Yes',
                            'No',
                        ),
                    )}
                </div>

                {/* Row 8 */}
                <div className="flex flex-col gap-5 md:flex-row md:gap-5">
                    {field(
                        'Address',
                        <input
                            className={inputCls}
                            value={form.address ?? ''}
                            onChange={(e) => set('address', e.target.value)}
                        />,
                    )}
                    {field(
                        'Ready to Drink?',
                        radioGroup(
                            'readyToDrink',
                            form.readyToDrink,
                            (v) => set('readyToDrink', v),
                            'Ready to drink',
                            'Not ready for drinking',
                        ),
                    )}
                </div>

                {/* Full-width prose fields */}
                {field(
                    'Description',
                    <textarea
                        className={`${inputCls} h-[152px]`}
                        value={form.description}
                        onChange={(e) => set('description', e.target.value)}
                    />,
                    true,
                )}
                {field(
                    'Tasting Notes',
                    <textarea
                        className={`${inputCls} h-[152px]`}
                        value={form.tastingNotes}
                        onChange={(e) => set('tastingNotes', e.target.value)}
                    />,
                    true,
                )}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => onSave(form)}
                    className="cursor-pointer bg-primary px-4 py-[7px] text-sm text-white hover:bg-primary-hover active:bg-primary-active"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer bg-secondary px-4 py-[7px] text-sm text-ink hover:bg-secondary-hover active:bg-secondary-active"
                >
                    Cancel
                </button>
            </div>
            </div>
        </div>
    )
}
