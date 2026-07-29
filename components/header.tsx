'use client'

import Search from './search'

export default function Header({
    searchValue,
    onSearchChange,
}: {
    searchValue: string
    onSearchChange: (value: string) => void
}) {
    return (
        <header className="flex items-center justify-between gap-4 border-b p-4">
            <h1 className="text-2xl font-semibold">Cella Wine Dashboard</h1>
            <div className="w-64">
                <Search value={searchValue} onChange={onSearchChange} />
            </div>
        </header>
    )
}