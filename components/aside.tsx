'use client'

import { useState } from 'react'
import type { Wine } from '@/lib/types'
import WineDetail from './wineDetail'

/**
 * Aside — now a slide-in detail flyout.
 *
 * It is always mounted so it can animate. When `selected` is set the panel
 * slides in from the right over a dimming backdrop; clicking the backdrop (or
 * the Close button) calls `onClose`. We keep the *last* selected wine in local
 * state so its content stays visible during the slide-out transition instead of
 * vanishing the instant `selected` becomes null.
 */
export default function Aside({
    selected,
    onClose,
    onDelete,
}: {
    selected: Wine | null
    onClose?: () => void
    onDelete?: (id: string) => void
}) {
    const [shown, setShown] = useState<Wine | null>(selected)
    const open = selected !== null

    // Keep the last selected wine so its content stays visible during the
    // slide-out transition. Update during render (not in an effect) when a new
    // wine is selected — the recommended pattern for deriving state from props.
    if (selected && selected !== shown) {
        setShown(selected)
    }

    return (
        <>
            {/* Dimming backdrop — click to close. Disabled (no pointer events)
                when closed so it doesn't block the list underneath. */}
            <div
                onClick={onClose}
                aria-hidden={!open}
                className={`fixed inset-0 z-40 bg-ink/30 transition-opacity duration-300 ${
                    open ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
            />

            {/* The sliding panel. */}
            <aside
                className={`fixed top-0 right-0 z-50 h-screen w-96 max-w-[90vw] overflow-y-auto border-l border-border bg-canvas shadow-xl transition-transform duration-300 ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {shown && (
                    <WineDetail
                        wine={shown}
                        onClose={onClose}
                        onDelete={onDelete}
                    />
                )}
            </aside>
        </>
    )
}
