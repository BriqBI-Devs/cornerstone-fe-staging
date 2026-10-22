import { Link } from "react-router-dom";
import { CategoryLabel } from "./CategoryLabel";
import { storyHref, type Story } from "./data";
import { formatStoryDate } from "./format";

export function StoryRow({ story }: { story: Story }) {
  return (
    <article className="group relative flex gap-3 border-b border-border py-4 sm:gap-5 sm:py-[18px]">
      <div className="h-[72px] w-[96px] shrink-0 overflow-hidden rounded-md bg-surface-subtle sm:h-[94px] sm:w-[140px]">
        <img src={story.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <CategoryLabel categoryKey={story.categoryKey} />
        <h3 className="mb-1 mt-1 text-[15px] font-bold leading-[1.35] sm:mb-1.5 sm:text-base">
          <Link to={storyHref(story)} className="after:absolute after:inset-0 group-hover:text-brand-link">
            {story.title}
          </Link>
        </h3>
        <p className="mb-1.5 line-clamp-2 text-[13.5px] leading-[1.55] text-brand-navy/60 max-sm:hidden">{story.description}</p>
        <span className="text-xs text-brand-navy/55">{formatStoryDate(story.publishedAt)}</span>
      </div>
    </article>
  );
}
