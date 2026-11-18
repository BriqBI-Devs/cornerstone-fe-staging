import { useEffect, useRef, useState } from "react";
import { PageHeaderBanner } from "../../../../components/ui/PageHeaderBanner";
import { FACETS, PEOPLE } from "../../data";
import type { FilterKey, Person, SortKey } from "../../types";
import { DirectoryFilters } from "./DirectoryFilters";
import { DirectoryTools } from "./DirectoryTools";
import { PeopleTable } from "./PeopleTable";

const PAGE_SIZE = 14;

const sortValue = (person: Person, key: SortKey) =>
  key === "name" ? person.name : key === "company" ? FACETS.company(person) : key === "title" ? person.title : person.team;

/** The /people page: header, search and sort, filters, then the list, which loads more as you scroll. */
export function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [descending, setDescending] = useState(false);
  const [selected, setSelected] = useState<Partial<Record<FilterKey, string>>>({});
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Temporary client-side filtering and sorting until people come from the backend.
  const shown = PEOPLE.filter((p) => `${p.name} ${p.title} ${p.team}`.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((p) => (Object.keys(selected) as FilterKey[]).every((key) => !selected[key] || FACETS[key](p) === selected[key]))
    .sort((a, b) => sortValue(a, sortKey).localeCompare(sortValue(b, sortKey)) * (descending ? -1 : 1) || a.name.localeCompare(b.name));

  // Start over from the top whenever the search, sort or filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, sortKey, descending, selected]);

  // Load the next batch when the marker under the list scrolls into view.
  const hasMore = visibleCount < shown.length;
  const marker = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = marker.current;
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((count) => count + PAGE_SIZE);
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeaderBanner
        eyebrow="Directory"
        title="People"
        description="Find colleagues, see where they sit, and open their profile."
      />

      <div className="w-full">
        <DirectoryTools
          query={query}
          onQueryChange={setQuery}
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
          descending={descending}
          onDescendingChange={setDescending}
        />
        <DirectoryFilters
          selected={selected}
          onChange={(key, value) => setSelected({ ...selected, [key]: value })}
          onClear={() => setSelected({})}
        />

        <PeopleTable people={shown.slice(0, visibleCount)} total={shown.length} />
        {hasMore && (
          <div ref={marker} role="status" className="py-6 text-center text-sm text-brand-navy/60">
            Loading more people…
          </div>
        )}
      </div>
    </div>
  );
}
