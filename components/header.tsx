'use client'

import type { Wine, WineFilters, SortKey, SortDir } from '@/lib/types'
import Search from './search'
import Filters from './filters'
import Sort from './sort'

export default function Header({
    wines,
    searchValue,
    onSearchChange,
    filters,
    onFilterChange,
    onAddWine,
    sortKey,
    sortDir,
    onSortChange,
}: {
    wines: Wine[]
    searchValue: string
    onSearchChange: (value: string) => void
    filters: WineFilters
    onFilterChange: (next: WineFilters) => void
    onAddWine: () => void
    sortKey: SortKey
    sortDir: SortDir
    onSortChange: (key: SortKey, dir: SortDir) => void
}) {
    return (
        <header className="sticky top-0 z-10 border-b bg-white p-4">
            {/* Top row: search (left) + Add Wine button */}
            <div className="flex items-center gap-3">
                <div className="w-64">
                    <Search value={searchValue} onChange={onSearchChange} />
                </div>
                <button
                    type="button"
                    onClick={onAddWine}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white"
                >
                    + Add Wine
                </button>
            </div>

            {/* Filters row: dropdowns + sort control */}
            <div className="mt-3 flex flex-wrap items-end gap-4">
                <Filters
                    wines={wines}
                    filters={filters}
                    onChange={onFilterChange}
                />
                <Sort
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onChange={onSortChange}
                />
            </div>
        </header>
    )
}