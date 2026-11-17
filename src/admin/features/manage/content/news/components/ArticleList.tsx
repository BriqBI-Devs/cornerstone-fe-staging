import { useState } from "react";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SearchInput } from "@/components/ui/SearchInput";
import { ARTICLES, CATEGORIES } from "../data";

export function ArticleList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const articles = ARTICLES.filter(
    (article) => (!category || article.category === category) && `${article.title} ${article.author}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search articles" className="w-full max-w-sm border border-admin-line bg-white" />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
          className="h-10 w-52 shrink-0 rounded-lg border border-admin-line bg-white px-3 text-sm outline-none focus:border-brand-link"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="divide-y divide-admin-line">
        {articles.map((article) => (
          <article key={article.title} className="flex items-center gap-4 py-5 first:pt-0 sm:gap-6">
            <PlaceholderImage label="thumb" className="h-[60px] w-24 shrink-0 sm:h-[76px] sm:w-[140px]" />
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-admin-tint px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-admin-tint-ink">{article.category}</span>
              <h3 className="mt-2 text-base font-bold leading-snug">{article.title}</h3>
              <p className="mt-2 text-xs text-admin-muted">
                By <span className="font-semibold text-brand-navy">{article.author}</span> · {article.date}
              </p>
            </div>
            <RowMenu label={article.title} />
          </article>
        ))}
        {articles.length === 0 && <p className="py-8 text-center text-sm text-admin-muted">No articles match.</p>}
      </div>
    </div>
  );
}
