import { ChevronsUpDown, FileText, Search } from "lucide-react";
import { FavoriteButton } from "../components/ui/FavoriteButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites, type FavTab } from "../lib/useFavorites";
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

function AppTile({ app }: { app: (typeof APPS)[number] }) {
  return (
      <a
        href="#"
        className="group relative flex flex-col items-center gap-2 rounded-card border border-border p-3 text-center hover:border-transparent hover:shadow-card"
      >
        <span onClick={(e) => e.preventDefault()} className="absolute right-0.5 top-0.5"><FavoriteButton className="h-6 w-6" item={{ id: `app-${app.label}`, tab: "apps", title: app.label, image: `/cornerstone-assets/apps/${app.image}` }} /></span>
        <span className="mt-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
          <img
            src={`/cornerstone-assets/apps/${app.image}`}
            alt=""
            className="h-full w-full object-contain p-1.5"
          />
        </span>
        <span className="text-xs font-medium text-brand-navy">{app.label}</span>
      </a>
  );
}

export function AppLauncherPanel() {
  const [tab, setTab] = useState<"apps" | "favorites">("apps");
  const [sort, setSort] = useState<SortOption>("Default");
  const [sortOpen, setSortOpen] = useState(false);
  const { items, has } = useFavorites();
  const [fav, setFav] = useState<FavTab>("apps");

  const apps =
    sort === "Name A-Z"
      ? [...APPS].sort((a, b) => a.label.localeCompare(b.label))
      : sort === "Name Z-A"
        ? [...APPS].sort((a, b) => b.label.localeCompare(a.label))
        : APPS;
  const starred = APPS.filter((app) => has(`app-${app.label}`)).slice(0, 8);
  const saved = items.filter((i) => i.tab === fav).slice(0, 5);

  return (
    <div className="fixed inset-x-4 top-14 z-40 max-h-[calc(100vh-5rem)] w-auto overflow-y-auto rounded-card border border-border bg-surface shadow-card md:absolute md:inset-x-auto md:right-0 md:top-full md:z-10 md:mt-2 md:max-h-none md:w-96 md:overflow-visible">
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
            {apps.map((app) => <AppTile key={app.label} app={app} />)}
          </div>
        </>
      ) : (
        <div className="px-5 pb-4 pt-3">
          <div role="tablist" aria-label="Favorites" className="inline-flex gap-0.5 rounded-md bg-surface-subtle p-0.5">
            {(["apps", "content", "files"] as const).map((t) => (
              <button key={t} role="tab" aria-selected={fav === t} onClick={() => setFav(t)} className={cn("rounded px-3 py-0.5 text-xs font-semibold capitalize transition-colors", fav === t ? "bg-surface text-brand-navy shadow-[0_1px_2px_rgba(27,42,58,0.12)]" : "text-brand-navy/60 hover:text-brand-navy")}>
                {t}
              </button>
            ))}
          </div>
          <div className="mt-3 max-h-64 overflow-y-auto">
            {fav === "apps" ? (
              starred.length > 0 && <div className="grid grid-cols-3 gap-3">{starred.map((app) => <AppTile key={app.label} app={app} />)}</div>
            ) : (
              saved.map((item, i) => (
                <div key={item.id} className={cn("flex items-center gap-2.5 py-2 text-sm text-brand-navy", i > 0 && "border-t border-border")}>
                  <FileText className="h-7 w-7 shrink-0 rounded-md bg-brand-navy/10 p-1.5" />
                  <Link to={item.to ?? "/favorites"} className="min-w-0 flex-1 truncate hover:text-brand-link">{item.title}</Link>
                  <FavoriteButton item={item} className="h-6 w-6" />
                </div>
              ))
            )}
            {!(fav === "apps" ? starred : saved).length && (
              <p className="py-6 text-center text-sm text-brand-navy/55">
                No favorite {fav} yet.{" "}
                {fav === "apps" && <button onClick={() => setTab("apps")} className="font-semibold text-brand-link hover:underline">Browse apps</button>}
              </p>
            )}
          </div>
          <Link to={`/favorites?tab=${fav}`} className="mt-3 block text-right text-xs font-semibold text-brand-link hover:underline">View all</Link>
        </div>
      )}
    </div>
  );
}
