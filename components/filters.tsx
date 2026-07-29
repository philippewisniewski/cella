'use client'

import { useMemo } from 'react'
import type { Wine, WineFilters } from '@/lib/types'

export default function Filters({
  wines,
  filters,
  onChange,
}: {
  wines: Wine[]
  filters: WineFilters
  onChange: (next: WineFilters) => void
}) {
  // Build the unique, sorted option lists for each dropdown straight from
  // the data. New wines added later automatically appear here.
  const countries = useMemo(
    () => Array.from(new Set(wines.map((w) => w.country))).sort(),
    [wines],
  )
  const types = useMemo(
    () => Array.from(new Set(wines.map((w) => w.type))).sort(),
    [wines],
  )
  const grapes = useMemo(
    () => Array.from(new Set(wines.flatMap((w) => w.grapeVariety))).sort(),
    [wines],
  )
  const appellations = useMemo(
    () => Array.from(new Set(wines.map((w) => w.appellation))).filter(Boolean).sort(),
    [wines],
  )

  // === BLOCK 2: the <select> dropdowns ===
  // Small helper that renders one labelled dropdown. `key` is the field on
  // WineFilters this dropdown controls (e.g. "country"); we write it with
  // `[key]` so the same helper works for all four.
  const select = (
    label: string,
    value: string | undefined,
    options: string[],
    key: keyof WineFilters,
  ) => (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      <select
        value={value ?? ''}
        onChange={(e) =>
          onChange({ ...filters, [key]: e.target.value || undefined })
        }
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  )

  // Render the four dropdowns.
  const selects = (
    <div className="flex flex-wrap gap-3">
      {select('Country', filters.country, countries, 'country')}
      {select('Type', filters.type, types, 'type')}
      {select('Grape', filters.grape, grapes, 'grape')}
      {select('Appellation', filters.appellation, appellations, 'appellation')}
    </div>
  )

  // === BLOCK 3: the Clear button + render ===
  // Reset every filter at once by sending back an empty object.
  const clear = (
    <button type="button" onClick={() => onChange({})}>
      Clear filters
    </button>
  )

  return (
    <div className="flex flex-wrap items-end gap-3">
      {selects}
      {clear}
    </div>
  )
}