---
name: Framer Motion v12 bezier typing
description: How to type cubic-bezier ease arrays so framer-motion v12 TypeScript is satisfied inside Variants objects.
---

## The rule
Define a module-level typed constant and reference it by name. Never inline a literal array directly in a Variants object.

```ts
// At file scope (outside the component)
const BZ: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Inside Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: BZ } },
};
```

**Why:** framer-motion v12 types `ease` as `Easing | Easing[] | undefined`. TypeScript widens a literal `[0.22, 1, 0.36, 1]` to `number[]`, which is not assignable to `Easing`. A typed tuple `const` gives TypeScript the tuple type `[number, number, number, number]`, which satisfies `BezierDefinition`.

**How to apply:** Any file that defines `Variants` objects using cubic-bezier arrays. Inline JSX `transition={{ ease: [...] }}` props are fine — those get typed from JSX prop inference without needing the const.
