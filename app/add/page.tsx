'use client'

import { useRouter } from 'next/navigation'
import WineForm from '@/components/wineForm'
import { loadWines, saveWines } from '@/lib/wines'
import type { Wine } from '@/lib/types'

export default function AddWinePage() {
  const router = useRouter()

  // Save → merge into the localStorage-backed cellar, then return home.
  const handleSave = (wine: Wine) => {
    const current = loadWines() ?? []
    saveWines([...current, wine])
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-canvas p-4">
      <WineForm wine={undefined} onSave={handleSave} onCancel={() => router.push('/')} />
    </main>
  )
}
