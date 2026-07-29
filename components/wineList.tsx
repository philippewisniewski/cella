'use client'

import type { Wine } from '@/lib/types'
import WineCard from './wineCard'

/**
 * WineList Component
 * 
 * A component that displays a list of wines as clickable cards.
 * It receives wine data and a selection handler from its parent component.
 */
export default function WineList({
    /**
     * wines: Array of Wine objects to display
     * 
     * This prop contains the complete list of wine data that will be rendered
     * as individual wine cards. Each wine object should include properties like
     * id, name, vintage, region, etc. as defined in the Wine type.
     */
    wines,
    /**
     * onSelect: Callback function for handling wine selection
     * 
     * This prop is a function that gets called when a user clicks on a wine card.
     * It receives the selected Wine object as an argument, allowing the parent
     * component to handle the selection logic (e.g., updating state, opening details,
     * or performing other actions based on the selected wine).
     */
    onSelect,
}: {
    wines: Wine[]
    onSelect: (wine: Wine) => void
}) {

    return (
        <div>
            {/* 
                Map over the wines array to create individual wine cards
                Each wine is rendered as a clickable container with its own WineCard component
            */}
            {wines.map((wine) => (
                <div
                    key={wine.id}  // React requires unique keys for list items
                    onClick={() => onSelect(wine)}  // Call the selection handler when clicked
                    className="cursor-pointer"  // Visual feedback that this is clickable
                >
                    {/* 
                        Render the individual WineCard component with the wine data
                        The WineCard component is responsible for displaying the wine's details
                    */}
                    <WineCard wine={wine} />
                </div>
            ))}
        </div>
    )
}