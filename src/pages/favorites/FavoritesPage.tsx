import { CalendarDays, FileText, Star } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchInput } from "../../components/ui/SearchInput";
import { cn } from "../../lib/cn";
import { useFavorites, type FavItem as Item, type FavSub as Sub, type FavTab as Tab } from "../../lib/useFavorites";
import { CategoryLabel } from "../../features/company-culture/CategoryLabel";


const TABS: { key: Tab; label: string }[] = [{ key: "content", label: "Content" }, { key: "apps", label: "Apps" }, { key: "files", label: "Files" }];
const SUBS: { key: Sub; label: string; Icon: typeof FileText }[] = [{ key: "pages", label: "Pages", Icon: FileText }, { key: "events", label: "Events", Icon: CalendarDays }];

function Row({ item, card, onRemove }: { item: Item; card?: boolean; onRemove: () => void }) {
  const lead = item.date ? (
    <div className="flex w-14 shrink-0 flex-col items-center rounded-card bg-brand-navy py-1.5 text-white">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-accent">{item.date[0]}</span>
      <span className="text-lg font-bold leading-none">{item.date[1]}</span>
    </div>
  ) : item.image ? (
    <img src={item.image} alt="" loading="lazy" className={card ? "h-10 w-10 shrink-0 rounded-md border border-border bg-white object-contain p-1" : "h-[72px] w-24 shrink-0 rounded-md object-cover sm:h-[84px] sm:w-32"} />
  ) : (
    <FileText className="h-10 w-10 shrink-0 rounded-md bg-surface-subtle p-2.5 text-brand-navy/70" />
  );
  return (
    <div className={cn("group relative flex items-center gap-3 sm:gap-4", card ? "rounded-card border border-border bg-surface p-3 transition-colors hover:border-brand-navy/40 hover:bg-surface-subtle" : "border-b border-border py-4")}>
      {lead}
      <div className="min-w-0 flex-1">
        {item.category && <CategoryLabel categoryKey={item.category} />}
        <Link to={item.to ?? "#"} className="block truncate text-[15px] font-bold after:absolute after:inset-0 group-hover:text-brand-link">{item.title}</Link>
        {item.meta && <p className="mt-0.5 truncate text-xs text-brand-navy/55">{item.meta}</p>}
      </div>
      <button type="button" onClick={onRemove} aria-label={`Remove ${item.title} from favorites`} title="Remove from favorites" className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-brand-accent hover:bg-surface-subtle">
        <Star className="h-[18px] w-[18px]" fill="currentColor" />
      </button>
    </div>
  );
}

export function FavoritesPage() {
  // The tab lives in the URL (?tab=apps&sub=events) so it can be linked to; unknown values fall back to the defaults.
  const [params, setParams] = useSearchParams();
  const tab = TABS.find((t) => t.key === params.get("tab"))?.key ?? "content";
  const sub = SUBS.find((x) => x.key === params.get("sub"))?.key ?? "pages";
  const setTab = (t: Tab) => setParams({ tab: t }, { replace: true });
  const setSub = (x: Sub) => setParams({ tab: "content", sub: x }, { replace: true });
  const [query, setQuery] = useState("");
  const { items: live, remove } = useFavorites();

  const q = query.trim().toLowerCase();
  const shown = live.filter((i) => i.tab === tab && (tab !== "content" || i.sub === sub) && i.title.toLowerCase().includes(q));

  return (
    <div className="flex flex-col gap-6 pb-8 pt-2">
      <header>
        <h1 className="flex items-center gap-2.5 text-[28px] font-extrabold tracking-[-0.02em] before:h-6 before:w-1 before:rounded-sm before:bg-brand-accent">Favorites</h1>
        <p className="mt-2 max-w-[520px] text-sm leading-[1.6] text-brand-navy/60">Everything you have starred, in one place. Star anything across Cornerstone to find it here.</p>
      </header>

      <div role="tablist" aria-label="Favorites" className="flex gap-6 overflow-x-auto border-b border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => (
          <button key={t.key} id={`tab-${t.key}`} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)} className={cn("-mb-px flex shrink-0 items-center gap-2 border-b-[3px] px-1 pb-3 text-sm font-semibold transition-colors", tab === t.key ? "border-brand-accent text-brand-navy" : "border-transparent text-brand-navy/55 hover:text-brand-navy")}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search favorites" className="w-full border border-border bg-surface sm:min-w-[260px] sm:max-w-sm sm:flex-1" />
        {tab === "content" && (
          <div role="tablist" aria-label="Content type" className="inline-flex gap-1 rounded-card border border-border bg-surface-subtle p-1">
            {SUBS.map(({ key, label, Icon }) => (
              <button key={key} role="tab" aria-selected={sub === key} onClick={() => setSub(key)} className={cn("flex items-center gap-2 rounded-md px-4 py-1.5 text-[13px] font-semibold transition-colors", sub === key ? "bg-surface text-brand-navy shadow-[0_1px_2px_rgba(27,42,58,0.12)]" : "text-brand-navy/60 hover:text-brand-navy")}>
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {shown.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <Star className="mx-auto h-8 w-8 text-brand-navy/25" />
          <p className="mt-3 text-sm font-semibold">{q ? "No favorites match your search" : "Nothing here yet"}</p>
          <p className="mt-1 text-sm text-brand-navy/60">Star an item anywhere in Cornerstone and it will show up here.</p>
          {q && <button type="button" onClick={() => setQuery("")} className="mt-4 rounded-md border border-border bg-surface px-4 py-2 text-[13px] font-semibold text-brand-link hover:border-brand-link">Clear search</button>}
        </div>
      ) : (
        <div id="fav-panel" role="tabpanel" className={tab === "apps" ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" : "border-t border-border"}>
          {shown.map((item) => <Row key={item.id} item={item} card={tab === "apps"} onRemove={() => remove(item.id)} />)}
        </div>
      )}
    </div>
  );
}
