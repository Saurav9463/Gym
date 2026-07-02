---
name: Kevin Fitness brand system
description: Design tokens and conventions for the Kevin Fitness gym website.
---

## Primary accent
- Color: `#e11d48` — defined as `--primary: 347 77% 50%` in CSS vars
- Foreground on primary: **white** (`--primary-foreground: 0 0% 100%`) — changed from original yellow/black combo
- All buttons, badges, and highlights on a red/primary background use `text-white`

## Typography
- Display: Bebas Neue (`font-display`)
- Body: Inter (`font-sans`)
- Mono: DM Mono (`font-mono`)

## Smooth scroll
- Lenis initialized in `artifacts/kevin-fitness/src/main.tsx`, RAF loop
- Exposed as `window.__lenis` for GSAP ScrollTrigger proxy if needed
- `scroll-behavior: smooth` removed from `html {}` to avoid conflict with Lenis

## Background depth system
- `bg-depth-0` through `bg-depth-4` in `src/index.css` — alternate between pure black and dark charcoal with subtle red radial glows
- Use these classes on sections to create visual variety without bright colors
