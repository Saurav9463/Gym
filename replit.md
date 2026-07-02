# Kevin Fitness

A premium gym management website for Kevin Fitness, Jalandhar — built for performance, designed to feel like a ₹20L+ agency site.

## Run & Operate

- `pnpm --filter @workspace/kevin-fitness run dev` — run the frontend (Vite, reads `PORT`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (for the backend)

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS v4, Framer Motion v12, Lenis (smooth scroll), GSAP
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- Data: Supabase (frontend direct calls for memberships, trainers, gallery, bookings)
- Build: esbuild (CJS bundle for API server)

## Design System

- **Primary accent:** `#e11d48` (red) — `hsl(347 77% 50%)`
- **Background:** near-black `#0a0a0a` with depth layers (`bg-depth-0` through `bg-depth-4`)
- **Typography:** Bebas Neue (display), Inter (body), DM Mono (mono)
- **Smooth scroll:** Lenis initialized in `src/main.tsx`
- **Animations:** Framer Motion (scroll-triggered sections) + GSAP (installed, ready for advanced timelines)

## Where things live

- `artifacts/kevin-fitness/src/pages/` — public pages (Home, Memberships, Trainers, Schedule, Gallery, Contact, Booking)
- `artifacts/kevin-fitness/src/pages/admin/` — admin dashboard
- `artifacts/kevin-fitness/src/components/Navbar.tsx` — glassmorphism nav with scroll-progress bar
- `artifacts/kevin-fitness/src/components/Footer.tsx` — footer
- `artifacts/kevin-fitness/src/index.css` — global CSS vars, depth backgrounds, custom utilities
- `artifacts/kevin-fitness/src/lib/supabase.ts` — Supabase client
- `lib/db/src/schema/index.ts` — Drizzle schema (placeholder — needs table definitions)
- `artifacts/api-server/src/` — Express API routes

## Architecture decisions

- Frontend talks to Supabase directly (no API proxy for reads); booking inserts also go via Supabase JS
- Admin dashboard (`/admin`) is client-side only, protected by a simple session check
- Lenis smooth scroll is initialized globally in `main.tsx` and exposed as `window.__lenis` for GSAP ScrollTrigger integration
- Bezier easing `[0.22, 1, 0.36, 1]` is typed as `const BZ: [number, number, number, number]` at file scope to satisfy framer-motion v12 types — do not inline the literal in Variants objects

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- framer-motion v12 requires cubic-bezier ease to be typed as `[number,number,number,number]` tuple — use the `BZ` constant pattern, not inline arrays in Variants objects
- Lenis replaces native `scroll-behavior: smooth` — the CSS property was removed from `html {}` to avoid conflicts
- All primary-color buttons use `text-white` (not `text-black`) — the primary changed from yellow to red

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
