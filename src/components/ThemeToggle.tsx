type Theme = "dark" | "light";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "dark") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M21 14.5A8.5 8.5 0 0 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-8a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm15.07 6.07a1 1 0 0 1 0 1.41l-.7.7a1 1 0 1 1-1.41-1.41l.7-.7a1 1 0 0 1 1.41 0ZM7.04 6.04a1 1 0 0 1 0 1.41l-.7.7A1 1 0 1 1 4.93 6.74l.7-.7a1 1 0 0 1 1.41 0Zm12.03-1.1a1 1 0 0 1 0 1.4l-.7.7a1 1 0 1 1-1.41-1.4l.7-.7a1 1 0 0 1 1.41 0ZM7.04 17.96a1 1 0 0 1 0 1.41l-.7.7a1 1 0 1 1-1.41-1.41l.7-.7a1 1 0 0 1 1.41 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextLabel =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const pillLabel = theme === "dark" ? "Dark" : "Light";

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={onToggle}
      aria-label={nextLabel}
    >
      <span className="themeToggleIcon" aria-hidden="true">
        <ThemeIcon theme={theme} />
      </span>
      <span className="themeToggleText">{pillLabel}</span>
    </button>
  );
}
