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
          "A closure is when a function keeps access to variables from its lexical scope even after the outer function returns. Closures power callbacks, module patterns, and hooks — but can also retain memory if you capture large objects.",
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
          "Controlled inputs store the value in React state (onChange updates state). Uncontrolled inputs let the DOM hold the value (read via ref). Controlled is easier for validation; uncontrolled can be simpler and avoids rerenders for every keystroke.",
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
        id: "suspense",
        question: "What is Suspense used for (conceptually)?",
        answer:
          "Suspense lets a component 'wait' and show fallback UI while something is loading (like code-split chunks). It helps coordinate loading states in a structured way.",
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
          "useId generates stable unique IDs for accessibility attributes (label/controls relationships). It helps avoid ID collisions across components.",
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
          "Client state is purely UI/local (modals, filters). Server state is remote data that must be fetched, cached, invalidated, and kept in sync. Treating server state like local state often causes stale data bugs.",
        tags: ["state", "caching", "data fetching"],
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
          "You update UI immediately before the server confirms, then reconcile later. It improves UX but requires rollback on failure and careful handling of race conditions and ordering.",
        tags: ["ux", "data", "optimistic"],
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
          "Use semantic HTML, ensure keyboard navigation + visible focus, label inputs, use aria attributes only when needed, and keep color contrast sufficient. Accessibility is part of quality, not a 'nice-to-have'.",
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
