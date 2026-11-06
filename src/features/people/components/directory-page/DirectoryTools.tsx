import { ChevronDown, Search } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "../../../../lib/cn";
import { useClickOutside } from "../../../../lib/useClickOutside";
import { SORT_OPTIONS } from "../../data";
import type { SortKey } from "../../types";

interface DirectoryToolsProps {
  query: string;
  onQueryChange: (query: string) => void;
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  descending: boolean;
  onDescendingChange: (descending: boolean) => void;
}

const ORDER_OPTIONS = [
  { label: "A to Z", descending: false },
  { label: "Z to A", descending: true },
];

const heading = "mx-2 mb-1 mt-1.5 text-xs font-bold uppercase tracking-[0.08em] text-brand-navy/60";

/** One choice in the sort menu; the chosen one is blue with a tick. */
function Choice({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onClick}
      className={cn("flex min-h-[38px] w-full items-center justify-between rounded-md px-2.5 text-left text-sm hover:bg-surface-subtle", checked && "font-bold text-brand-link")}
    >
      {label}
      {checked && "✓"}
    </button>
  );
}

/** Search box and the "Sort by" dropdown (what to sort by, and A to Z or Z to A). */
export function DirectoryTools({ query, onQueryChange, sortKey, onSortKeyChange, descending, onDescendingChange }: DirectoryToolsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setOpen(false));

  return (
    <div className="mb-3 flex flex-wrap items-center gap-3">
      <div className="relative min-w-[220px] max-w-[480px] flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-[17px] -translate-y-1/2 text-brand-navy/45" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search people…"
          aria-label="Search people"
          className="h-[46px] w-full rounded-lg border border-border bg-surface-subtle pl-11 pr-3.5 text-sm outline-none placeholder:text-brand-navy/55 focus:border-brand-accent focus:shadow-[0_0_0_3px_rgba(245,197,24,0.18)]"
        />
      </div>

      <div ref={menuRef} className="relative ml-auto" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="inline-flex h-[46px] items-center gap-2.5 rounded-lg border border-border bg-surface-subtle px-3.5 text-sm"
        >
          <span>
            Sort by: <b className="font-bold">{SORT_OPTIONS.find(([key]) => key === sortKey)?.[1]}, {descending ? "Z–A" : "A–Z"}</b>
          </span>
          <ChevronDown className={cn("size-4 text-brand-navy/60 transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-[220px] rounded-[10px] border border-border bg-white p-2 shadow-[0_12px_28px_-10px_rgba(27,42,58,0.25)]">
            <p className={heading}>Sort by</p>
            <div role="radiogroup" aria-label="Sort by">
              {SORT_OPTIONS.map(([key, label]) => (
                <Choice key={key} label={label} checked={sortKey === key} onClick={() => onSortKeyChange(key)} />
              ))}
            </div>
            <p className={cn(heading, "mt-2.5 border-t border-border pt-2.5")}>Order</p>
            <div role="radiogroup" aria-label="Order">
              {ORDER_OPTIONS.map((option) => (
                <Choice key={option.label} label={option.label} checked={descending === option.descending} onClick={() => onDescendingChange(option.descending)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
