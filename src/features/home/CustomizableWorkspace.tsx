import { Clock, FileText, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useFavorites, type FavTab } from "../../lib/useFavorites";
import { Card } from "../../components/ui/Card";

const RECENT = [
  "Q3 headcount review",
  "Benefits enrollment guide",
  "Fulton Park site plans",
  "New hire onboarding checklist",
  "Q3 town hall slides",
];

const TABS: FavTab[] = ["apps", "content", "files"];

export function CustomizableWorkspace() {
  const { items } = useFavorites();
  const [tab, setTab] = useState<FavTab>("apps");
  const shown = items.filter((i) => i.tab === tab);
  return (
    <Card className="border-t-2 border-t-brand-accent">
      <h2 className="text-base font-semibold text-brand-navy">My workspace</h2>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <div role="tablist" aria-label="Favorites" className="flex h-5 items-center gap-3 text-xs font-semibold uppercase tracking-wide">
            <Star className="h-3 w-3 text-brand-navy/55" />
            {TABS.map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("border-b-2 pb-0.5 uppercase", tab === t ? "border-brand-accent text-brand-navy" : "border-transparent text-brand-navy/55 hover:text-brand-navy")}>
                {t}
              </button>
            ))}
            <Link to={`/favorites?tab=${tab}`} className="ml-auto normal-case tracking-normal text-brand-link hover:underline">View all</Link>
          </div>
          {tab === "apps" ? (
            <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-3">
              {shown.slice(0, 5).map((fav) => (
                <Link key={fav.id} to={fav.to ?? "/favorites"} className="flex flex-col items-center gap-1.5 rounded-card border border-border p-2 text-center transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-card">
                  <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
                    {fav.image ? <img src={fav.image} alt="" className="h-full w-full object-contain p-1" /> : <FileText className="h-4 w-4 text-brand-navy/70" />}
                  </span>
                  <span className="w-full truncate text-xs font-medium text-brand-navy">{fav.title}</span>
                </Link>
              ))}
              {!shown.length && <p className="col-span-full text-sm text-brand-navy/55">No favorite apps yet</p>}
            </div>
          ) : (
            <div className="mt-3">
              {shown.slice(0, 5).map((fav, i) => (
                <Link key={fav.id} to={fav.to ?? "/favorites"} className={cn("-mx-2 flex items-center gap-2.5 rounded-card px-2 py-2 text-sm text-brand-navy transition-colors hover:bg-surface-subtle", i > 0 && "border-t border-border")}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-navy/10 text-brand-navy">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{fav.title}</span>
                </Link>
              ))}
              {!shown.length && <p className="text-sm text-brand-navy/55">No favorite {tab} yet</p>}
            </div>
          )}
        </div>

        <div>
          <p className="flex h-5 items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-navy/55">
            <Clock className="h-3 w-3" /> Recently visited
          </p>
          <div className="mt-3">
            {RECENT.map((item, i) => (
              <a
                key={item}
                href="#"
                className={cn(
                  "-mx-2 flex items-center gap-2.5 rounded-card px-2 py-2 text-sm text-brand-navy transition-colors hover:bg-surface-subtle",
                  i > 0 && "border-t border-border",
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-navy/10 text-brand-navy">
                  <FileText className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">{item}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
