'use client'

import type { SortKey, SortDir } from '@/lib/types'

// Column definitions for the sortable header. Widths are inlined to match the
// WineCard rows exactly so the two stay aligned. `key` is the SortKey this
// column sorts by; `label` is what's displayed.
const COLUMNS: { key: SortKey; label: string; className: string }[] = [
  { key: 'name', label: 'Name', className: 'flex-1 min-w-0 font-medium' },
  { key: 'producer', label: 'Producer', className: 'w-40 truncate' },
  { key: 'type', label: 'Type', className: 'w-24' },
  { key: 'country', label: 'Country', className: 'w-28' },
  { key: 'year', label: 'Year', className: 'w-16' },
  { key: 'score', label: 'Score', className: 'w-16' },
  { key: 'readyToDrink', label: 'Ready', className: 'w-40' },
  { key: 'price', label: 'Price', className: 'w-20' },
  { key: 'quantity', label: 'Qty', className: 'w-12' },
]

export default function ColumnHeader({
  sortKey,
  sortDir,
  onSortChange,
}: {
  sortKey: SortKey
  sortDir: SortDir
  onSortChange: (key: SortKey, dir: SortDir) => void
}) {
  // Clicking a column: if it's already the active sort key, flip the
  // direction; otherwise start that column ascending.
  const handleClick = (key: SortKey) => {
    if (key === sortKey) {
      onSortChange(key, sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      onSortChange(key, 'asc')
    }
  }

  return (
        <div className="flex items-center gap-8 bg-canvas px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink">
      {COLUMNS.map((col) => {
        const active = col.key === sortKey
        return (
          <button
            key={col.key}
            type="button"
            onClick={() => handleClick(col.key)}
            className={`flex items-center gap-1 p-0 text-left hover:text-primary ${
              active ? 'text-primary' : ''
            } ${col.className}`}
          >
            <span className="truncate uppercase">{col.label}</span>
            {/* Stacked up/down arrows; the active sort direction is highlighted
                in the primary color, the inactive one is muted. */}
            <span className="flex w-2 flex-col items-center text-[8px] leading-none" aria-hidden>
              <span className={active && sortDir === 'asc' ? 'text-primary' : 'text-ink/30'}>▲</span>
              <span className={active && sortDir === 'desc' ? 'text-primary' : 'text-ink/30'}>▼</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
