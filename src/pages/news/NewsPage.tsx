import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeaderBanner } from "../../components/ui/PageHeaderBanner";
import { NEWS_ITEMS } from "../../features/news/data";
import { NewsFilters } from "../../features/news/NewsFilters";
import { NewsRow } from "../../features/news/NewsRow";

const PAGE_SIZE = 8;

/** The News archive: every news item, newest first, with search and filters above the list. */
export function NewsPage() {
  const [query, setQuery] = useState("");
  const [categoryKey, setCategoryKey] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const text = query.trim().toLowerCase();
    return NEWS_ITEMS.filter(
      (item) =>
        (!categoryKey || item.categoryKey === categoryKey) &&
        (!text || `${item.title} ${item.description}`.toLowerCase().includes(text)),
    );
  }, [query, categoryKey]);

  // Any filter change starts the list again from the first page.
  const updateFilter = (apply: () => void) => {
    apply();
    setVisibleCount(PAGE_SIZE);
  };

  // Load the next batch when the marker under the list scrolls into view.
  const hasMore = visibleCount < matches.length;
  const marker = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = marker.current;
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisibleCount((count) => count + PAGE_SIZE),
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeaderBanner
        eyebrow="Archive"
        title="News"
        description="Announcements and updates from across L+M. Search or filter to find what you need."
      />

      <NewsFilters
        query={query}
        categoryKey={categoryKey}
        onQueryChange={(value) => updateFilter(() => setQuery(value))}
        onCategoryChange={(value) => updateFilter(() => setCategoryKey(value))}
      />

      <section aria-label="News list">
        <div className="border-t border-border">
          {matches.slice(0, visibleCount).map((item) => (
            <NewsRow key={item.id} item={item} />
          ))}
        </div>
        {matches.length === 0 && <p className="py-6 text-sm text-brand-navy/55">No news matches your filters.</p>}
        {hasMore && <div ref={marker} aria-hidden="true" className="h-8" />}
      </section>
    </div>
  );
}
