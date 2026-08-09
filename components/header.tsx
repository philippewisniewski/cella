'use client'

import Link from 'next/link'
import type { SortKey, SortDir } from '@/lib/types'
import Search from './search'
import ColumnHeader from './columnHeader'

export default function Header({
    searchValue,
    onSearchChange,
    sortKey,
    sortDir,
    onSortChange,
}: {
    searchValue: string
    onSearchChange: (value: string) => void
    sortKey: SortKey
    sortDir: SortDir
    onSortChange: (key: SortKey, dir: SortDir) => void
}) {
    return (
        <header className="sticky top-0 z-10 bg-canvas">
            {/* Top row: search (left) + Add Wine button */}
            <div className="flex items-center justify-between gap-4 p-4">
                <div className="w-[324px]">
                    <Search value={searchValue} onChange={onSearchChange} />
                </div>
                <Link
                    href="/add"
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-hover"
                >
                    + Add Wine
                </Link>
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