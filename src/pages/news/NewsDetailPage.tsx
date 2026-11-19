import { Link, useParams } from "react-router-dom";
import { StoryDetailView } from "../../features/company-culture/story/StoryDetailView";
import { getNewsDetail, newsCategoryTitle } from "../../features/news/data";

const SECTION = { label: "News", to: "/news" };

export function NewsDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const story = getNewsDetail(id);

  if (!story) {
    return (
      <div className="flex flex-col gap-4 py-6">
        <p className="text-sm text-brand-navy/60">That news item couldn't be found.</p>
        <Link to={SECTION.to} className="text-sm font-semibold text-brand-link hover:underline">
          ← Back to {SECTION.label}
        </Link>
      </div>
    );
  }

  return <StoryDetailView story={story} section={SECTION} categoryTitle={newsCategoryTitle(story.categoryKey)} />;
}
