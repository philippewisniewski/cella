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
        <header className="sticky top-0 z-10 border-b border-border bg-canvas">
            {/* Top row: search (left) + Add Wine button */}
            <div className="flex items-center justify-between gap-4 p-4">
                <div className="flex-1 min-w-0">
                    <Search value={searchValue} onChange={onSearchChange} />
                </div>
                <Link
                    href="/add"
                    className="bg-primary px-4 py-[7px] text-sm text-white hover:bg-primary-hover active:bg-primary-active"
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