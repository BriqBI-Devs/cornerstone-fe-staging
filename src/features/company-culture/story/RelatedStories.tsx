import { Link } from "react-router-dom";
import { categoryTitle, storyHref, type Story } from "../data";
import { formatStoryDate } from "../format";

export function RelatedStories({ stories }: { stories: Story[] }) {
  return (
    <section aria-label="Related content" className="mt-12 border-t border-border pt-8">
      <h2 className="mb-4 text-sm font-bold">Related content</h2>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
        {stories.map((story) => (
          <Link key={story.slug} to={storyHref(story)} className="group">
            <div className="aspect-[16/10] overflow-hidden rounded-lg bg-surface-subtle">
              <img src={story.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="mt-2.5 line-clamp-2 text-[13.5px] font-bold leading-[1.4] group-hover:underline">
              {story.title}
            </p>
            <p className="mt-1.5 text-[11.5px] text-brand-navy/45">
              In <span className="font-semibold text-brand-link">{categoryTitle(story.categoryKey)}</span> on{" "}
              {formatStoryDate(story.publishedAt)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
