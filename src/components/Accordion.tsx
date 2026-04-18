import { useId, useMemo } from "react";

type AccordionItemData = {
  id: string;
  header: string;
  body: string;
  tip?: string;
};

type AccordionProps = {
  items: AccordionItemData[];
  openItemId: string | null;
  onToggle: (id: string) => void;
};

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={expanded ? "accChevron accChevronExpanded" : "accChevron"}
    >
      <path
        d="M6.7 9.2a1 1 0 0 1 1.4 0L12 13.1l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.6a1 1 0 0 1 0-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Accordion({ items, openItemId, onToggle }: AccordionProps) {
  const instanceId = useId();

  const normalized = useMemo(() => {
    return items.map((item) => {
      const buttonId = `${instanceId}-btn-${item.id}`;
      const panelId = `${instanceId}-panel-${item.id}`;
      return { ...item, buttonId, panelId };
    });
  }, [items, instanceId]);

  return (
    <div className="acc" role="presentation">
      {normalized.map((item) => {
        const expanded = openItemId === item.id;

        return (
          <div key={item.id} className="accItem">
            <h3 className="accHeading">
              <button
                id={item.buttonId}
                type="button"
                className="accButton"
                aria-expanded={expanded}
                aria-controls={item.panelId}
                onClick={() => onToggle(item.id)}
              >
                <span className="accButtonText">{item.header}</span>
                <Chevron expanded={expanded} />
              </button>
            </h3>

            <div
              id={item.panelId}
              role="region"
              aria-labelledby={item.buttonId}
              hidden={!expanded}
              className="accPanel"
            >
              <div className="accPanelInner">
                <p className="accAnswer">{item.body}</p>
                {item.tip ? (
                  <p className="accTip">
                    <span className="accTipLabel">Tip:</span>{" "}
                    {item.tip}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
