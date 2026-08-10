'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import WineForm from '@/components/wineForm'
import { loadWines, saveWines, getWineById } from '@/lib/wines'
import type { Wine } from '@/lib/types'

export default function EditWinePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  // The wine to edit, loaded after mount. We start null so the first client
  // render matches the server (where localStorage is unavailable), avoiding a
  // hydration mismatch; the effect below fills it in.
  const [wine, setWine] = useState<Wine | null>(null)

  useEffect(() => {
    // Prefer the user's saved cellar; fall back to the seed if not present.
    const saved = loadWines()
    const found = saved?.find((w) => w.id === id) ?? null
    if (found) {
      setWine(found)
    } else {
      getWineById(id).then(setWine)
    }
  }, [id])

  // Save → replace by id in the localStorage-backed cellar, then return home.
  const handleSave = (updated: Wine) => {
    const current = loadWines() ?? []
    saveWines(current.map((w) => (w.id === updated.id ? updated : w)))
    router.push('/')
  }

  if (wine === null) {
    // Not loaded yet (or not found) — render nothing until the effect resolves.
    return null
  }

  return (
    <main className="min-h-screen bg-canvas p-4">
      <WineForm wine={wine} onSave={handleSave} onCancel={() => router.push('/')} />
    </main>
  )
}
