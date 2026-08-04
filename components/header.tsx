'use client'

import type { SortKey, SortDir } from '@/lib/types'
import Search from './search'
import ColumnHeader from './columnHeader'

export default function Header({
    searchValue,
    onSearchChange,
    onAddWine,
    sortKey,
    sortDir,
    onSortChange,
}: {
    searchValue: string
    onSearchChange: (value: string) => void
    onAddWine: () => void
    sortKey: SortKey
    sortDir: SortDir
    onSortChange: (key: SortKey, dir: SortDir) => void
}) {
    return (
        <header className="sticky top-0 z-10 border-b bg-white">
            {/* Top row: search (left) + Add Wine button */}
            <div className="flex items-center gap-3 p-4">
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

            {/* Bottom row: the sortable column header (click a column to sort). */}
            <ColumnHeader
                sortKey={sortKey}
                sortDir={sortDir}
                onSortChange={onSortChange}
            />
        </header>
    )
}