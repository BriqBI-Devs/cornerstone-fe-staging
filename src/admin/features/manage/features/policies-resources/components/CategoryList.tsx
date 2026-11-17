import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { SearchInput } from "@/components/ui/SearchInput";
import { CATEGORIES } from "../data";

export function CategoryList() {
  const [query, setQuery] = useState("");
  // Only categories with an access team are listed. The featured one sits on top, as the wide card does on the site; the rest are A to Z.
  const categories = CATEGORIES.filter((category) => category.access && `${category.name} ${category.description}`.toLowerCase().includes(query.trim().toLowerCase())).sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
  );

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search categories" className="w-full max-w-sm border border-admin-line bg-white" />
        <Button className="h-10 shrink-0 px-4">Create category</Button>
      </div>

      <div className="divide-y divide-admin-line">
        {categories.map((category) => (
          <article key={category.name} className="flex items-center gap-4 py-5 first:pt-0 sm:gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold leading-snug">{category.name}</h3>
                {category.featured && (
                  <span className="rounded-full bg-admin-tint px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-admin-tint-ink">Featured</span>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-admin-muted">{category.description}</p>
              <p className="mt-2 text-xs text-admin-muted">
                Editors: <span className="font-semibold text-brand-navy">{category.access}</span>
              </p>
            </div>
            <RowMenu label={category.name} />
          </article>
        ))}
        {categories.length === 0 && <p className="py-8 text-center text-sm text-admin-muted">No categories match.</p>}
      </div>
    </div>
  );
}
