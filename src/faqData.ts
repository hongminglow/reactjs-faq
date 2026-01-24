export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  tags: string[];
};

export type FaqSection = {
  id: string;
  title: string;
  description: string;
  items: FaqItem[];
};

export const faqSections: FaqSection[] = [
  {
    id: "js-runtime",
    title: "JavaScript Runtime & Concurrency",
    description:
      "How JS schedules work: the call stack, event loop, tasks, and async boundaries.",
    items: [
      {
        id: "event-loop",
        question: "Explain the JavaScript event loop (and why it matters).",
        answer:
          "JavaScript runs your code on a single call stack. When the stack is empty, the event loop pulls queued callbacks to run next. Macrotasks (e.g. setTimeout, I/O) and microtasks (e.g. Promise callbacks) are scheduled differently; microtasks run to completion before the next macrotask. This affects ordering, UI responsiveness, and how you avoid long blocking work.",
        tags: ["event loop", "microtask", "macrotask", "async"],
      },
      {
        id: "microtask-vs-macrotask",
        question: "What is the difference between microtasks and macrotasks?",
        answer:
          "Macrotasks represent “next turns” of the loop (timers, message events, etc.). Microtasks are high-priority jobs (Promise.then/catch/finally, queueMicrotask) that run immediately after the current stack finishes, before the browser paints and before the next macrotask. Too many microtasks can starve rendering.",
        tags: ["microtask", "macrotask", "promises"],
      },
      {
        id: "async-await",
        question: "How does async/await work under the hood?",
        answer:
          "async/await is syntax over Promises. An async function always returns a Promise. When execution hits await, the function pauses and schedules the continuation as a microtask once the awaited Promise settles. That means awaiting yields back to the event loop and lets other work happen.",
        tags: ["async", "await", "promise"],
      },
      {
        id: "web-workers",
        question:
          "How do Web Workers help with “thread optimization” in web apps?",
        answer:
          "The UI thread is where rendering and most JS runs. Heavy CPU work (parsing, image processing, large computations) can block it and cause jank. Web Workers run JS in a separate thread and communicate via message passing (structured clone / transferable objects). This keeps the main thread responsive.",
        tags: ["performance", "workers", "main thread"],
      },
    ],
  },
  {
    id: "memory",
    title: "Memory, GC & Leaks",
    description:
      "Practical memory concepts: garbage collection, leaks, and how to reason about references.",
    items: [
      {
        id: "gc",
        question: "What is garbage collection in JavaScript?",
        answer:
          "Garbage collection (GC) automatically frees memory that is no longer reachable from “roots” (like global objects, active stack frames, and closures still referenced). Modern engines use tracing collectors (mark-and-sweep variants) and generational strategies to optimize short-lived allocations.",
        tags: ["garbage collection", "memory"],
      },
      {
        id: "memory-leaks",
        question: "Common causes of memory leaks in JS/React apps?",
        answer:
          "Typical leaks come from retaining references longer than needed: event listeners never removed, intervals/timeouts not cleared, caches that grow unbounded, large objects captured by closures, and detached DOM nodes still referenced. In React, forgetting cleanup in effects is a common culprit.",
        tags: ["memory leak", "cleanup", "useEffect"],
      },
      {
        id: "weakmap",
        question: "When would you use WeakMap/WeakSet?",
        answer:
          "WeakMap/WeakSet allow keys to be garbage-collected if there are no other strong references. They’re useful for associating metadata with objects (like caches) without preventing GC. You can’t iterate them reliably because entries can disappear at any time.",
        tags: ["weakmap", "cache", "gc"],
      },
    ],
  },
  {
    id: "react-core",
    title: "React Core Concepts",
    description:
      "The mental model: rendering, reconciliation, state, props, and effects.",
    items: [
      {
        id: "rendering",
        question: "What triggers a React component to re-render?",
        answer:
          "A component re-renders when its state changes, its parent re-renders (passing new props), or a subscribed context value changes. React then computes a new UI tree and reconciles it with the previous one to apply minimal updates.",
        tags: ["render", "state", "props", "context"],
      },
      {
        id: "reconciliation",
        question: "What is reconciliation and why do keys matter?",
        answer:
          "Reconciliation is how React compares the previous and next UI trees to decide what to update. Keys help React match list items across renders. Stable, unique keys prevent incorrect reuse of state and reduce unnecessary DOM work.",
        tags: ["reconciliation", "keys", "lists"],
      },
      {
        id: "effects",
        question: "How is useEffect different from useLayoutEffect?",
        answer:
          "useEffect runs after the browser paints, so it’s non-blocking for layout but may cause a visible “flash” if it changes layout. useLayoutEffect runs synchronously after DOM mutations but before paint, so it can measure layout reliably—at the cost of potentially blocking rendering if overused.",
        tags: ["useEffect", "useLayoutEffect", "render"],
      },
      {
        id: "state-batching",
        question: "What is state batching in React?",
        answer:
          "Batching means React groups multiple state updates into a single render for efficiency. In modern React, updates inside many async boundaries are batched, which reduces render count but can surprise you if you expect immediate state changes—use the functional updater when you depend on previous state.",
        tags: ["batching", "setState", "performance"],
      },
    ],
  },
  {
    id: "react-performance",
    title: "Performance & Rendering Strategy",
    description:
      "Avoiding unnecessary work: memoization, derived state, and measuring bottlenecks.",
    items: [
      {
        id: "memo",
        question: "When should you use React.memo/useMemo/useCallback?",
        answer:
          "Use them to reduce expensive recalculations or prevent avoidable re-renders when (1) you have measured a problem, and (2) props are stable enough to benefit. Overusing memoization can add complexity and even slow things down due to extra comparisons and memory overhead.",
        tags: ["memo", "useMemo", "useCallback"],
      },
      {
        id: "virtualization",
        question: "How do you render large lists without UI jank?",
        answer:
          "Virtualize the list: render only the visible window plus a small buffer, and recycle rows as you scroll. This reduces DOM nodes and layout/paint cost. Combine with stable keys, memoized row components, and avoid expensive work during scroll.",
        tags: ["lists", "virtualization", "performance"],
      },
      {
        id: "profiling",
        question: "How would you profile and diagnose a slow React UI?",
        answer:
          "Start with the React DevTools Profiler to find components with high render time or frequent renders. Then inspect why: changing props, unstable callbacks, context churn, heavy computations, or large DOM. Validate with browser Performance tooling (main-thread long tasks, layout/paint) to separate JS vs rendering bottlenecks.",
        tags: ["profiling", "devtools", "performance"],
      },
    ],
  },
];
