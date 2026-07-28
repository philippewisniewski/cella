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
        <aside>
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
        </aside>
    )
}
