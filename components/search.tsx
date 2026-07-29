'use client'

export default function Search({value, onChange}: {value: string, onChange: (value: string) => void }) {
    return (
        <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="search-wines">Search Wines</label>
            <input
                id="search-wines"
                type="text"
                placeholder="Search Wines..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
    )
}