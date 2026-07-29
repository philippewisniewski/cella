import type { Wine, WineStats } from '@/lib/types'
import WineStatsPanel from './wineStats'
import WineDetail from './wineDetail'

export default function Aside({
    selected,
    stats,
    onClose,
    onEdit,
    onDrink,
    onDelete,
}: {
    selected: Wine | null
    stats: WineStats
    onClose?: () => void
    onEdit?: () => void
    onDrink?: (id: string) => void
    onDelete?: (id: string) => void
}) {
    return (
        <aside className="w-80 h-screen sticky top-0 flex flex-col border-l p-4">
            {/* Content slot: scrolls internally if the detail view is tall,
                so the logo below always stays visible. */}
            <div className="flex-1 overflow-y-auto">
                {selected ? (
                    <WineDetail
                        wine={selected}
                        onClose={onClose}
                        onEdit={onEdit}
                        onDrink={onDrink}
                        onDelete={onDelete}
                    />
                ) : (
                    <WineStatsPanel stats={stats} />
                )}
            </div>

            {/* Logo pinned at the bottom of the rail. */}
            <h1 className="mt-4 text-xl font-semibold">Cella Wine Dashboard</h1>
        </aside>
    )
}
