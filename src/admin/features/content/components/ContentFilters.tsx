import { ChevronDown, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useClickOutside } from "@/lib/useClickOutside";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField {
  key: string;
  label: string;
  /** Text for the "everything" choice, e.g. "All statuses". */
  allLabel: string;
  /** The choice selected when the panel opens. */
  defaultValue?: string;
  options: FilterOption[];
}

export interface FilterTile {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ContentFiltersProps {
  /** The main filter: one card per kind of content. Clicking the selected card clears it. */
  tiles: FilterTile[];
  tile: string;
  onTileChange: (id: string) => void;
  /** The page type (News, Company + Culture). Only given while Page is the selected card. */
  pageType?: { value: string; onChange: (value: string) => void; options: FilterOption[] };
  /** The dropdowns below. For now they only show their choices. */
  fields: FilterField[];
  /** Shown on the button so a filter set inside the panel is still visible. */
  activeCount: number;
  onReset: () => void;
}

const selectClass = "h-10 w-full rounded-lg border border-admin-line bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-link";

/** The Filters button and its panel: the kind of content as cards, then the details. */
export function ContentFilters({ tiles, tile, onTileChange, pageType, fields, activeCount, onReset }: ContentFiltersProps) {
  const [open, setOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-admin-line bg-white px-3 text-sm hover:border-brand-navy/40"
      >
        {activeCount ? `Filters (${activeCount})` : "Filters"}
        <ChevronDown className="size-4 text-admin-muted" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1 w-[360px] max-w-[calc(100vw-32px)] rounded-lg border border-admin-line bg-white shadow-lg">
          <div className="flex items-center justify-between px-4 pb-1 pt-4">
            <h3 className="text-base font-bold">Filters</h3>
            <button
              type="button"
              onClick={() => {
                onReset();
                setResetKey((key) => key + 1);
              }}
              className="text-sm text-brand-link hover:underline"
            >
              Reset all
            </button>
          </div>

          <div className="space-y-5 px-4 pb-4 pt-3">
            <section>
              <h4 className="mb-2 text-xs font-semibold text-admin-muted">Show</h4>
              <div className="grid grid-cols-2 gap-2">
                {tiles.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={tile === id}
                    onClick={() => onTileChange(tile === id ? "" : id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg border py-3 text-sm font-medium transition-colors",
                      tile === id ? "border-brand-navy bg-admin-tint font-semibold text-brand-navy" : "border-admin-line text-admin-muted hover:border-brand-navy/40 hover:text-brand-navy",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-2 gap-x-3 gap-y-3">
              {pageType && (
                <label className="col-span-2 grid gap-1 text-xs font-semibold text-admin-muted">
                  Page type
                  <select value={pageType.value} onChange={(event) => pageType.onChange(event.target.value)} className={selectClass}>
                    <option value="">All page types</option>
                    {pageType.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {fields.map((field) => (
                <label key={`${field.key}${resetKey}`} className="col-span-2 grid gap-1 text-xs font-semibold text-admin-muted">
                  {field.label}
                  <select defaultValue={resetKey ? "" : (field.defaultValue ?? "")} className={selectClass}>
                    <option value="">{field.allLabel}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
