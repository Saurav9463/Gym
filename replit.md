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

- **Primary accent:** `#C91E39` (deep crimson) — `hsl(349 72% 44%)`
- **Secondary:** `hsl(215 18% 38%)` (steel-slate) — used sparingly
- **Background dark:** `#0c0d12` (cool near-black) and `#090a0f` (deeper) — alternating sections
- **Typography:** Bebas Neue (display headings, weight 400 — it's a single-weight display face), Plus Jakarta Sans (body, weights 300–800), DM Mono (mono)
  - Section headings: ALL CAPS, `letter-spacing: 0.04em` (positive — Bebas Neue is condensed)
  - `fontWeight: 400` on Bebas Neue headings (not 800 — Bebas has only one weight)
  - DO NOT use `letterSpacing: "-0.02em"` with Bebas Neue — use `0.03em` to `0.06em`
- **Brand buttons:** `.kf-btn-primary` and `.kf-btn-ghost` — parallelogram shape via `clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)`
  - Small variants: `.kf-btn-sm` and `.kf-btn-sm-ghost`
  - Legacy `.pill-btn-primary` / `.pill-btn-ghost` kept as aliases (admin-safe, now rectangular)
- **Border radius:** Cards / buttons use `border-radius: 0` or `2px` (sharp corners) — NOT rounded
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
- AI-generated images live in `artifacts/kevin-fitness/public/ai/` and are served at `/ai/*.jpg`. Each has a fallback via the `AiImg` component to real gym photos in `attached_assets/`
- Gallery strip in Home.tsx uses real gym photos intentionally — authentic "our space" context
- Why-Choose-Us grid uses container-carries-left+top / cell-carries-right+bottom border pattern for clean responsive grid lines

## Gotchas

- **Bebas Neue** is the display font (replaced Poppins). It is a SINGLE-WEIGHT condensed face — `font-weight: 400` only; setting 800 has no effect
- Bebas Neue letter-spacing must be POSITIVE (`0.03em`–`0.06em`) — negative values look cramped
- Brand buttons use `.kf-btn-primary` / `.kf-btn-ghost` (parallelogram clip-path), NOT the old pill pattern
- All primary-color interactive elements use `text-white` (crimson + white)
- `--radius: 0px` globally — brand uses sharp corners throughout
- Google review count (154) in Testimonials is a hardcoded placeholder — replace with live Google Places embed before client handoff

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
