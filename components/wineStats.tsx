import type { WineStats } from "@/lib/types";

export default function WineStats({ stats }: {stats: WineStats}) {
    return (
        <div>
            <h2>Wine Cellar Stats</h2>
            <ul>
                <li>Total Bottles: {stats.totalBottles}</li>
                <li>Total Countries: {stats.totalCountries}</li>
                <li>Total Regions: {stats.totalRegions}</li>
                <li>Ready to drink: {stats.readyToDrink}</li>
                <li>Total Cellar Value: £{stats.cellarValue}</li>
            </ul>
        </div>
    )
}