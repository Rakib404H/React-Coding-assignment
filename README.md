# Product Explorer Dashboard

Frontend engineer take-home for JustGo. Built with React + TypeScript, Vite, React Router, React Query, Zustand, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

## Notes on architecture

- Server state lives in React Query; UI state (search, sort, category, pagination) lives in Zustand and is mirrored into the URL.
- The `/products/search` route is fully deep-linkable: query, filters, sort, and page are encoded in the URL.
- Infinite scrolling loads 20 items at a time and updates the `page` URL param so you can revisit the same scroll depth.

## README questions

1. What trade-offs did you consciously make due to time constraints?
   - Currency conversion uses fixed, hard-coded rates instead of a live FX service.
   - When both search query and category are selected, category filtering is applied client-side to the search results.
   - I focused on a clean UX and clear state boundaries instead of implementing additional features like caching persistence.

2. If this app needed to scale (more data, more features), what would you refactor first?
   - Add normalized caching or a server-driven search endpoint that supports combined filters to reduce client-side filtering.
   - Introduce route-based data loaders or prefetching to improve perceived speed on deep links.
   - Extract shared UI primitives (table, filters, cards) into a dedicated design system layer.

3. Did you use AI tools? If yes, which parts and how did you verify correctness?
   - I used AI assistance for planning and scaffolding. I verified correctness by cross-checking API endpoints with the DummyJSON documentation and by reasoning through URL state syncing, pagination, and UI flows.

## Assumptions

- DummyJSON API is available and returns the documented schema.
- Prices are displayed in selected currency using fixed conversion rates for demonstration.
