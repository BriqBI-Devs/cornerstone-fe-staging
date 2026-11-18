import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SearchInput } from "@/components/ui/SearchInput";
import { CATEGORIES, STORIES } from "../data";

export function StoryList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const stories = STORIES.filter(
    (story) => (!category || story.category === category) && `${story.title} ${story.author}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search stories" className="mr-auto w-full max-w-sm border border-admin-line bg-white" />
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
        <Button className="h-10 shrink-0 px-4">Create story</Button>
      </div>

      <div className="divide-y divide-admin-line">
        {stories.map((story) => (
          <article key={story.title} className="flex items-center gap-4 py-5 first:pt-0 sm:gap-6">
            <PlaceholderImage label="thumb" className="h-[60px] w-24 shrink-0 sm:h-[76px] sm:w-[140px]" />
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-admin-tint px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-admin-tint-ink">{story.category}</span>
              <h3 className="mt-2 text-base font-bold leading-snug">{story.title}</h3>
              <p className="mt-2 text-xs text-admin-muted">
                By <span className="font-semibold text-brand-navy">{story.author}</span> · {story.date}
              </p>
            </div>
            <RowMenu label={story.title} />
          </article>
        ))}
        {stories.length === 0 && <p className="py-8 text-center text-sm text-admin-muted">No stories match.</p>}
      </div>
    </div>
  );
}
