import { getWines, getStats } from '@/lib/wines'
import Dashboard from '@/components/dashboard'

export default async function Home() {
  // Server-side: fetch the (mock) data once, before any HTML is sent.
  const wines = await getWines()
  const stats = await getStats(wines)

  // Hand the plain data to the client Dashboard, which owns all interactivity.
  return <Dashboard wines={wines} stats={stats} />
}
