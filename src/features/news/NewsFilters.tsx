import { ChevronDown } from "lucide-react";
import { SearchInput } from "../../components/ui/SearchInput";
import { NEWS_CATEGORIES } from "./data";

const DATE_RANGES = [
  { days: 0, label: "Any time" },
  { days: 7, label: "Last 7 days" },
  { days: 30, label: "Last 30 days" },
  { days: 90, label: "Last 90 days" },
];

interface NewsFiltersProps {
  query: string;
  categoryKey: string;
  days: number;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDaysChange: (value: number) => void;
}

/** Search and drop-downs above the news list, in the same style as Company + Culture. */
export function NewsFilters({ query, categoryKey, days, onQueryChange, onCategoryChange, onDaysChange }: NewsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-card bg-surface-subtle p-3">
      <SearchInput value={query} onChange={onQueryChange} placeholder="Search news" className="min-w-[200px] flex-1 border border-border bg-surface md:max-w-sm" />
      <div className="flex flex-wrap gap-3 md:ml-auto">
        <div className="relative">
          <select
            value={days}
            onChange={(event) => onDaysChange(Number(event.target.value))}
            aria-label="Filter by date"
            className="h-[38px] cursor-pointer appearance-none rounded-full border border-border bg-surface pl-4 pr-10 text-sm font-medium text-brand-navy outline-none transition-colors hover:border-brand-link focus-visible:ring-2 focus-visible:ring-brand-link"
          >
            {DATE_RANGES.map((range) => (
              <option key={range.days} value={range.days}>
                {range.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/60" />
        </div>
        <div className="relative">
          <select
            value={categoryKey}
            onChange={(event) => onCategoryChange(event.target.value)}
            aria-label="Filter by category"
            className="h-[38px] cursor-pointer appearance-none rounded-full border border-border bg-surface pl-4 pr-10 text-sm font-medium text-brand-navy outline-none transition-colors hover:border-brand-link focus-visible:ring-2 focus-visible:ring-brand-link"
          >
            <option value="">All categories</option>
            {NEWS_CATEGORIES.map((category) => (
              <option key={category.key} value={category.key}>
                {category.title}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/60" />
        </div>
      </div>
    </div>
  );
}
