import "./App.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { Accordion } from "./components/Accordion";
import { ThemeToggle } from "./components/ThemeToggle";
import { faqSections } from "./faqData";

type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "reactjs-faq.theme";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return "dark";
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [openBySection, setOpenBySection] = useState<
    Record<string, string | null>
  >(
    () =>
      Object.fromEntries(faqSections.map((s) => [s.id, null])) as Record<
        string,
        string | null
      >,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const isSearchShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

      if (!isSearchShortcut) return;

      event.preventDefault();

      const input = searchInputRef.current;
      if (!input) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      input.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
      input.focus();
      input.select();
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqSections;

    return faqSections
      .map((section) => {
        const items = section.items.filter((item) => {
          const hay =
            `${item.question} ${item.answer} ${item.tip ?? ""} ${item.tags.join(" ")}`.toLowerCase();
          return hay.includes(q);
        });
        return { ...section, items };
      })
      .filter((section) => section.items.length > 0);
  }, [query]);

  const totalMatches = useMemo(() => {
    return filteredSections.reduce((sum, s) => sum + s.items.length, 0);
  }, [filteredSections]);

  return (
    <div className="page">
      <a className="skipLink" href="#content">
        Skip to content
      </a>

      <header className="header">
        <div className="headerInner">
          <div className="brand">
            <div className="brandMark" aria-hidden="true">
              <span className="brandDot" />
            </div>
            <div className="brandText">
              <div className="brandTitle">React + JavaScript Interview FAQ</div>
              <div className="brandSubtitle">
                Common questions, crisp answers, fast review.
              </div>
            </div>
          </div>

          <div className="headerActions">
            <ThemeToggle
              theme={theme}
              onToggle={() =>
                setTheme((t) => (t === "dark" ? "light" : "dark"))
              }
            />
          </div>
        </div>
      </header>

      <main id="content" className="main" role="main">
        <section className="hero" aria-label="FAQ search">
          <h1 className="heroTitle">
            Frequently asked React & JavaScript interview questions
          </h1>
          <p className="heroBody">
            Explore advanced topics like the event loop, garbage collection,
            effects, and performance.
          </p>

          <div className="searchRow">
            <div className="searchLabelRow">
              <label className="searchLabel" htmlFor="faq-search">
                Search
              </label>
              <span className="searchShortcut" aria-hidden="true">
                Ctrl+K
              </span>
            </div>
            <div className="searchInputWrap">
              <input
                id="faq-search"
                ref={searchInputRef}
                className="searchInput"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: hydration, event loop, useEffect, workers, memo…"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div className="searchMeta" aria-live="polite">
              {query.trim()
                ? `${totalMatches} match${totalMatches === 1 ? "" : "es"}`
                : "Browse all"}
            </div>
          </div>
        </section>

        {filteredSections.length === 0 ? (
          <section className="empty" aria-label="No results">
            <h2 className="emptyTitle">No results</h2>
            <p className="emptyBody">
              Try a different keyword (e.g. “promises”, “cleanup”, “profiling”).
            </p>
          </section>
        ) : (
          <div className="sections" role="presentation">
            {filteredSections.map((section) => (
              <section
                key={section.id}
                className="section"
                aria-label={section.title}
              >
                <div className="sectionHeader">
                  <h2 className="sectionTitle">{section.title}</h2>
                  <p className="sectionDescription">{section.description}</p>
                </div>

                <Accordion
                  items={section.items.map((item) => ({
                    id: item.id,
                    header: item.question,
                    body: item.answer,
                    tip: item.tip,
                  }))}
                  openItemId={openBySection[section.id] ?? null}
                  onToggle={(id) =>
                    setOpenBySection((prev) => ({
                      ...prev,
                      [section.id]: prev[section.id] === id ? null : id,
                    }))
                  }
                />
              </section>
            ))}
          </div>
        )}

        <footer className="footer" aria-label="Footer">
          <div className="footerInner">
            <p className="footerText">
              Tip: practice explaining answers out loud in 60–90 seconds.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
