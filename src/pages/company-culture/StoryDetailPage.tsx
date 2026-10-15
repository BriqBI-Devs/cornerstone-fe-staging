import { Link, useParams } from "react-router-dom";
import { getStoryDetail } from "../../features/company-culture/data";
import { RelatedStories } from "../../features/company-culture/story/RelatedStories";
import { StoryActions } from "../../features/company-culture/story/StoryActions";
import { StoryCommentFeed } from "../../features/company-culture/story/comments/StoryCommentFeed";
import { StoryBody } from "../../features/company-culture/story/StoryBody";
import { StoryFeedback } from "../../features/company-culture/story/StoryFeedback";
import { StoryHeader } from "../../features/company-culture/story/StoryHeader";
import { StoryHero } from "../../features/company-culture/story/StoryHero";
import { StoryTopics } from "../../features/company-culture/story/StoryTopics";

export function StoryDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  // One call returns everything the page shows; swap it for the API request later.
  const story = getStoryDetail(slug);

  if (!story) {
    return (
      <div className="flex flex-col gap-4 py-6">
        <p className="text-sm text-brand-navy/60">That story couldn't be found.</p>
        <Link to="/company-culture" className="text-sm font-semibold text-brand-link hover:underline">
          ← Back to Company + Culture
        </Link>
      </div>
    );
  }

  return (
    // Full-width grey backdrop with a white page box floating in the middle.
    <div className="relative left-1/2 -my-6 -ml-[50vw] w-screen bg-surface-subtle py-8">
      <div className="mx-auto max-w-[1180px] rounded-xl bg-surface px-4 py-10 shadow-[0_1px_2px_rgba(27,42,58,0.06),0_12px_32px_-8px_rgba(27,42,58,0.12)] md:px-10">
        <article className="mx-auto max-w-[840px]">
          <StoryHeader story={story} />
          <StoryHero story={story} />
          <StoryBody story={story} />
          <StoryTopics story={story} />
          <div className="mt-8 flex justify-end">
            <StoryFeedback />
          </div>
        </article>
        <RelatedStories stories={story.related} />
        <StoryActions story={story} />
        <StoryCommentFeed feed={story.feed} />
      </div>
    </div>
  );
}
