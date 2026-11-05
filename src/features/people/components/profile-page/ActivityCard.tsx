import { Lock } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../../lib/cn";
import type { ActivityItem } from "../../types";

type Tab = "published" | "mentioned";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

// Content links go to the real pages once the backend and SharePoint are connected.
const stub = (e: React.MouseEvent) => e.preventDefault();

interface ActivityCardProps {
  published: ActivityItem[];
  mentioned: ActivityItem[];
}

/** What the person published and where they are mentioned, newest first or oldest first. */
export function ActivityCard({ published, mentioned }: ActivityCardProps) {
  const [tab, setTab] = useState<Tab>("mentioned");
  const [latestFirst, setLatestFirst] = useState(true);

  const lists = { published, mentioned };
  const items = [...lists[tab]].sort((a, b) => (latestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));

  return (
    <section aria-label="Activity" className="rounded-xl border border-border bg-white p-5 sm:p-6">
      <div className="-mt-1.5 mb-1.5 flex gap-1 border-b border-border" role="tablist" aria-label="Activity">
        {(["mentioned", "published"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "relative inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold capitalize text-brand-navy/60 hover:text-brand-navy",
              tab === key && "text-brand-navy after:absolute after:inset-x-2.5 after:-bottom-px after:h-[3px] after:rounded-t after:bg-brand-accent",
            )}
          >
            {key}
            <em className="inline-grid h-5 min-w-[22px] place-items-center rounded-full bg-[#eef2f8] px-[7px] text-xs font-bold not-italic text-brand-navy">
              {lists[key].length}
            </em>
          </button>
        ))}
      </div>

      <div className="mt-1.5 flex justify-end text-sm text-brand-navy/60">
        <label>
          Sort by:{" "}
          <select
            value={latestFirst ? "latest" : "oldest"}
            onChange={(e) => setLatestFirst(e.target.value === "latest")}
            className="cursor-pointer bg-transparent font-semibold text-brand-navy"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-brand-navy/60">Nothing {tab} yet.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.title} className="flex items-center gap-4 border-b border-border py-3.5 last:border-b-0">
              <a href="#" onClick={stub} aria-label={item.title} className="block h-[60px] w-24 shrink-0 overflow-hidden rounded-lg bg-[#eef2f8] sm:h-[74px] sm:w-[132px]">
                <img src={item.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-200 hover:scale-105" />
              </a>
              <div>
                <a href="#" onClick={stub} className="text-base font-bold hover:text-brand-link hover:underline hover:underline-offset-[3px]">
                  {item.title}
                </a>
                <p className="mt-1.5 text-xs text-brand-navy/60">
                  In{" "}
                  <a href="#" onClick={stub} className="inline-flex items-center gap-1 text-brand-link hover:underline">
                    {item.locked && <Lock className="size-3" />}
                    {item.site}
                  </a>{" "}
                  on {formatDate(item.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
