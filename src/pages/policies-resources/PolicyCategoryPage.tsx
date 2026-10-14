import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { SearchInput } from "../../components/ui/SearchInput";
import { RESOURCE_CATEGORIES, type ResourceItem } from "../../features/policies-resources/data";
import { ResourceRow } from "../../features/policies-resources/ResourceRow";

export function PolicyCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [query, setQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [folder, setFolder] = useState<ResourceItem | null>(null);

  const category = RESOURCE_CATEGORIES.find((c) => c.slug === categorySlug);
  const listing = folder?.items ?? category?.items ?? [];

  const items = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized
      ? listing.filter((item) => item.title.toLowerCase().includes(normalized))
      : listing;
    return [...filtered].sort((a, b) => {
      const cmp = a.title.localeCompare(b.title);
      return sortAscending ? cmp : -cmp;
    });
  }, [listing, query, sortAscending]);

  const openFolder = (next: ResourceItem | null) => {
    setFolder(next);
    setQuery("");
  };

  if (!category) {
    return (
      <div className="flex flex-col gap-4 py-6">
        <p className="text-sm text-brand-navy/60">That category couldn't be found.</p>
        <Link to="/policies-resources" className="text-sm font-semibold text-brand-link hover:underline">
          ← Back to Policies + Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-6">
      <h1 className="text-[28px] font-extrabold tracking-[-0.02em] text-brand-navy">{category.name}</h1>
      <p className="mt-2 max-w-[460px] text-sm leading-[1.6] text-brand-navy/60">{category.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <SearchInput value={query} onChange={setQuery} placeholder="Search files…" className="max-w-md flex-1" />
        <button
          type="button"
          onClick={() => setSortAscending((ascending) => !ascending)}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-brand-navy transition-colors hover:border-brand-link hover:bg-brand-link/[0.08]"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          Sort {sortAscending ? "A–Z" : "Z–A"}
        </button>
      </div>

      <nav aria-label="Folder path" className="mt-5 text-[13px] font-semibold text-brand-navy/60">
        <Link to="/policies-resources" className="hover:text-brand-link hover:underline">
          Policies + Resources
        </Link>
        {" / "}
        {folder ? (
          <button type="button" onClick={() => openFolder(null)} className="hover:text-brand-link hover:underline">
            {category.name}
          </button>
        ) : (
          <span className="text-brand-navy">{category.name}</span>
        )}
        {folder && (
          <>
            {" / "}
            <span className="text-brand-navy">{folder.title}</span>
          </>
        )}
      </nav>

      <Card className="mt-3 px-6 py-1">
        {items.length === 0 ? (
          <p className="py-4 text-sm text-brand-navy/55">No files match "{query}".</p>
        ) : (
          items.map((item) => (
            <ResourceRow
              key={item.title}
              item={item}
              onOpen={item.kind === "folder" ? () => openFolder(item) : undefined}
            />
          ))
        )}
      </Card>
    </div>
  );
}
