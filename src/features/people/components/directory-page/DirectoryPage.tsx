import { useState } from "react";
import { PageHeaderBanner } from "../../../../components/ui/PageHeaderBanner";
import { FACETS, PEOPLE } from "../../data";
import type { FilterKey, Person, SortKey } from "../../types";
import { DirectoryFilters } from "./DirectoryFilters";
import { DirectoryTools } from "./DirectoryTools";
import { Pager } from "./Pager";
import { PeopleTable } from "./PeopleTable";

const PAGE_SIZE = 14;

const sortValue = (person: Person, key: SortKey) =>
  key === "name" ? person.name : key === "company" ? FACETS.company(person) : key === "title" ? person.title : person.team;

/** The /people page: header, search and sort, filters, then the paged list. */
export function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [descending, setDescending] = useState(false);
  const [selected, setSelected] = useState<Partial<Record<FilterKey, string>>>({});
  const [page, setPage] = useState(1);

  // Temporary client-side filtering and sorting until people come from the backend.
  const shown = PEOPLE.filter((p) => `${p.name} ${p.title} ${p.team}`.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((p) => (Object.keys(selected) as FilterKey[]).every((key) => !selected[key] || FACETS[key](p) === selected[key]))
    .sort((a, b) => sortValue(a, sortKey).localeCompare(sortValue(b, sortKey)) * (descending ? -1 : 1) || a.name.localeCompare(b.name));

  const pages = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const current = Math.min(page, pages);

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

        <PeopleTable people={shown.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)} total={shown.length} />
        <Pager page={current} pages={pages} onChange={setPage} />
      </div>
    </div>
  );
}
