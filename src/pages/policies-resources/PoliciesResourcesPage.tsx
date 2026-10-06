import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { SearchInput } from "../../components/ui/SearchInput";
import { RESOURCE_CATEGORIES } from "../../features/policies-resources/data";

const INITIAL_VISIBLE_COUNT = 8;

export function PoliciesResourcesPage() {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filteredCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return RESOURCE_CATEGORIES;
    return RESOURCE_CATEGORIES.filter(
      (category) =>
        category.name.toLowerCase().includes(normalized) ||
        category.description.toLowerCase().includes(normalized),
    );
  }, [query]);

  const isSearching = query.trim().length > 0;
  const visibleCategories = isSearching ? filteredCategories : filteredCategories.slice(0, visibleCount);
  const hasMore = !isSearching && visibleCount < filteredCategories.length;

  return (
    <div className="flex flex-col gap-8 py-6">
      <div>
        <h1 className="mb-[10px] text-[32px] font-extrabold tracking-[-0.02em] text-brand-navy">
          Policies + Resources
        </h1>
        <p className="max-w-[460px] text-sm leading-[1.6] text-brand-navy/60">
          Help centers, brand resources, and the policies that keep L+M running — HR, safety, IT, and
          facilities guidance in one place.
        </p>
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search policies and resources…"
        className="max-w-md"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((category) => (
          <Card key={category.slug} className="flex flex-col p-6">
            <h2 className="mb-4 text-[15.5px] font-bold text-brand-navy">{category.name}</h2>
            <p className="mb-5 flex-1 text-[13.5px] leading-[1.55] text-brand-navy/60">
              {category.description}
            </p>
            <Link
              to={`/policies-resources/${category.slug}`}
              className="inline-flex w-fit items-center gap-2 self-start rounded-md border border-border bg-surface px-5 py-[9px] text-[12.5px] font-semibold text-brand-link transition-colors hover:border-brand-link hover:bg-brand-link/[0.08]"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Card>
        ))}
      </div>

      {visibleCategories.length === 0 && (
        <p className="text-sm text-brand-navy/55">No categories match "{query}".</p>
      )}

      {hasMore && (
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE_COUNT)}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-[30px] py-[11px] text-[12.5px] font-semibold text-brand-link transition-colors hover:border-brand-link hover:bg-brand-link/[0.08]"
          >
            Load more
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
