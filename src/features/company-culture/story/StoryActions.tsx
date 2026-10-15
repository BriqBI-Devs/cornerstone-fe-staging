import { MessageCircle, Share, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import type { StoryDetail } from "../data";
import { COMMENT_INPUT_ID } from "./comments/StoryCommentFeed";

const button =
  "flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-brand-navy/70 transition-colors hover:bg-surface hover:text-brand-link aria-pressed:text-brand-link";
const icon = "h-5 w-5 stroke-[1.5]";
const Divider = () => <span aria-hidden className="h-5 w-px bg-border" />;

const goToComments = () => {
  const input = document.getElementById(COMMENT_INPUT_ID);
  input?.scrollIntoView({ behavior: "smooth", block: "center" });
  input?.focus({ preventScroll: true });
};

export function StoryActions({ story }: { story: StoryDetail }) {
  // Local state only for now; the like and favourite requests go here once the backend exists.
  const [liked, setLiked] = useState(false);
  const [favourite, setFavourite] = useState(false);

  return (
    <div className="mt-10 flex items-center justify-center rounded-xl bg-surface-subtle p-1.5">
      <button type="button" onClick={() => setLiked(!liked)} aria-pressed={liked} aria-label="Like" className={button}>
        <ThumbsUp className={icon} fill={liked ? "currentColor" : "none"} />
        {story.likes + (liked ? 1 : 0)}
      </button>
      <Divider />
      <button type="button" onClick={goToComments} aria-label="Comments" className={button}>
        <MessageCircle className={icon} />
        {story.feed.length}
      </button>
      <Divider />
      <button type="button" onClick={() => setFavourite(!favourite)} aria-pressed={favourite} aria-label="Favourite" className={button}>
        <Star className={icon} fill={favourite ? "currentColor" : "none"} />
      </button>
      <Divider />
      <button type="button" aria-label="Share" className={button}>
        <Share className={icon} />
      </button>
    </div>
  );
}
