import type { Wine } from '@/lib/types'

export default function WineCard({ wine }: { wine: Wine }) {
    return (
        <div className="flex items-center gap-4 px-4 py-2 border-b hover:bg-black/5">
            <span className="flex-1 min-w-0 font-medium truncate">{wine.name}</span>
            <span className="w-40 truncate text-sm text-gray-500">{wine.producer}</span>
            <span className="w-20">{wine.type}</span>
            <span className="w-28">{wine.country}</span>
            <span className="w-16">{wine.year}</span>
            <span className="w-16">{wine.score}/100</span>
            <span className="w-16">{wine.readyToDrink ? 'Yes' : 'No'}</span>
            <span className="w-20">£{wine.price}</span>
            <span className="w-12">{wine.quantity}</span>
        </div>
    )
}