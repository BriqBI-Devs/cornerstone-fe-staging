import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { categoryTitle, type Story } from "../data";
import { formatStoryDate } from "../format";

export function StoryHeader({ story }: { story: Story }) {
  const navigate = useNavigate();

  return (
    <header>
      <div className="mb-4 flex items-start gap-3 sm:mb-[18px] sm:items-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="mt-0.5 shrink-0 p-1 text-brand-navy/45 transition-colors hover:text-brand-link sm:mt-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <nav
          aria-label="Breadcrumb"
          className="min-w-0 text-[11px] font-bold uppercase leading-[1.7] tracking-[0.08em] text-brand-navy/45"
        >
          <Link to="/" className="hover:text-brand-link hover:underline">
            Cornerstone
          </Link>
          {" / "}
          <Link to="/company-culture" className="hover:text-brand-link hover:underline">
            Company + Culture
          </Link>
          {" / "}
          <span className="text-brand-navy">{categoryTitle(story.categoryKey)}</span>
        </nav>
      </div>

      <h1 className="mb-4 text-[22px] font-extrabold leading-[1.3] tracking-[-0.02em] sm:mb-[18px] sm:text-[28px]">{story.title}</h1>

      <div className="mb-5 flex items-center gap-3 sm:mb-7">
        <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-brand-navy text-[13px] font-bold text-white">
          {story.author.initials}
        </span>
        <div>
          <p className="text-[13.5px] font-bold">{story.author.name}</p>
          <p className="mt-0.5 text-xs text-brand-navy/45">
            Published {formatStoryDate(story.publishedAt)} · {story.readTime}
          </p>
        </div>
      </div>
    </header>
  );
}
