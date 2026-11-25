import { CalendarDays, FileText } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SearchInput } from "@/components/ui/SearchInput";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { ContentFilters, type FilterField } from "./ContentFilters";
import { CreateContentMenu } from "./CreateContentMenu";
import { CATEGORIES, CONTENT, CONTENT_STATUSES, CONTENT_TYPES, DEPARTMENTS, statusSlug, type ContentStatus } from "../data";

/** Status shows as coloured text, not a badge. */
const STATUS_STYLE: Record<ContentStatus, string> = {
  Draft: "text-admin-muted",
  "Pending approval": "text-brand-link",
  Published: "text-admin-tint-ink",
  Unpublished: "text-admin-muted",
  Rejected: "text-admin-danger",
};

/** The two kinds of content: a page (News or Company + Culture) or an event. */
const KINDS = [
  { id: "page", label: "Page", icon: FileText },
  { id: "event", label: "Event", icon: CalendarDays },
];
const PAGE_TYPES = CONTENT_TYPES.filter((t) => t.id !== "event").map((t) => ({ value: t.id, label: t.label }));

/** Every category of every type, once each. */
const ALL_CATEGORIES = [...new Set(Object.values(CATEGORIES).flat())];

const filtersFor = (status: string): FilterField[] => [
  { key: "status", label: "Status", allLabel: "All statuses", defaultValue: status, options: CONTENT_STATUSES.map((s) => ({ value: s, label: s })) },
  { key: "department", label: "Department", allLabel: "All departments", options: DEPARTMENTS.map((d) => ({ value: d, label: d })) },
  { key: "category", label: "Category", allLabel: "All categories", options: ALL_CATEGORIES.map((c) => ({ value: c, label: c })) },
];

/** The Content list, for now a static listing. Only the page type cards in the filter panel and the status in the address (?status=pending-approval, used by the sidebar's Onboarding content link) filter anything. */
export function ContentList() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("");
  const [pageType, setPageType] = useState("");
  const [params] = useSearchParams();
  const status = CONTENT_STATUSES.find((s) => statusSlug(s) === params.get("status")) ?? "";
  const items = CONTENT.filter((item) => {
    const isPage = item.type !== "event";
    const kindMatch = !kind || (kind === "page" ? isPage && (!pageType || item.type === pageType) : !isPage);
    return kindMatch && (!status || item.status === status);
  });

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search content" className="w-full border border-admin-line bg-white sm:w-72" />
        <div className="ml-auto flex items-center gap-3">
          <ContentFilters
            key={status}
            tiles={KINDS}
            tile={kind}
            onTileChange={(id) => {
              setKind(id);
              setPageType("");
            }}
            pageType={kind === "page" ? { value: pageType, onChange: setPageType, options: PAGE_TYPES } : undefined}
            fields={filtersFor(status)}
            activeCount={(kind ? 1 : 0) + (pageType ? 1 : 0) + (status ? 1 : 0)}
            onReset={() => {
              setKind("");
              setPageType("");
            }}
          />
          <CreateContentMenu />
        </div>
      </div>

      <div className="divide-y divide-admin-line">
        {items.map((item) => (
          <article key={item.id} className="flex items-center gap-4 py-5 first:pt-0 sm:gap-6">
            <PlaceholderImage label="thumb" className="h-[60px] w-24 shrink-0 sm:h-[76px] sm:w-[140px]" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">
                <span className="text-admin-muted">{item.event ? `${item.date} · ${item.event.time}` : item.category}</span>
                <span className="text-admin-muted"> · </span>
                <span className={STATUS_STYLE[item.status]}>{item.status}</span>
              </p>
              <h3 className="mt-2 text-base font-bold leading-snug">{item.title}</h3>
              <p className="mt-2 text-xs text-admin-muted">
                {CONTENT_TYPES.find((t) => t.id === item.type)?.label} · {item.department || "Everyone"} ·{" "}
                {item.event ? (
                  <>
                    {item.event.location} · <span className="font-semibold text-brand-navy">{item.event.organizer}</span>
                  </>
                ) : (
                  <>
                    By <span className="font-semibold text-brand-navy">{item.author}</span> · {item.date}
                  </>
                )}
              </p>
            </div>
            <RowMenu label={item.title} />
          </article>
        ))}
      </div>
    </div>
  );
}
