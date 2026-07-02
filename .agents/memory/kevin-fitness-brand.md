---
name: Kevin Fitness brand system
description: Design tokens, font, and conventions for the Kevin Fitness gym website.
---

## Primary accent
- Color: `#FF5A1F` (vivid orange) — defined as `--primary: 18 100% 56%` in CSS vars
- Foreground on primary: **white** (`--primary-foreground: 0 0% 100%`)
- All primary-bg elements use `text-white`
- rgba equivalent for shadows/glows: `rgba(255,90,31,...)`

## Typography
- Display/Headings: **Poppins** 800 (`--font-display: 'Poppins', sans-serif`)
  - Previously Bebas Neue — changed to Poppins to match Dribbble reference
  - Headings use `font-weight: 800`, `letter-spacing: -0.02em`
  - Most section headings are ALL CAPS; hero heading is mixed-case with inline style `textTransform: "none"`
- Body: Inter (`font-sans`)
- Mono: DM Mono (`font-mono`)

## Bezier easing
- Always use `const BZ: [number, number, number, number] = [0.22, 1, 0.36, 1];` at file scope
- Never inline `[0.22, 1, 0.36, 1]` inside Variants objects (framer-motion v12 type error)

## Border radius (NOT squared anymore)
- Cards: `rounded-2xl` (16px) — `--radius-lg: 14px`, `--radius-xl: 18px`
- Buttons pill: `rounded-full` (50px) — use `.pill-btn-primary` / `.pill-btn-ghost` CSS classes
- `--radius: 10px` (default)

## Button styles
- Primary: `.pill-btn-primary` — orange bg, `border-radius: 50px`, white text, drop shadow on hover
- Ghost: `.pill-btn-ghost` — semi-transparent bg, white border `border-radius: 50px`, backdrop-blur

## Section backgrounds (alternating)
- Dark warm: `#0d0a08` (slightly brown-tinted near-black)
- Dark charcoal: `#111113`

## Smooth scroll
- Lenis initialized in `artifacts/kevin-fitness/src/main.tsx`, RAF loop
- Exposed as `window.__lenis` for GSAP ScrollTrigger proxy if needed
- `scroll-behavior: smooth` removed from `html {}` to avoid conflict with Lenis

## Navbar
- Logo: `⚡ KEVINFITNESS` — lightning bolt emoji + bold white/orange text
- Nav links: natural-case text (not tracked uppercase) in white/65, `text-primary` when active
- CTA: orange pill "Join Now" button (`rounded-full`, `bg-primary`)
- Glassmorphism on scroll: `bg-[#0d0a08]/90 backdrop-blur-2xl`
- Scroll progress bar at top: 2px red line

## Home page sections (in order)
1. Hero: dark bg + trainer photo right, text left, pill CTAs, trust row (avatar cluster + stars), service chips
2. About + Stats: orange label, big heading, 4 counters, gym photo with play button
3. Services: horizontal Embla carousel with photo cards, arrow buttons (prev left outline, next right orange)
4. Why Choose Us: image left, accordion right (AccordionItem component with aria-expanded)
5. Pricing Preview: 3-column cards, guaranteed featured center (normalizedPlans logic)
6. Testimonials: Embla carousel with auto-advance
7. Gallery strip: 4-column grid
8. CTA section + sticky mobile CTA

## Pricing card "featured" logic
- Always guarantee exactly one featured card: prefer `plan.popular`, else force `i === 1` (center)
- Pattern: `const normalizedPlans = displayPlans.slice(0,3).map((p,i,arr) => ({ ...p, _featured: p.popular || (!arr.some(x => x.popular) && i === 1) }))`
- Use `plan._featured` not `plan.popular` to determine orange card styling
