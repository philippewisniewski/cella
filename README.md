# Cella — Personal Wine Cellar Management

**Cella** is a full-featured wine cellar manager built as a modern **Next.js** CRUD application. It lets you catalogue, search, sort and edit a personal collection of wines. Data points include grape variety and appellation to tasting notes, score and drinking windows.

> **Live demo:** [https://cella-delta.vercel.app](https://cella-delta.vercel.app)

---

## Why I built this project

Cella is a portfolio project built to showcase my front-end development skills and demonstrate practical **React** concepts within the **Next.js** App Router. Rather than a throwaway demo, I wanted to build a real, usable product with persistentence and a fully responsive wine management dashboard.

This project allow me explore state management, client-side persistence, dynamic routing and responsive layout design. It runs entirely in the browser with no backend, the wines area seeded with sample data and persisted to `localStorage`. The data layer is abstracted so a real API can drop in later without touching the UI.

---

## Key Concepts

### React hooks

The application leans on the built-in react hooks to keep the UI in sync with the data. **`useState`** drives the wine list, the currently selected wine, the search text, and the sort key/direction. While the add/edit form holds its own controlled `form` state, initialised from a blank template or an existing wine.

**`useMemo`** derives the list shown (`visibleWines`) by running the search → sort pipeline. Its dependency array only includes `wines`, `searchText`, `sortKey` and `sortDir`, it recomputes only when an input changes, and not on every render. **`useEffect`** handles two jobs — hydrating from `localStorage` on mount and persisting the cellar whenever it changes, with a `loaded` flag guarding the persist effect so the seed data can never overwrite a saved cellar on first paint. Finally, **`use()`** unwraps the async route `params` in the edit page, and **`useRouter`** drives navigation back to the dashboard after saving.

### Component architecture

The app follows a clear Server/Client split and a "lift state up" pattern. **`app/page.tsx`** is an `async` Server Component that fetches the seed once on the server and passes plain data down to the client `Dashboard`, which owns all interactivity. **`Dashboard`** is the single source of truth: it holds the wine list and UI state and passes data and handlers down to presentational children such as `Header`, `WineList` and `Aside`.

Components like `WineCard` (and its `Tablet`/`Responsive` variants), `WineDetail`, `WineForm`, `Search` and `ColumnHeader` are focused, reusable pieces with no business logic of their own. The slide-in detail flyout, **`Aside`**, is always mounted so it can animate, this keeps the *last* selected wine in local state (when rendered) so the content stays visible during the slide-out transition instead of vanishing instantly.

### Type safety with TypeScript

The app is written in **TypeScript**, with the domain modelled in `lib/types.ts`. A `Wine` interface describes shape; identity, classification, provenance, valuation and drinking window. While a `WineType` union restricts wine types to a fixed set (`red`, `white`, `rosé`, `sparkling`, `fortified`, `dessert`) rather than using `string`. Separate `SortKey` and `SortDir` unions type the sorting controls, so the column headers and sort logic can only ever pass valid values. These types flow through the data layer, components and form, catching mistakes at compile time.

### Client-side persistence with `localStorage`

All persistence is abstracted behind two small functions in `lib/wines.ts` (`loadWines` / `saveWines`), keyed under `cella.wines.v1`. Every access is guarded by `typeof window`, so the module is safe to import during server rendering where `localStorage` doesn't exist. On mount, `loadWines()` reads the saved cellar; if nothing is stored or the data is corrupt, which a `try/catch` handles by falling back to the seed data.

A `useEffect` then writes the whole cellar back to `localStorage` whenever it changes, but only after the initial load has completed, so real saved data is never clobbered by the seed. Because persistance is local, the cellar data lives in the user's browser rather than being shared across devices, and the data-access functions remain the single seam to swap for a real backend later.

### Styling with Tailwind CSS

Styling uses **Tailwind CSS v4** (via `@tailwindcss/postcss`) with a small custom design system. Colours and fonts are defined as tokens and consumed through utility classes, for example the colour-coded `TYPE_BADGE` and readiness badges. This keeps the palette consistent across every component. Outfit and Cinzel are loaded with `next/font` and exposed as CSS variables, then applied through Tailwind utilities for a distinctive display/body pairing.

Tailwind's `sm` and `lg` breakpoints drive the three layout tiers (stacked card → tablet → desktop table) via conditional rendering, so the same data reads well on any screen size. The detail flyout and backdrop use Tailwind transition utilities (`translate-x`, `opacity`) for a smooth slide-in/out without any animation library.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | `next/font` (Outfit, Cinzel) |
| Persistence | Browser `localStorage` |
| Deployment | Vercel |

---

## Getting started

Clone the repository and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit.

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint with ESLint
```

---

## Project structure

```
cella/
├── app/
│   ├── layout.tsx            # Root layout, fonts, metadata
│   ├── page.tsx              # Server Component: loads seed, renders Dashboard
│   ├── add/
│   │   └── page.tsx          # Add-wine route
│   └── edit/
│       └── [id]/
│           └── page.tsx      # Edit-wine route
├── components/
│   ├── dashboard.tsx         # Client Component: state, search, sort, persistence
│   ├── header.tsx            # Sticky search + sortable column header
│   ├── wineList.tsx          # Renders the responsive list of wine rows
│   ├── wineCard.tsx          # Desktop table row
│   ├── wineCardTablet.tsx    # Tablet layout
│   ├── wineCardResponsive.tsx# Mobile stacked card
│   ├── wineDetail.tsx        # Full wine profile content
│   ├── aside.tsx             # Slide-in detail flyout
│   ├── wineForm.tsx          # Add/edit form (controlled)
│   ├── search.tsx            # Search input
│   ├── columnHeader.tsx      # Sortable column headers
│   └── badges.ts             # Wine-type & readiness badge styles
└── lib/
    ├── types.ts              # Wine type definitions
    ├── seed.ts               # Sample cellar data
    └── wines.ts              # Data access + localStorage persistence + search/sort
```

---

## Data model

Each wine is described by a typed `Wine` interface covering identity, classification, provenance, valuation and drinking window, for example:

- `name`, `producer`, `type`, `grapeVariety[]`, `year`
- `country`, `region`, `appellation`, `address?`
- `quantity`, `price` (£), `score` (0–100), `readyToDrink`
- `description`, `tastingNotes`, `alcoholicStrength`, `bottleVolume`, `containsSulphites`

The data-access functions in `lib/wines.ts` (`getWines`, `getWineById`, `loadWines`, `saveWines`, `searchWines`, `sortWines`) are the single seam between the UI and the data source, swap their bodies for `fetch()` calls to connect a real backend without changing rewriting component logic.

---

## Deployment

The app is deployed on **Vercel** and updates automatically from the main branch. 