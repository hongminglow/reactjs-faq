# Frontend Interview FAQ

A small, dark-first React app that showcases commonly asked frontend interview questions across React, JavaScript, browser rendering, CSS/layout, performance, and web fundamentals in a clean FAQ accordion format.

## What you get

- Grouped sections (JavaScript runtime, JavaScript language, React core, CSS/layout, browser platform, performance, TypeScript)
- Click-to-expand accordion answers (accessible: `aria-expanded`, `aria-controls`)
- Fast search across questions + answers + tags
- Theme toggle (dark by default, light supported) with `localStorage` persistence

## Example categories

- `JavaScript Language Deep Dive`: closures, hoisting, prototypes, coercion, and DOM events
- `React Core Concepts`: rendering, reconciliation, keys, state, and effects
- `CSS, Layout & UI Engineering`: Flexbox vs Grid, stacking context, layout shift, and responsive strategy

## Run locally

```bash
npm install
npm run dev
```

## Build / lint

```bash
npm run build
npm run lint
```

## Customize questions

Edit the data in [src/faqData.ts](src/faqData.ts).
