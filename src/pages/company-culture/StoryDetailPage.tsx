import { Link, useParams } from "react-router-dom";
import { categoryTitle, getStoryDetail } from "../../features/company-culture/data";
import { StoryDetailView } from "../../features/company-culture/story/StoryDetailView";

const SECTION = { label: "Company + Culture", to: "/company-culture" };

export function StoryDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  // One call returns everything the page shows; swap it for the API request later.
  const story = getStoryDetail(slug);

  if (!story) {
    return (
      <div className="flex flex-col gap-4 py-6">
        <p className="text-sm text-brand-navy/60">That story couldn't be found.</p>
        <Link to={SECTION.to} className="text-sm font-semibold text-brand-link hover:underline">
          ← Back to {SECTION.label}
        </Link>
      </div>
    );
  }

  return <StoryDetailView story={story} section={SECTION} categoryTitle={categoryTitle(story.categoryKey)} />;
}
