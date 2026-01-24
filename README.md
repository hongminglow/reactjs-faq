# React + JavaScript Interview FAQ

A small, dark-first React app that showcases commonly asked React/JavaScript interview questions in a clean FAQ accordion format.

## What you get

- Grouped sections (runtime/concurrency, memory/GC, React core, performance)
- Click-to-expand accordion answers (accessible: `aria-expanded`, `aria-controls`)
- Fast search across questions + answers + tags
- Theme toggle (dark by default, light supported) with `localStorage` persistence

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
