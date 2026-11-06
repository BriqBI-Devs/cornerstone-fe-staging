import { ChevronDown } from "lucide-react";
import { FACETS, FILTERS, PEOPLE } from "../../data";
import type { FilterKey } from "../../types";

interface DirectoryFiltersProps {
  selected: Partial<Record<FilterKey, string>>;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
}

/** One dropdown per filter, filled from the values people actually have. */
export function DirectoryFilters({ selected, onChange, onClear }: DirectoryFiltersProps) {
  const anySelected = Object.values(selected).some(Boolean);

  return (
    <div className="relative mb-[26px] grid gap-3 sm:grid-cols-3">
      {FILTERS.map(([key, label]) => (
        <label key={key} className="grid min-w-0 gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-brand-navy/60">
          {label}
          <span className="relative">
            <select
              value={selected[key] ?? ""}
              onChange={(e) => onChange(key, e.target.value)}
              className="h-[46px] w-full appearance-none rounded-lg border border-border bg-surface-subtle pl-3.5 pr-10 text-sm font-semibold normal-case tracking-normal text-brand-navy outline-none focus:border-brand-accent focus:shadow-[0_0_0_3px_rgba(245,197,24,0.18)]"
            >
              <option value="">Any</option>
              {[...new Set(PEOPLE.map(FACETS[key]))].sort().map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-navy/60" />
          </span>
        </label>
      ))}
      {anySelected && (
        <button type="button" onClick={onClear} className="absolute right-0 top-0 text-xs font-bold text-brand-link hover:underline">
          Clear filters
        </button>
      )}
    </div>
  );
}
