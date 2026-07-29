'use client'

import { useMemo, useState } from 'react'
import type { Wine, WineStats, WineFilters, SortKey, SortDir } from '@/lib/types'
import { searchWines, filterWines, sortWines } from '@/lib/wines'
import Header from './header'
import WineList from './wineList'
import WineForm from './wineForm'
import Aside from './aside'

type DashboardProps = {
  wines: Wine[]
  stats: WineStats
}

export default function Dashboard({ wines: initialWines, stats }: DashboardProps) {
  // === BLOCK 2: STATE ===
  // Local copy of the wine list so the UI can add / edit / delete wines.
  // We copy `initialWines` because props must never be mutated directly.
  const [wines, setWines] = useState<Wine[]>(initialWines)

  // The wine shown in the aside. `null` means "show the stats panel instead".
  const [selected, setSelected] = useState<Wine | null>(null)

  // What the main area displays: the list, the add form, or the edit form.
  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list')

  // The wine currently being edited. `undefined` means "adding a new wine".
  const [editingWine, setEditingWine] = useState<Wine | undefined>(undefined)
  
  // === BLOCK 3: DERIVED LIST ===
  // Raw control values for the search bar, filter dropdowns and sort.
  const [searchText, setSearchText] = useState('')
  const [filters, setFilters] = useState<WineFilters>({})
  const [sortKey, setSortKey] = useState<SortKey>('score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  // The list actually shown: start from all wines, then search → filter → sort.
  // `useMemo` means this only recomputes when one of the inputs changes,
  // not on every single render.
  const visibleWines = useMemo(() => {
    const searched = searchWines(wines, searchText)
    const filtered = filterWines(searched, filters)
    return sortWines(filtered, sortKey, sortDir)
  }, [wines, searchText, filters, sortKey, sortDir])
  
  // === BLOCK 4: HANDLERS ===
 // Click a card in the list → show that wine in the aside.
  const handleSelect = (wine: Wine) => setSelected(wine)

  // "+ Add Wine" button → open the form in add mode (no wine to edit).
  const handleAddNew = () => {
    setEditingWine(undefined)
    setMode('add')
  }

  // "Edit Wine" in the detail view → open the form prefilled with the
  // selected wine. (WineDetail's onEdit gives us no argument, so we read
  // `selected` from state.)
  const handleEdit = () => {
    if (selected) {
      setEditingWine(selected)
      setMode('edit')
    }
  }

  // Cancel the form → go back to the list.
  const handleCancel = () => {
    setMode('list')
    setEditingWine(undefined)
  }

  // "Back to dashboard" on the detail view → clear the aside selection
  // (so the stats panel shows again).
  const handleClose = () => setSelected(null)

  // Save from the form → add a new wine or replace an existing one by id,
  // then return to the list and show the saved wine in the aside.
  const handleSave = (wine: Wine) => {
    setWines((prev) => {
      const exists = prev.some((w) => w.id === wine.id)
      return exists
        ? prev.map((w) => (w.id === wine.id ? wine : w))
        : [...prev, wine]
    })
    setEditingWine(undefined)
    setMode('list')
    setSelected(wine)
  }

  // "Drink (-1)" → reduce quantity by one; if it was the last bottle,
  // remove the wine from the cellar entirely.
  const handleDrink = (id: string) => {
    setWines((prev) =>
      prev.flatMap((w) => {
        if (w.id !== id) return [w]
        if (w.quantity <= 1) return [] // last bottle → drop the wine
        return [{ ...w, quantity: w.quantity - 1 }]
      }),
    )
    setSelected((curr) => {
      if (!curr || curr.id !== id) return curr
      if (curr.quantity <= 1) return null
      return { ...curr, quantity: curr.quantity - 1 }
    })
  }

  // "Delete" → remove the wine and clear the aside if it was selected.
  const handleDelete = (id: string) => {
    setWines((prev) => prev.filter((w) => w.id !== id))
    setSelected((curr) => (curr?.id === id ? null : curr))
  }
  
  // === BLOCK 5: RENDER ===
  return (
    <div className="flex flex-col">
      <Header
        wines={wines}
        searchValue={searchText}
        onSearchChange={setSearchText}
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Row below the header: main area + aside */}
      <div className="flex gap-6 p-6">
        {/* MAIN AREA: list OR form, decided by `mode` */}
        <main className="flex-1">
          {mode === 'list' ? (
            <WineList wines={visibleWines} onSelect={handleSelect} />
          ) : (
            <WineForm wine={editingWine} onSave={handleSave} onCancel={handleCancel} />
          )}
        </main>

        {/* ASIDE: always on the side; shows detail or stats */}
        <Aside
          selected={selected}
          stats={stats}
          onClose={handleClose}
          onEdit={handleEdit}
          onDrink={handleDrink}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}