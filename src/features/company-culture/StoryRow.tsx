import { Link } from "react-router-dom";
import { CategoryLabel } from "./CategoryLabel";
import { storyHref, type Story } from "./data";
import { formatStoryDate } from "./format";

export function StoryRow({ story }: { story: Story }) {
  return (
    <article className="group relative flex gap-5 border-b border-border py-[18px]">
      <div className="h-[94px] w-[140px] shrink-0 overflow-hidden rounded-md bg-surface-subtle">
        <img src={story.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <CategoryLabel categoryKey={story.categoryKey} />
        <h3 className="mb-1.5 mt-1 text-base font-bold leading-[1.35]">
          <Link to={storyHref(story)} className="after:absolute after:inset-0 group-hover:text-brand-link">
            {story.title}
          </Link>
        </h3>
        <p className="mb-1.5 line-clamp-2 text-[13.5px] leading-[1.55] text-brand-navy/60">{story.description}</p>
        <span className="text-xs text-brand-navy/55">{formatStoryDate(story.publishedAt)}</span>
      </div>
    </article>
  );
}
