import { Link } from "react-router-dom";
import { formatStoryDate } from "../company-culture/format";
import { newsCategoryTitle, newsHref, type NewsItem } from "./data";

/** One archive row: thumbnail, category, title, short summary and date. */
export function NewsRow({ item }: { item: NewsItem }) {
  return (
    <article className="group relative flex gap-3 border-b border-border py-4 sm:gap-5 sm:py-[18px]">
      <div className="h-[72px] w-[96px] shrink-0 overflow-hidden rounded-md bg-surface-subtle sm:h-[94px] sm:w-[140px]">
        <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-[0.025em] text-brand-link">{newsCategoryTitle(item.categoryKey)}</span>
        <h3 className="mb-1 mt-1 text-[15px] font-bold leading-[1.35] sm:mb-1.5 sm:text-base">
          <Link to={newsHref(item)} className="after:absolute after:inset-0 group-hover:text-brand-link">
            {item.title}
          </Link>
        </h3>
        <p className="mb-1.5 line-clamp-2 text-[13.5px] leading-[1.55] text-brand-navy/60 max-sm:hidden">{item.description}</p>
        <span className="text-xs text-brand-navy/55">{formatStoryDate(item.publishedAt)}</span>
      </div>
    </article>
  );
}
