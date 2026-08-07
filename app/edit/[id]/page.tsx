'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import WineForm from '@/components/wineForm'
import { loadWines, saveWines, getWineById } from '@/lib/wines'
import type { Wine } from '@/lib/types'

export default function EditWinePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  // Synchronous lookup against the user's saved cellar (no effect needed).
  const saved = loadWines()
  const found = saved?.find((w) => w.id === id) ?? null

  // If not in the saved cellar, fall back to the seed (async) via state.
  const [seedWine, setSeedWine] = useState<Wine | null>(null)
  useEffect(() => {
    if (!found) {
      getWineById(id).then(setSeedWine)
    }
  }, [found, id])

  const wine = found ?? seedWine

  // Save → replace by id in the localStorage-backed cellar, then return home.
  const handleSave = (updated: Wine) => {
    const current = loadWines() ?? []
    saveWines(current.map((w) => (w.id === updated.id ? updated : w)))
    router.push('/')
  }

  if (wine === null) {
    // Wine not found (e.g. bad id) — send the user back to the list.
    router.push('/')
    return null
  }

  return (
    <main className="min-h-screen py-6">
      <WineForm wine={wine} onSave={handleSave} onCancel={() => router.push('/')} />
    </main>
  )
}
