import type { StoryDetail } from "../data";
import { StoryCommentFeed } from "./comments/StoryCommentFeed";
import { StoryActions } from "./StoryActions";
import { StoryBody } from "./StoryBody";
import { StoryFeedback } from "./StoryFeedback";
import { StoryHeader } from "./StoryHeader";
import { StoryHero } from "./StoryHero";
import { StoryTopics } from "./StoryTopics";

export interface StorySection {
  /** Name and address of the section the story belongs to, for the breadcrumb. */
  label: string;
  to: string;
}

interface StoryDetailViewProps {
  story: StoryDetail;
  section: StorySection;
  /** Shown last in the breadcrumb. */
  categoryTitle: string;
}

/** The story page itself, shared by Company + Culture and News. */
export function StoryDetailView({ story, section, categoryTitle }: StoryDetailViewProps) {
  return (
    // Full-width grey backdrop with a white page box floating in the middle.
    <div className="relative left-1/2 -my-6 -ml-[50vw] w-screen bg-surface-subtle py-8">
      <div className="mx-auto max-w-[1180px] rounded-xl bg-surface px-4 py-10 shadow-[0_1px_2px_rgba(27,42,58,0.06),0_12px_32px_-8px_rgba(27,42,58,0.12)] md:px-10">
        <article className="mx-auto max-w-[840px]">
          <StoryHeader story={story} section={section} categoryTitle={categoryTitle} />
          <StoryHero story={story} />
          <StoryBody story={story} />
          <StoryTopics story={story} />
          <div className="mt-8 flex justify-end">
            <StoryFeedback />
          </div>
        </article>
        <StoryActions story={story} />
        <StoryCommentFeed feed={story.feed} />
      </div>
    </div>
  );
}
