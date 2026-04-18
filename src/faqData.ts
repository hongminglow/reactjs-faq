export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  tip?: string;
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
      {
        id: "promise-vs-timeout-order",
        question:
          "Why do Promise callbacks usually run before setTimeout(…, 0)?",
        answer:
          "Promise callbacks run as microtasks, which are drained right after the current call stack finishes. setTimeout queues a macrotask for a future turn of the loop, so microtasks typically win the race.",
        tags: ["microtask", "macrotask", "promise", "setTimeout"],
      },
      {
        id: "queue-microtask",
        question: "What does queueMicrotask do (and when should you use it)?",
        answer:
          "queueMicrotask schedules a callback as a microtask. It’s useful when you want to defer work until after the current stack, but still before the next macrotask. Be careful: scheduling too many microtasks can delay rendering.",
        tags: ["microtask", "queueMicrotask", "performance"],
      },
      {
        id: "abort-controller",
        question: "How do you cancel a fetch request?",
        answer:
          "Use AbortController: pass controller.signal to fetch and call controller.abort() when you no longer need the result. In React, abort in effect cleanup to avoid setting state from stale responses.",
        tags: ["fetch", "AbortController", "cleanup"],
      },
      {
        id: "long-tasks",
        question: "What is a long task and how do you fix UI jank?",
        answer:
          "A long task is main-thread work that blocks input and paints (often >50ms). Fix by splitting work into chunks, deferring non-urgent work, reducing allocations, virtualizing lists, or moving CPU-heavy work into a Worker.",
        tip: "A blocked main thread ruins interactive feel. Even while deferring work, ensure UI elements have clear cursor states (cursor-pointer) and smooth, stable transitions (150-300ms) so the app still feels high-quality during recovery.",
        tags: ["performance", "main thread", "long task"],
      },
      {
        id: "raf",
        question: "When should you use requestAnimationFrame?",
        answer:
          "Use requestAnimationFrame for visual updates tied to frames (animations, measure-then-mutate patterns). It lets the browser schedule your work at the right time relative to layout/paint.",
        tags: ["requestAnimationFrame", "performance"],
      },
      {
        id: "debounce-throttle",
        question: "Debounce vs throttle: what's the difference?",
        answer:
          "Debounce waits until events stop firing (great for search). Throttle runs at most once per interval (great for scroll/resize). Both reduce wasted work and help responsiveness.",
        tags: ["debounce", "throttle", "performance"],
      },
      {
        id: "async-iteration",
        question: "What is async iteration (for await…of) used for?",
        answer:
          "Async iteration lets you consume async streams or async generators as values arrive. It’s useful for incremental data processing without waiting for the whole dataset.",
        tags: ["async", "generators", "streams"],
      },
    ],
  },
  {
    id: "js-language",
    title: "JavaScript Language Deep Dive",
    description:
      "Core mechanics interviewers love: scope, hoisting, prototypes, coercion, and DOM events.",
    items: [
      {
        id: "closures",
        question: "What is a closure and why does it matter?",
        answer:
          "A closure is when a function remembers variables from its outer scope even after that outer function has finished. Example: if createCounter returns a function that increments count, the inner function still remembers count on later calls. Closures power callbacks, private state, and many React patterns.",
        tags: ["closures", "scope", "memory"],
      },
      {
        id: "hoisting-tdz",
        question: "What is hoisting and what is the temporal dead zone (TDZ)?",
        answer:
          "var is hoisted and initialized to undefined. let/const are hoisted too, but uninitialized until their declaration runs; accessing them earlier throws ReferenceError (the TDZ).",
        tags: ["hoisting", "tdz", "let", "const", "var"],
      },
      {
        id: "this-binding",
        question: "How does 'this' binding work in JavaScript?",
        answer:
          "this depends on the call-site: method call (obj.fn()), constructor (new), explicit binding (call/apply/bind), or default binding (undefined in strict mode). Arrow functions don’t have their own this; they capture it lexically.",
        tags: ["this", "bind", "call", "apply"],
      },
      {
        id: "prototype-chain",
        question: "Explain the prototype chain in simple terms.",
        answer:
          "When you access obj.prop, JS checks obj first, then walks up obj’s prototype chain until it finds the property or hits null. class is mostly syntax over this prototype-based delegation.",
        tags: ["prototype", "inheritance", "class"],
      },
      {
        id: "equality",
        question: "== vs ===: why do people avoid ==?",
        answer:
          "== performs type coercion which can be surprising ('' == 0 is true). === is strict and predictable. In most React/TS codebases, prefer ===.",
        tags: ["equality", "coercion"],
      },
      {
        id: "coercion",
        question: "What is type coercion and where does it bite?",
        answer:
          "Coercion is automatic conversion between types (string/number/boolean). It often bites with + (string concatenation), truthy/falsy checks, and == comparisons. Being explicit (Number(), Boolean()) reduces surprises.",
        tags: ["coercion", "truthy", "falsy"],
      },
      {
        id: "event-delegation",
        question: "What is event delegation and why is it useful?",
        answer:
          "Attach one handler to a parent and rely on bubbling to handle child interactions (via event.target / closest()). It reduces listeners and works well for dynamic lists.",
        tags: ["dom", "events", "bubbling"],
      },
      {
        id: "immutability",
        question: "Why is immutability important in React state updates?",
        answer:
          "React and memoization often rely on reference equality. If you mutate objects/arrays in place, React may not detect changes correctly and you risk side effects. Creating new references makes updates predictable.",
        tags: ["immutability", "state", "react"],
      },
      {
        id: "modules",
        question: "ESM vs CommonJS: what’s the practical difference?",
        answer:
          "ES Modules (import/export) are statically analyzable and enable tree-shaking with modern bundlers. CommonJS (require/module.exports) is runtime-based and historically common in Node. Most modern frontend tooling prefers ESM.",
        tags: ["esm", "commonjs", "bundlers"],
      },
      {
        id: "map-foreach",
        question: "map vs forEach: when should you use each?",
        answer:
          "map returns a new array from a transformation (perfect for rendering lists). forEach is for side effects and returns undefined. Prefer map for data-to-UI pipelines.",
        tags: ["arrays", "map", "forEach"],
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
      {
        id: "generational-gc",
        question: "What does 'generational GC' mean (high level)?",
        answer:
          "Engines optimize for the fact that most objects die young. They collect young allocations frequently and cheaply, while collecting older objects less often. This improves throughput for typical apps.",
        tags: ["gc", "performance"],
      },
      {
        id: "detached-dom",
        question: "What are detached DOM nodes and why can they leak memory?",
        answer:
          "A detached DOM node is removed from the document but still referenced by JS (closures, caches, listeners). Because it’s still reachable, GC can’t free it. Fix by removing references and cleaning up listeners.",
        tags: ["memory leak", "dom", "cleanup"],
      },
      {
        id: "effect-cleanup",
        question:
          "Why does useEffect cleanup matter for memory and correctness?",
        answer:
          "Effects often set up subscriptions, timers, listeners, and inflight async work. Cleanup prevents leaks and prevents updating state after unmount or after dependencies change (stale results).",
        tags: ["useEffect", "cleanup", "react"],
      },
      {
        id: "heap-snapshots",
        question: "How would you debug a suspected memory leak in the browser?",
        answer:
          "Use DevTools Memory: take heap snapshots over time, compare retained objects, look for growing listeners/arrays, and inspect retainers to see what’s keeping objects alive. Then fix the root reference.",
        tags: ["devtools", "heap snapshot", "memory"],
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
        id: "react-keys",
        question:
          "What is the key prop in React, and how does it help rendering?",
        answer:
          "key is a special prop React uses during reconciliation for arrays of elements. It lets React identify which item is which across renders, so it can keep component state attached to the right list item and avoid unnecessary unmount/mount cycles. A good key is stable and unique for the item (typically an ID from your data). Avoid using array index as a key when the list can reorder, insert, or delete.",
        tags: ["keys", "lists", "reconciliation", "render"],
      },
      {
        id: "virtual-dom",
        question:
          "What is the Virtual DOM, and how does it help rendering (diffing + reconciliation steps)?",
        answer:
          "The Virtual DOM is React's in-memory description of the UI. On each render, React builds a new tree, compares it with the previous one, then commits only the needed DOM updates. The key idea is not 'virtual DOM is always faster' but that React can reason about updates efficiently and keep UI code declarative.",
        tip:
          "Avoid saying 'Virtual DOM makes React fast by itself.' The stronger answer is that React uses it to reason about updates and minimize unnecessary DOM work.",
        tags: ["virtual dom", "diff", "reconciliation", "render"],
      },
      {
        id: "pure-components",
        question:
          "What is a PureComponent (and how does it relate to React.memo)?",
        answer:
          "React.PureComponent is the class-component version of shallow prop/state comparison. React.memo does the same idea for function components by shallow-comparing props. Both only help when your data is immutable and prop references stay stable.",
        tags: ["PureComponent", "React.memo", "performance", "immutability"],
      },
      {
        id: "react-major-features",
        question: "What are major features of React (as an interview answer)?",
        answer:
          "A strong short answer is: declarative UI, component-based architecture, one-way data flow, reusable logic with hooks, and efficient updates through reconciliation. If the role is more advanced, also mention SSR/streaming, Suspense, and strong tooling.",
        tags: ["react", "features", "architecture"],
      },
      {
        id: "portals",
        question: "What is a portal in React and when would you use it?",
        answer:
          "A portal lets you render a React subtree into a different place in the DOM than its logical parent, while keeping React event handling and state management working as if it were still in the same component tree. It’s commonly used for modals, popovers, and tooltips to avoid CSS overflow/z-index issues (e.g., rendering under document.body).",
        tip: "For portals like floating modals, remember floating/glass elements in light mode should use higher opacities (e.g. bg-white/80 or higher) so they don't look unprofessionally transparent, and always include a visible focus trap for keyboard navigation.",
        tags: ["portal", "ReactDOM.createPortal", "modals"],
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
      {
        id: "state-snapshot",
        question: "Why is React state described as a 'snapshot'?",
        answer:
          "Within a render, state values are fixed. Calling setState schedules a future render; it doesn’t change the current render’s variables. This explains why reading state immediately after setState can feel 'stale'.",
        tags: ["state", "render", "setState"],
      },
      {
        id: "controlled-uncontrolled",
        question:
          "Controlled vs uncontrolled form inputs: what’s the difference?",
        answer:
          "Controlled inputs keep the value in React state; uncontrolled inputs keep it in the DOM and you read it with a ref. Controlled is better for validation and derived UI. Uncontrolled can be simpler for basic forms and is common for file inputs.",
        tip: "From a UX perspective, regardless of controlled or uncontrolled, form inputs must implement semantic labels, provide visible focus states, avoid color as the sole indicator of validation errors, and respect OS-level 'prefers-reduced-motion'.",
        tags: ["forms", "controlled", "uncontrolled"],
      },
      {
        id: "rules-of-hooks",
        question: "What are the Rules of Hooks and why do they exist?",
        answer:
          "Hooks must be called at the top level and in the same order on every render (no conditionals/loops). React relies on call order to map hook state to a component instance.",
        tags: ["hooks", "rules of hooks"],
      },
      {
        id: "use-ref",
        question: "useRef vs useState: when do you use each?",
        answer:
          "useState is for data that affects rendering (updates trigger rerender). useRef stores mutable data that persists across renders without rerender (DOM refs, timers, previous values, escape hatches).",
        tags: ["useRef", "useState"],
      },
      {
        id: "context-usage",
        question: "When should you use Context (and when should you avoid it)?",
        answer:
          "Context is great for truly shared, relatively stable values (theme, locale, auth). Using it for frequently changing values can cause broad rerenders; consider splitting contexts or using a store with selectors.",
        tags: ["context", "performance", "state"],
      },
      {
        id: "strict-mode",
        question: "Why does React Strict Mode run some effects twice in dev?",
        answer:
          "Strict Mode intentionally re-invokes certain lifecycles/effects in development to surface unsafe side effects and missing cleanup. Production doesn’t double-invoke the same way.",
        tags: ["strict mode", "useEffect", "dev"],
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
          "Use them when you've measured wasted work: React.memo to skip child renders, useMemo to cache expensive values, and useCallback to stabilize function references. Don't add them by default; they help only when reference stability or recomputation is actually the bottleneck.",
        tip:
          "A senior answer usually includes 'after profiling' and mentions that over-memoization adds complexity and can backfire.",
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
      {
        id: "referential-equality",
        question:
          "Why do inline objects/functions often cause extra rerenders?",
        answer:
          "Each render creates new references, so shallow compares fail and memoized children rerender. Stabilize with useMemo/useCallback, or move constants outside the component when appropriate.",
        tags: ["memo", "referential equality", "performance"],
      },
      {
        id: "derived-state",
        question: "What is derived state and why can it be risky?",
        answer:
          "Derived state duplicates information that could be computed from props/state. It can get out of sync and create edge cases. Prefer computing during render or memoizing instead of storing duplicate values.",
        tags: ["state", "derived state"],
      },
      {
        id: "code-splitting",
        question: "What is code splitting and when does it help?",
        answer:
          "Code splitting loads code on demand (route-level or component-level), reducing initial download/parse time. It helps most when your bundle is large or users don’t need every feature immediately.",
        tags: ["code splitting", "bundling", "performance"],
      },
      {
        id: "core-web-vitals",
        question:
          "What are Core Web Vitals, and how would you improve them in a real app?",
        answer:
          "Core Web Vitals are LCP for loading, INP for responsiveness, and CLS for visual stability. Improve them by shipping less JS, optimizing images/fonts, prioritizing above-the-fold content, reserving layout space, and reducing long main-thread work.",
        tip:
          "Interviewers like hearing one concrete fix per metric: image and render-path work for LCP, less blocking JS for INP, reserved space for CLS.",
        tags: ["core web vitals", "lcp", "inp", "cls", "performance"],
      },
      {
        id: "suspense",
        question: "What is Suspense used for (conceptually)?",
        answer:
          "Suspense lets React show fallback UI while part of the tree is waiting on async work, such as lazy-loaded code or framework-managed data. It coordinates loading states, but Suspense itself is not a data-fetching library.",
        tags: ["Suspense", "loading"],
      },
      {
        id: "use-transition",
        question: "What does useTransition solve?",
        answer:
          "It marks updates as non-urgent so React can keep the UI responsive (like typing) while rendering expensive updates at lower priority.",
        tags: ["useTransition", "performance"],
      },
      {
        id: "use-deferred-value",
        question: "What does useDeferredValue solve?",
        answer:
          "It defers updating a derived value so urgent UI (like an input) stays responsive while expensive filtering/rendering happens with lower priority.",
        tags: ["useDeferredValue", "performance"],
      },
    ],
  },
  {
    id: "react-hooks-advanced",
    title: "Hooks & Advanced Patterns",
    description:
      "Common pitfalls and advanced hooks usage: dependencies, reducers, refs, and reusable logic.",
    items: [
      {
        id: "stale-closures",
        question: "What is a stale closure in React and how do you avoid it?",
        answer:
          "Closures capture values from the render where they were created. If an effect/callback doesn’t update when values change, it can read stale data. Fix with correct dependencies, functional updates, or refs for mutable latest values.",
        tags: ["closures", "useEffect", "dependencies"],
      },
      {
        id: "hoc",
        question:
          "What is a Higher-Order Component (HOC)? Show a simple example.",
        answer: `A Higher-Order Component is a function that takes a component and returns a new component with extra behavior. It's an older reuse pattern that you still see in some libraries and class-based code.

Example (adds a loading UI):

function withLoading<P>(Component: React.ComponentType<P>) {
  return function WithLoading(props: P & { isLoading: boolean }) {
    if (props.isLoading) return <div>Loading…</div>;
    const { isLoading, ...rest } = props;
    return <Component {...(rest as P)} />;
  };
}
`,
        tags: ["hoc", "patterns", "composition"],
      },
      {
        id: "hoc-vs-hooks-vs-render-props",
        question:
          "HOC vs Hooks vs Render Props: what's the difference (and when to use each)?",
        answer:
          "All three reuse logic, but in different ways. HOCs wrap components, render props pass a function to control rendering, and hooks reuse logic directly inside function components. Today, hooks are usually the default; render props are useful when the caller needs render control, and HOCs are mostly for legacy or library integration.",
        tags: ["hoc", "hooks", "render props", "patterns"],
      },
      {
        id: "use-reducer",
        question: "When should you prefer useReducer over useState?",
        answer:
          "useReducer helps when state updates are complex, involve multiple sub-values, or you want predictable transitions (action-based updates). It can also improve readability and testability.",
        tags: ["useReducer", "state"],
      },
      {
        id: "use-callback",
        question: "What problem does useCallback actually solve?",
        answer:
          "It stabilizes a function reference between renders. This is mainly useful when passing callbacks to memoized children or dependencies of other hooks. It doesn’t make the function faster by itself.",
        tags: ["useCallback", "memo"],
      },
      {
        id: "use-memo",
        question: "What problem does useMemo actually solve?",
        answer:
          "It memoizes a computed value so you don’t recompute it on every render. Use it for expensive calculations or to stabilize object/array references used as props/dependencies.",
        tags: ["useMemo", "performance"],
      },
      {
        id: "use-imperative-handle",
        question: "What is useImperativeHandle and when would you use it?",
        answer:
          "It customizes the ref value exposed by a child component (usually with forwardRef). Use it to expose an imperative API (focus(), scrollTo()) when composition alone isn’t enough.",
        tags: ["refs", "useImperativeHandle", "forwardRef"],
      },
      {
        id: "custom-hooks",
        question: "What makes a good custom hook?",
        answer:
          "A good custom hook has one clear responsibility, composes other hooks, cleans up side effects, and exposes a small ergonomic API (often returning values + actions).",
        tags: ["custom hook", "composition"],
      },
      {
        id: "use-id",
        question: "What is useId used for?",
        answer:
          "useId generates stable IDs for accessibility relationships like label/input and aria-describedby. It's for accessibility, not for React list keys.",
        tags: ["useId", "a11y"],
      },
    ],
  },
  {
    id: "react-architecture",
    title: "React Architecture & State Management",
    description:
      "How to structure apps: data flow, composition, and choosing state tools.",
    items: [
      {
        id: "lifting-state",
        question: "What does 'lifting state up' mean?",
        answer:
          "When multiple components need the same state, move it to their closest common parent and pass value + setters down. This prevents duplicated state and keeps behavior consistent.",
        tags: ["state", "props", "architecture"],
      },
      {
        id: "composition",
        question: "Why does React prefer composition over inheritance?",
        answer:
          "Composition lets you build behavior by combining small components via props/children rather than rigid class hierarchies. It’s more flexible and fits React’s declarative model.",
        tags: ["composition", "architecture"],
      },
      {
        id: "client-vs-server-state",
        question: "Client state vs server state: what’s the difference?",
        answer:
          "Client state is local UI state like modals or input text. Server state is remote data that needs fetching, caching, invalidation, and refetching. Treating server state like plain local state often leads to stale or duplicated data bugs.",
        tip:
          "A strong practical example is 'modal open state is client state; fetched users list is server state.'",
        tags: ["state", "caching", "data fetching"],
      },
      {
        id: "csr-ssr-ssg",
        question:
          "CSR vs SSR vs SSG: how would you explain the tradeoffs in an interview?",
        answer:
          "CSR renders in the browser after JS loads, so it can be simpler but weaker for first load and SEO. SSR renders HTML per request, which improves initial render and SEO but adds server cost and hydration complexity. SSG builds pages ahead of time, which is fast and cheap for stable content but less flexible for highly dynamic pages.",
        tip:
          "The clearest structure is to compare them on first load, SEO, infrastructure cost, and how often the content changes.",
        tags: ["csr", "ssr", "ssg", "rendering strategy"],
      },
      {
        id: "hydration",
        question: "What is hydration, and why do hydration mismatches happen?",
        answer:
          "Hydration is when React attaches client logic to server-rendered HTML. Mismatches happen when the client's first render differs from the server output, often because of dates, random values, browser-only APIs, or changing data. The fix is to keep the first render deterministic and defer client-only differences until after mount.",
        tip:
          "A good example is rendering a timestamp or reading localStorage during the first client render. Both can create a mismatch.",
        tags: ["hydration", "ssr", "rendering"],
      },
      {
        id: "error-boundary",
        question: "What is an Error Boundary and what does it catch?",
        answer:
          "Error Boundaries catch errors thrown during rendering, lifecycle methods, and constructors in descendants, letting you show fallback UI. They do not catch errors in event handlers or async callbacks.",
        tags: ["error boundary", "resilience"],
      },
      {
        id: "optimistic-updates",
        question: "What are optimistic updates and what can go wrong?",
        answer:
          "Optimistic updates show the success state before the server confirms. They improve perceived speed, but you need rollback logic and must handle failures, races, and out-of-order responses carefully.",
        tags: ["ux", "data", "optimistic"],
      },
      {
        id: "request-race-conditions",
        question:
          "How do race conditions happen in frontend data fetching, and how do you prevent them?",
        answer:
          "Race conditions happen when multiple requests for the same view resolve out of order, so an older response overwrites newer UI. Common fixes are canceling stale requests with AbortController, tracking request IDs, ignoring outdated responses in effects, and relying on a server-state library that handles caching and deduping.",
        tip:
          "Autocomplete or fast tab switching is the easiest example: the older request finishes last and incorrectly wins unless you cancel or ignore it.",
        tags: ["race conditions", "fetch", "AbortController", "async"],
      },
    ],
  },
  {
    id: "css-layout",
    title: "CSS, Layout & UI Engineering",
    description:
      "Frontend interview topics beyond React: layout, stacking, responsiveness, and rendering stability.",
    items: [
      {
        id: "browser-rendering-pipeline",
        question:
          "How does the browser turn HTML/CSS/JS into pixels on the screen?",
        answer:
          "At a high level: parse HTML into the DOM, parse CSS into the CSSOM, build the render tree, run layout, paint, then composite layers. JavaScript can interrupt this pipeline, which is why forced layout and long tasks hurt performance.",
        tags: ["rendering", "dom", "cssom", "layout", "paint"],
      },
      {
        id: "flexbox-vs-grid",
        question: "When should you use Flexbox vs CSS Grid?",
        answer:
          "Use Flexbox for one-dimensional layout, like aligning items in a row or column. Use Grid for two-dimensional layout, where rows and columns both matter. A common real-world pattern is Grid for page layout and Flexbox inside components.",
        tip: "To maintain a premium layout, match Flexbox/Grid with consistent max-widths (e.g., max-w-6xl). Also, ensure your floating elements (like navbars) have proper edge spacing (top-4 left-4), rather than sticking rigidly to screen bounds.",
        tags: ["css", "flexbox", "grid", "layout"],
      },
      {
        id: "stacking-context",
        question:
          "Why does z-index sometimes 'not work', and what is a stacking context?",
        answer:
          "z-index only works within the same stacking context. Properties like positioned elements with z-index, transform, and opacity can create new stacking contexts. A child cannot escape its parent's stacking context, so debugging usually means finding which ancestor created it.",
        tip:
          "If you want to sound practical, mention one trigger like transform or opacity and say you would inspect ancestors in DevTools.",
        tags: ["css", "z-index", "stacking context", "layout"],
      },
      {
        id: "layout-shift",
        question:
          "What causes layout shift in the UI, and how do you reduce it?",
        answer:
          "Layout shift happens when visible elements move unexpectedly after first render, often because images, ads, fonts, or async content change size late. Reduce it by reserving space with explicit dimensions or aspect-ratio, avoiding inserting content above existing content, and loading fonts in a way that minimizes reflow.",
        tip: "Interactive layout shift is a major red flag for professionalism: ensure hover effects use color/opacity transitions instead of structural block scaling or transform properties that push neighboring content.",
        tags: ["cls", "layout shift", "performance", "css"],
      },
      {
        id: "responsive-strategy",
        question:
          "Media queries vs container queries: what problem does each solve?",
        answer:
          "Media queries respond to the viewport, so they fit page-level breakpoints. Container queries respond to a component's parent size, so they are better for reusable components that appear in different layouts. For design systems, container queries are often the more scalable answer.",
        tags: ["css", "responsive", "media queries", "container queries"],
      },
      {
        id: "semantic-html",
        question:
          "Why does semantic HTML still matter if you can style any element anyway?",
        answer:
          "Semantic HTML gives you built-in accessibility, expected keyboard behavior, and clearer meaning for browsers and assistive tech. For example, a real button already supports focus and keyboard activation; a styled div does not.",
        tip: "Along with semantic tags, visually represent meaning correctly: avoid using emojis as UI icons; opt for crisp, consistent SVGs with fixed 24x24 viewBoxes. Ensure light mode text contrast remains strong (using #0F172A or #475569).",
        tags: ["html", "semantic html", "a11y", "frontend"],
      },
    ],
  },
  {
    id: "web-platform",
    title: "Web Platform, Networking & Security",
    description:
      "Browser and network fundamentals: caching, CORS, security, and rendering cost.",
    items: [
      {
        id: "cors",
        question: "What is CORS and why do browsers enforce it?",
        answer:
          "CORS is a browser security mechanism that restricts cross-origin reads unless the server opts in via response headers. It prevents a malicious site from reading sensitive responses from another origin.",
        tags: ["cors", "security", "http"],
      },
      {
        id: "xss",
        question: "What is XSS and how does React reduce it?",
        answer:
          "XSS is injecting scripts into a page. React escapes text by default, reducing injection risk. Risk increases when inserting raw HTML (dangerouslySetInnerHTML) or trusting unvalidated input.",
        tip:
          "The important nuance is that React helps by escaping text, but it does not make unsafe HTML or unsanitized data safe automatically.",
        tags: ["xss", "security", "react"],
      },
      {
        id: "csrf",
        question: "What is CSRF and how is it mitigated?",
        answer:
          "CSRF tricks a browser into making authenticated requests. Mitigations include SameSite cookies, CSRF tokens, and checking Origin/Referer headers for state-changing requests.",
        tags: ["csrf", "security", "cookies"],
      },
      {
        id: "caching",
        question: "What HTTP caching mechanisms should you know?",
        answer:
          "Cache-Control controls freshness, ETag/If-None-Match enables validation, and CDNs can cache at the edge. Caching reduces latency but you must handle invalidation and stale content carefully.",
        tags: ["http", "cache-control", "etag"],
      },
      {
        id: "storage",
        question:
          "localStorage vs sessionStorage vs cookies: when to use which?",
        answer:
          "localStorage persists until cleared; sessionStorage lasts per tab session. Cookies are sent to the server and can be HttpOnly/SameSite, so they’re often used for sessions/auth. Choose based on security and lifecycle.",
        tags: ["storage", "cookies", "security"],
      },
      {
        id: "reflow-repaint",
        question: "Reflow vs repaint: what's the difference?",
        answer:
          "Reflow (layout) recalculates sizes/positions; repaint redraws pixels. Layout is usually more expensive. Avoid layout thrashing by batching DOM reads/writes and minimizing forced synchronous layout.",
        tags: ["performance", "layout", "rendering"],
      },
      {
        id: "a11y",
        question: "What are a few must-have accessibility practices?",
        answer:
          "Use semantic HTML, support keyboard navigation with visible focus, label form controls, use ARIA only when native HTML is not enough, and keep color contrast readable. Accessibility should be part of the default quality bar.",
        tags: ["a11y", "aria", "ux"],
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript for React (Bonus)",
    description:
      "Type patterns you’ll see in React codebases: unions, generics, and safe typing.",
    items: [
      {
        id: "discriminated-unions",
        question:
          "What are discriminated unions and why are they useful for UI state?",
        answer:
          "They use a shared literal field (like status: 'idle' | 'loading' | 'success') so TS can narrow reliably. This models UI states without impossible combinations.",
        tags: ["typescript", "union", "state"],
      },
      {
        id: "unknown-vs-any",
        question: "unknown vs any: what’s the difference?",
        answer:
          "any disables type checking; unknown forces you to validate/narrow before use. Prefer unknown for untrusted inputs (JSON, external data) to keep safety.",
        tags: ["typescript", "unknown", "any"],
      },
      {
        id: "typing-events",
        question: "How do you type React event handlers?",
        answer:
          "Use React event types like React.ChangeEvent<HTMLInputElement> or React.MouseEvent<HTMLButtonElement>. This gives correct target/currentTarget types without unsafe casts.",
        tags: ["typescript", "events", "react"],
      },
      {
        id: "generics",
        question: "When would you use generics in React components?",
        answer:
          "For reusable components over different item types (tables, selects, lists). Generics preserve strong typing for renderers and callbacks without duplicating components.",
        tags: ["typescript", "generics"],
      },
      {
        id: "readonly",
        question: "When does readonly help in React code?",
        answer:
          "readonly prevents accidental mutation. It’s useful for props, config objects, and derived data you shouldn’t modify. It complements React’s immutable update patterns.",
        tags: ["typescript", "readonly", "immutability"],
      },
    ],
  },
];
