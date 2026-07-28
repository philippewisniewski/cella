import type { Wine } from '@/lib/types'

export default function WineCard({ wine }: { wine: Wine }) {
    return (
        <div>
            <ul>
                <li><h3>{wine.name}</h3></li>
                <li>{wine.producer}</li>
                <li>{wine.country}</li>
            </ul>
            <ul>
                <li>{wine.type}</li>
                <li>{wine.region}</li>
                <li>{wine.year}</li>
                <li>{wine.readyToDrink ? 'Yes' : 'No'}</li>
            </ul>
            <p>{wine.description}</p>
            <ul>
                <li>{wine.appellation}</li>
                <li>{wine.score}</li>
                <li>{wine.price}</li>
                <li>{wine.quantity}</li>
            </ul>
        </div>
    )
}