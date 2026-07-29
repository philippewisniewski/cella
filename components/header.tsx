'use client'

import type { Wine, WineFilters } from '@/lib/types'
import Search from './search'
import Filters from './filters'

export default function Header({
    wines,
    searchValue,
    onSearchChange,
    filters,
    onFilterChange,
}: {
    wines: Wine[]
    searchValue: string
    onSearchChange: (value: string) => void
    filters: WineFilters
    onFilterChange: (next: WineFilters) => void
}) {
    return (
        <header className="border-b p-4">
            {/* Top row: title on the left, search on the right */}
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold">Cella Wine Dashboard</h1>
                <div className="w-64">
                    <Search value={searchValue} onChange={onSearchChange} />
                </div>
            </div>

            {/* Filters sit directly under the search bar */}
            <div className="mt-3">
                <Filters
                    wines={wines}
                    filters={filters}
                    onChange={onFilterChange}
                />
            </div>
        </header>
    )
}