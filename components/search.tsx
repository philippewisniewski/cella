'use client'

export default function Search({value, onChange}: {value: string, onChange: (value: string) => void }) {
    return (
        <div className="relative flex items-center">
            <label className="sr-only" htmlFor="search-wines">Search Wines</label>
            {/* Search icon — inherits the muted ink color to match the design
                system; sits inside the input's left padding. */}
            <svg
                className="pointer-events-none absolute left-4 h-4 w-4 text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
                id="search-wines"
                type="text"
                placeholder="Search Wines..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-input py-[7px] pl-10 pr-4 text-sm text-muted placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
        </div>
    )
}