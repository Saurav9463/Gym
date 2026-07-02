# Kevin Fitness

A premium gym management website for Kevin Fitness, Jalandhar — built for performance, designed to feel like a top-tier agency site (inspired by the Dribbble "Gym Website Concept" by Bato).

## Run & Operate

- `pnpm --filter @workspace/kevin-fitness run dev` — run the frontend (Vite, reads `PORT`)
- `pnpm --filter @workspace/api-server run dev` — run the API server
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

- **Primary accent:** `#FF5A1F` (vivid orange) — `hsl(18 100% 56%)` / `rgba(255,90,31,...)`
- **Background dark:** `#0d0a08` (warm near-black) and `#111113` (charcoal) — alternating sections
- **Typography:** Poppins 800 (display headings), Inter (body), DM Mono (mono)
  - Section headings: ALL CAPS, `letter-spacing: -0.02em`, `font-weight: 800`
  - Hero heading: mixed case, `textTransform: "none"` inline override
- **Border radius:** Cards `rounded-2xl` (16px), Buttons pill (`50px`) — NOT squared
- **Pill buttons:** `.pill-btn-primary` (orange) and `.pill-btn-ghost` (semi-transparent) CSS classes
- **Smooth scroll:** Lenis initialized in `src/main.tsx`

## Where things live

- `artifacts/kevin-fitness/src/pages/` — public pages (Home, Memberships, Trainers, Schedule, Gallery, Contact, Booking)
- `artifacts/kevin-fitness/src/pages/admin/` — admin dashboard (do not touch styling here)
- `artifacts/kevin-fitness/src/components/Navbar.tsx` — glassmorphism nav with orange pill CTA + scroll-progress bar
- `artifacts/kevin-fitness/src/components/Footer.tsx` — footer
- `artifacts/kevin-fitness/src/index.css` — global CSS vars, depth backgrounds, pill button classes, card styles
- `artifacts/kevin-fitness/src/lib/supabase.ts` — Supabase client
- `artifacts/kevin-fitness/public/hero1.png`, `hero2.png` — hero background images
- `attached_assets/trainer-*.png` — trainer photos (served via @assets alias)
- `attached_assets/image_178288775*.png` — gym interior photos (gym1–gym4 in code)
- `lib/db/src/schema/index.ts` — Drizzle schema (placeholder — needs table definitions)
- `artifacts/api-server/src/` — Express API routes

## Architecture decisions

- Frontend talks to Supabase directly (no API proxy for reads); booking inserts also via Supabase JS
- Admin dashboard (`/admin`) is client-side only — do NOT change its styling
- Lenis replaces native scroll-behavior — the CSS property was removed from `html {}`
- Bezier easing `[0.22, 1, 0.36, 1]` MUST be typed as `const BZ: [number, number, number, number]` at file scope — never inline inside Variants objects (framer-motion v12 type error)
- Featured pricing card always guaranteed: use `normalizedPlans` pattern (force index 1 if no `popular` flag set)

## Gotchas

- Poppins (not Bebas Neue) is the display font — letter-spacing should be `-0.02em` NOT `0.04em`
- All primary-color interactive elements use `text-white` (orange + white, not orange + black)
- Pill buttons use `.pill-btn-primary` / `.pill-btn-ghost` CSS classes, NOT Tailwind `rounded-full` alone
- `--radius: 10px` globally — override to `50px` for pill buttons, `16px` for cards

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
