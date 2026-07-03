---
name: Kevin Fitness brand system
description: Typography, palette, button shape, and layout conventions for the Kevin Fitness gym site after the 2025 redesign.
---

## Fonts
- **Display:** `Bebas Neue` — single-weight condensed display face. Use `font-weight: 400` (only weight). Letter-spacing must be POSITIVE: `0.03em`–`0.06em`. Never use negative letter-spacing with Bebas Neue.
- **Body:** `Plus Jakarta Sans` (replaced Inter) — weights 300–800.
- **Mono:** `DM Mono`

## Color Palette (3-colour brand)
- **Primary:** `hsl(349 72% 44%)` → `#C91E39` — deep crimson (replaced the old orange `#FF5A1F`)
- **Secondary:** `hsl(215 18% 38%)` → `#536478` — steel-slate (used sparingly)
- **Background:** `#0c0d12` (cool near-black) alternating with `#090a0f` (deeper)
- All primary-color interactive elements use `color: #fff` (crimson + white, never crimson + black)

## Button System
- **Primary:** `.kf-btn-primary` — parallelogram via `clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)`, `background: hsl(var(--primary))`, sharp corners, Bebas Neue, `letter-spacing: 0.14em`
- **Ghost:** `.kf-btn-ghost` — same clip-path, transparent with white border
- **Small:** `.kf-btn-sm` / `.kf-btn-sm-ghost` — 8px offset version
- Legacy `.pill-btn-primary` / `.pill-btn-ghost` kept as rectangular aliases (used in admin/booking pages that weren't redesigned)
- NOT pills, NOT `rounded-full` — brand is sharp-corner / parallelogram throughout

## Layout Conventions
- **Border radius:** `0` or `2px` everywhere (sharp corners)
- **Grid dividers:** Container carries `border-left` + `border-top`; each cell carries `border-right` + `border-bottom` — produces clean responsive grid at any column count
- **Section eyebrows:** `font-mono text-[11px] uppercase tracking-[0.25em] text-white/30` — NOT `text-primary`
- **Why-Choose-Us:** Numbered always-visible 6-cell grid (01–06), no accordion

## Images
- AI-generated images in `artifacts/kevin-fitness/public/ai/`: hero.jpg, about.jpg, svc-personal-training.jpg, svc-fitness-classes.jpg, svc-strength.jpg, svc-cardio.jpg, svc-yoga.jpg, svc-hiit.jpg
- Real gym photos (`attached_assets/image_178288775*.png`) used ONLY in Gallery page and as `AiImg` fallbacks
- `AiImg` component in Home.tsx handles fallback with guard against infinite error loops

**Why:** Old orange-on-black with Poppins and pill buttons read as a generic AI page-builder template. The redesign targets a bespoke, editorial, athletic brand identity.
