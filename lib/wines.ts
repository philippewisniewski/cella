import type { Wine, WineStats, WineType, SortKey, SortDir } from "./types";
import { SEED } from "./seed";

// ---------------------------------------------------------------------------
// DATA ACCESS
// The seed cellar lives in ./seed. These are the only functions the rest of the
// app uses to read wine data, so a future backend swap only touches this file.
// ---------------------------------------------------------------------------

// Async on purpose so a network fetch can drop in later without changing callers.
export async function getWines(): Promise<Wine[]> {
  return SEED;
}

// Looks up a single wine by id, or null if it doesn't exist.
export async function getWineById(id: string): Promise<Wine | null> {
  return SEED.find((w) => w.id === id) ?? null;
}

// ---------------------------------------------------------------------------
// PERSISTENCE (localStorage)
// The seed is the fallback shown on first load / on the server. In the browser
// we load/save the user's actual cellar here. Guarded by `typeof window` so
// this module is safe to import during SSR, where localStorage doesn't exist.
// ---------------------------------------------------------------------------
const STORAGE_KEY = "cella.wines.v1";

// Read the saved cellar. Returns null if nothing is stored yet, or if we're on
// the server (no localStorage). The caller decides what to do with null.
export function loadWines(): Wine[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Wine[]) : null;
  } catch {
    // Unreadable/corrupt data — fall back to the seed rather than crashing.
    return null;
  }
}

// Write the whole cellar. A no-op on the server.
export function saveWines(wines: Wine[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wines));
}

// ---------------------------------------------------------------------------
// STATS — pure & synchronous so the server seam (`getStats`) and the client
// dashboard's useMemo always agree. cellarValue = Σ price × quantity (£).
// ---------------------------------------------------------------------------
export function computeStats(wines: Wine[]): WineStats {
  const totalBottles = wines.reduce((sum, w) => sum + w.quantity, 0);
  // Sets count unique countries/regions (eliminates duplicates).
  const totalCountries = new Set(wines.map((w) => w.country)).size;
  const totalRegions = new Set(wines.map((w) => w.region)).size;
  const cellarValue = wines.reduce((sum, w) => sum + w.price * w.quantity, 0);
  const readyToDrink = wines.filter((w) => w.readyToDrink).length;
  return {
    totalBottles,
    totalCountries,
    totalRegions,
    cellarValue,
    readyToDrink,
  };
}

// Async wrapper kept for the server-side data seam (future DB/WordPress swap).
export async function getStats(wines: Wine[] = SEED): Promise<WineStats> {
  return computeStats(wines);
}

// ---------------------------------------------------------------------------
// SEARCH — free-text across name, producer, region, appellation, country,
// grape variety, type, year and price. Numerics are coerced to strings so
// "2015" or "850" match. Empty query returns the list unchanged.
// ---------------------------------------------------------------------------
export function searchWines(wines: Wine[], query: string): Wine[] {
  const q = query.trim().toLowerCase();
  if (!q) return wines;
  return wines.filter((w) =>
    [
      w.name,
      w.producer,
      w.region,
      w.appellation,
      w.country,
      w.type,
      String(w.year),
      String(w.price),
      ...w.grapeVariety,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

// ---------------------------------------------------------------------------
// SORT — returns a NEW array (does not mutate the input).
// ---------------------------------------------------------------------------

// Canonical type order a cellar owner expects (not alphabetical):
// still/light → still/rich → rosé → sparkling → sweet → fortified.
const TYPE_ORDER: Record<WineType, number> = {
  white: 0,
  red: 1,
  rosé: 2,
  sparkling: 3,
  dessert: 4,
  fortified: 5,
};

// `key` picks the field; `dir` defaults to "desc". Strings use localeCompare;
// numbers subtract; the boolean `readyToDrink` coerces to 0/1; `type` uses
// TYPE_ORDER so categories sort meaningfully rather than alphabetically.
export function sortWines(
  wines: Wine[],
  key: SortKey,
  dir: SortDir = "desc",
): Wine[] {
  const factor = dir === "asc" ? 1 : -1;
  return [...wines].sort((a, b) => {
    if (key === "type") {
      return factor * (TYPE_ORDER[a.type] - TYPE_ORDER[b.type]);
    }
    if (typeof a[key] === "string" && typeof b[key] === "string") {
      return factor * (a[key] as string).localeCompare(b[key] as string);
    }
    if (typeof a[key] === "boolean" && typeof b[key] === "boolean") {
      return factor * ((a[key] ? 1 : 0) - (b[key] ? 1 : 0));
    }
    return factor * ((a[key] as number) - (b[key] as number));
  });
}