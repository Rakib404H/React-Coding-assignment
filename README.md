# Product Explorer Dashboard

A polished React + TypeScript product explorer built as a practice frontend take‑home. It features deep‑linkable search, infinite scrolling, category filtering, currency preferences, and a responsive, table‑driven UI.

## Context

- This assignment was given to a friend of mine; I completed this as a **practice exercise**.
- I used AI assistance to complete this project.

## Highlights

- Deep‑linkable search, filters, sort, and pagination via URL
- Infinite scroll (20 items per load)
- Table‑based product list (no 3rd‑party table library)
- Global currency preference using React Context
- Error Boundary + skeleton loading states
- Responsive layout (desktop + mobile)

## Tech Stack

- React + TypeScript
- Vite
- React Router
- React Query (server state)
- Zustand (UI state)
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

### Build & Preview

```bash
npm run build
npm run preview
```

## Routes

- `/products` — Product list
- `/products/:id` — Product detail
- `/products/categories` — Category grid
- `/products/search?q=` — Search results (shareable)
- `/settings` — Currency settings

## URL Parameters

The URL is the source of truth for search, filter, sort, and pagination state.

Example:

```
/products/search?q=phone&category=smartphones&sort=price_desc&page=3
```

## Data Source

All product data comes from the public API: https://dummyjson.com/

## Requirements Coverage

- Product list page ✅
- Product detail page ✅
- Search by title ✅
- Sort by unit price ✅
- Filter by category ✅
- URL‑based deep linking ✅
- Infinite scroll (20 items) ✅
- Table rendering ✅
- Skeleton loaders ✅
- Currency settings via Context ✅
- Error Boundary ✅
- Responsive layout ✅

## README Questions

1) What trade‑offs did you consciously make due to time constraints?
- Currency conversion uses fixed rates instead of live FX data.
- Category + search combination is filtered client‑side due to API limitations.
- I focused on UX polish and clean state boundaries over test coverage.

2) If this app needed to scale (more data, more features), what would you refactor first?
- Move search + filters to a backend query layer to avoid client‑side filtering.
- Add prefetching and caching strategies for common navigation flows.
- Extract UI primitives into a reusable design system.

3) Did you use AI tools? If yes, which parts and how did you verify correctness?
- Yes. I used AI assistance for scaffolding, UI refinement, and debugging. I verified correctness by validating API behavior, ensuring URL state sync, and manually testing all key flows.

## Assumptions

- DummyJSON API is available and returns the documented schema.
- Currency conversion rates are illustrative, not real‑time.

## Deployment Notes

- Vercel: uses `vercel.json` for SPA rewrites
- Netlify: uses `public/_redirects` for SPA routing

---

Repository: https://github.com/Rakib404H/React-Coding-assignment
