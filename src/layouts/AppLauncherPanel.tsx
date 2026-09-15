import { ChevronsUpDown, Search, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";

const APPS = [
  { image: "outlook-img.png", label: "Outlook" },
  { image: "zoom-img.png", label: "Zoom" },
  { image: "copilot-img.png", label: "Copilot" },
  { image: "powerbi-img.png", label: "Power BI" },
  { image: "Salesforce-img.png", label: "Salesforce" },
  { image: "linkedin-img.png", label: "LinkedIn" },
  { image: "Canva-logo-img.png", label: "Canva" },
  { image: "monday-com-img.png", label: "Monday.com" },
];

const SORT_OPTIONS = ["Default", "Name A-Z", "Name Z-A"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

export function AppLauncherPanel() {
  const [tab, setTab] = useState<"apps" | "favorites">("apps");
  const [sort, setSort] = useState<SortOption>("Default");
  const [sortOpen, setSortOpen] = useState(false);

  const apps =
    sort === "Name A-Z"
      ? [...APPS].sort((a, b) => a.label.localeCompare(b.label))
      : sort === "Name Z-A"
        ? [...APPS].sort((a, b) => b.label.localeCompare(a.label))
        : APPS;

  return (
    <div className="absolute right-0 top-full z-10 mt-2 w-96 rounded-card border border-border bg-surface shadow-card">
      <div className="flex items-center gap-4 border-b border-border px-5 pt-3.5">
        {(["apps", "favorites"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "border-b-2 pb-3 text-sm font-semibold capitalize",
              tab === key
                ? "border-brand-link text-brand-link"
                : "border-transparent text-brand-navy/55 hover:text-brand-navy",
            )}
          >
            {key}
          </button>
        ))}
      </div>

      {tab === "apps" ? (
        <>
          <div className="px-5 pt-3.5">
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-brand-navy/50" />
              <input
                type="text"
                placeholder="Search apps..."
                className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-brand-navy/50"
              />
            </div>
          </div>

          <div className="relative mt-3 flex items-center justify-between px-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/55">
              Org apps ({APPS.length})
            </p>
            <button
              onClick={() => setSortOpen((open) => !open)}
              aria-label="Sort apps"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-brand-navy/55 hover:text-brand-navy"
            >
              <ChevronsUpDown className="h-3.5 w-3.5" />
            </button>

            {sortOpen && (
              <div className="absolute right-5 top-7 z-10 w-32 rounded-card border border-border bg-surface py-1 shadow-card">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSort(option);
                      setSortOpen(false);
                    }}
                    className={cn(
                      "block w-full px-3 py-1.5 text-left text-sm hover:bg-surface-subtle",
                      sort === option ? "font-semibold text-brand-navy" : "text-brand-navy/75",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 grid max-h-80 grid-cols-3 gap-3 overflow-y-auto p-5 pt-0">
            {apps.map((app) => (
              <a
                key={app.label}
                href="#"
                className="group relative flex flex-col items-center gap-2 rounded-card border border-border p-3 text-center hover:border-transparent hover:shadow-card"
              >
                <Star className="absolute right-2 top-2 h-3.5 w-3.5 text-brand-navy/30 group-hover:text-brand-navy/55" />
                <span className="mt-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
                  <img
                    src={`/cornerstone-assets/apps/${app.image}`}
                    alt=""
                    className="h-full w-full object-contain p-1.5"
                  />
                </span>
                <span className="text-xs font-medium text-brand-navy">{app.label}</span>
              </a>
            ))}
          </div>
        </>
      ) : (
        <p className="px-5 py-8 text-center text-sm text-brand-navy/55">No favorites yet</p>
      )}
    </div>
  );
}
