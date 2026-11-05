import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../../../lib/useClickOutside";
import type { DateFilter, EventsView, Rsvp } from "../../types";

const DATE_OPTIONS: { value: DateFilter; label: string }[] = [
  { value: "all", label: "All dates" },
  { value: "future", label: "Upcoming" },
  { value: "past", label: "Past" },
];
const RSVP_OPTIONS: Rsvp[] = ["Yes", "No", "Maybe", "Pending"];

// Temporary link until the Outlook calendar feed exists.
const OUTLOOK_URL = "https://outlook.office.com/calendar/";

const button =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-ev-line bg-white px-4 text-sm font-semibold hover:border-ev-navy";
const legend = "mb-2 p-0 text-xs font-extrabold uppercase tracking-[.06em] text-ev-muted";
const option = "flex cursor-pointer items-center gap-2.5 text-sm text-ev-ink-soft";

interface EventsToolbarProps {
  query: string;
  onQueryChange: (query: string) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (value: DateFilter) => void;
  rsvps: Rsvp[];
  onRsvpsChange: (value: Rsvp[]) => void;
  view: EventsView;
  onViewChange: (view: EventsView) => void;
}

export function EventsToolbar(props: EventsToolbarProps) {
  const { query, onQueryChange, dateFilter, onDateFilterChange, rsvps, onRsvpsChange, view, onViewChange } = props;
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  useClickOutside(menuRef, () => setOpen(false));
  const activeCount = rsvps.length + (dateFilter !== "all" ? 1 : 0);

  // Ctrl/⌘ + K focuses the search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 p-3.5 md:px-5 md:py-4">
      <label className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-transparent bg-ev-tile px-4 text-ev-muted focus-within:border-ev-link focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgb(39_87_214/14%)] md:w-[min(380px,100%)]">
        <span className="sr-only">Search events</span>
        <button type="button" aria-label="Search" onClick={() => searchRef.current?.focus()} className="grid place-items-center rounded-[4px] hover:text-ev-link">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
        </button>
        <input
          ref={searchRef}
          type="search"
          placeholder="Search events"
          autoComplete="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-ev-ink outline-none"
        />
        <kbd className="rounded-md border border-ev-line px-1.5 py-0.5 font-[inherit] text-xs text-ev-muted">⌘ K</kbd>
      </label>

      <div ref={menuRef} className="relative">
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className={button}>
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 5h16l-6.5 7.5v5l-3 1.5v-6.5L4 5Z" /></svg>
          Filters
          {activeCount > 0 && (
            <span className="inline-grid size-[18px] place-items-center rounded-full bg-ev-navy text-xs text-white">{activeCount}</span>
          )}
        </button>
        {open && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-10 w-[270px] rounded-xl border border-ev-line bg-white p-4 shadow-ev-pop">
            <div className="mb-2.5 flex items-center justify-between text-sm">
              <strong>Filter events</strong>
              <button
                type="button"
                onClick={() => {
                  onDateFilterChange("all");
                  onRsvpsChange([]);
                }}
                className="px-1.5 py-1 text-sm font-bold text-ev-link hover:underline"
              >
                Clear all
              </button>
            </div>
            <fieldset className="grid gap-2.5 border-0 border-t border-ev-line py-3">
              <legend className={legend}>Date</legend>
              {DATE_OPTIONS.map((item) => (
                <label key={item.value} className={option}>
                  <input type="radio" name="dateFilter" checked={dateFilter === item.value} onChange={() => onDateFilterChange(item.value)} className="accent-ev-navy" />
                  {item.label}
                </label>
              ))}
            </fieldset>
            <fieldset className="grid gap-2.5 border-0 border-t border-ev-line py-3">
              <legend className={legend}>My RSVP</legend>
              {RSVP_OPTIONS.map((item) => (
                <label key={item} className={option}>
                  <input
                    type="checkbox"
                    checked={rsvps.includes(item)}
                    onChange={() => onRsvpsChange(rsvps.includes(item) ? rsvps.filter((r) => r !== item) : [...rsvps, item])}
                    className="accent-ev-navy"
                  />
                  {item}
                </label>
              ))}
            </fieldset>
          </div>
        )}
      </div>

      <a href={OUTLOOK_URL} target="_blank" rel="noopener noreferrer" title="Add all events to your Outlook calendar" className={`${button} no-underline md:ml-auto max-md:px-3`}>
        <svg className="size-4 text-ev-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M12 13v5M9.5 15.5 12 18l2.5-2.5" /></svg>
        <span className="max-md:hidden">Sync to Outlook</span>
      </a>

      <div className="inline-flex rounded-lg border border-ev-line bg-ev-tile p-1" role="group" aria-label="Event view">
        {(
          [
            { value: "calendar", label: "Calendar", icon: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></> },
            { value: "list", label: "List", icon: <><path d="M8 6h12M8 12h12M8 18h12" /><circle cx="4" cy="6" r=".8" fill="currentColor" /><circle cx="4" cy="12" r=".8" fill="currentColor" /><circle cx="4" cy="18" r=".8" fill="currentColor" /></> },
          ] as const
        ).map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={view === item.value}
            onClick={() => onViewChange(item.value)}
            className={`inline-flex h-8 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold ${view === item.value ? "bg-ev-navy text-white" : "text-ev-ink-soft"}`}
          >
            <svg className="size-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">{item.icon}</svg>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
