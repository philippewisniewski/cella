import { getWines } from '@/lib/wines'
import Dashboard from '@/components/dashboard'

export default async function Home() {
  // Server-side: fetch the seed once, before any HTML is sent. The client
  // Dashboard then hydrates from localStorage and owns all interactivity.
  const wines = await getWines()

  // Hand the plain data to the client Dashboard, which owns all interactivity.
  return <Dashboard wines={wines} />
}
