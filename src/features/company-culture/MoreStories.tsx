import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { SearchInput } from "../../components/ui/SearchInput";
import { CATEGORIES, feedStories } from "./data";
import { StoryRow } from "./StoryRow";

const PAGE_SIZE = 6;

export function MoreStories() {
  const [query, setQuery] = useState("");
  const [categoryKey, setCategoryKey] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const stories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return feedStories.filter(
      (story) =>
        (!categoryKey || story.categoryKey === categoryKey) &&
        (!normalized || `${story.title} ${story.description}`.toLowerCase().includes(normalized)),
    );
  }, [query, categoryKey]);

  // Any filter change starts the list again from the first page.
  const updateFilter = (apply: () => void) => {
    apply();
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section aria-label="More stories">
      <div className="border-t border-border pt-6">
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-[-0.01em] before:h-5 before:w-1 before:rounded-sm before:bg-brand-accent">
          More stories
        </h2>
        <p className="mt-1.5 text-sm text-brand-navy/60">
          Keep reading — older stories from every category, newest first.
        </p>
      </div>

      <div className="mb-2 mt-5 flex flex-wrap items-center gap-3 rounded-card bg-surface-subtle p-3">
        <SearchInput
          value={query}
          onChange={(value) => updateFilter(() => setQuery(value))}
          placeholder="Search stories"
          className="min-w-[200px] flex-1 border border-border bg-surface md:max-w-sm"
        />
        <div className="relative md:ml-auto">
          <select
            value={categoryKey}
            onChange={(event) => updateFilter(() => setCategoryKey(event.target.value))}
            aria-label="Filter by category"
            className="h-[38px] cursor-pointer appearance-none rounded-full border border-border bg-surface pl-4 pr-10 text-sm font-medium text-brand-navy outline-none transition-colors hover:border-brand-link focus-visible:ring-2 focus-visible:ring-brand-link"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((category) => (
              <option key={category.key} value={category.key}>
                {category.title}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/60" />
        </div>
      </div>

      <div className="border-t border-border">
        {stories.slice(0, visibleCount).map((story) => (
          <StoryRow key={story.slug} story={story} />
        ))}
      </div>

      {stories.length === 0 && <p className="py-6 text-sm text-brand-navy/55">No stories match your filters.</p>}

      {visibleCount < stories.length && (
        <div className="mt-[22px] text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-md border border-border bg-surface px-[26px] py-[11px] text-[13.5px] font-semibold text-brand-link transition-colors hover:border-brand-link hover:bg-brand-link/[0.08]"
          >
            Load more stories
          </button>
        </div>
      )}
    </section>
  );
}
