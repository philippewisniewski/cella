'use client'

import type { SortKey, SortDir } from '@/lib/types'

// The fields the user can sort by, with friendly labels.
const KEY_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'score', label: 'Score' },
  { value: 'name', label: 'Name' },
  { value: 'year', label: 'Year' },
  { value: 'price', label: 'Price' },
  { value: 'quantity', label: 'Quantity' },
]

export default function Sort({
  sortKey,
  sortDir,
  onChange,
}: {
  sortKey: SortKey
  sortDir: SortDir
  onChange: (key: SortKey, dir: SortDir) => void
}) {
  return (
    <div className="flex items-end gap-2">
      <label className="flex flex-col gap-1">
        <span>Sort by</span>
        <select
          value={sortKey}
          onChange={(e) => onChange(e.target.value as SortKey, sortDir)}
        >
          {KEY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {/* Toggles asc/desc; shows the current direction. */}
      <button
        type="button"
        onClick={() => onChange(sortKey, sortDir === 'asc' ? 'desc' : 'asc')}
      >
        {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  )
}
