import { Check, MessageCircle, Share, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "../../../lib/useFavorites";
import type { StoryDetail } from "../data";
import { storyHref } from "../data";
import { formatStoryDate } from "../format";
import { COMMENT_INPUT_ID } from "./comments/StoryCommentFeed";

const button =
  "flex flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-sm font-semibold text-brand-navy/70 transition-colors hover:bg-surface hover:text-brand-link aria-pressed:text-brand-link sm:flex-none sm:px-6";
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
  const { has, toggle } = useFavorites();
  const favourite = has(story.slug);
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-8 flex w-full items-center justify-center rounded-xl bg-surface-subtle p-1.5 sm:mt-10">
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
      <button type="button" onClick={() => toggle({ id: story.slug, tab: "content", sub: "pages", title: story.title, to: storyHref(story), meta: formatStoryDate(story.publishedAt), image: story.image, category: story.categoryKey })} aria-pressed={favourite} aria-label="Favourite" className={button}>
        <Star className={icon} fill={favourite ? "currentColor" : "none"} />
      </button>
      <Divider />
      <button type="button" onClick={copyLink} aria-label="Copy link" className={button}>
        {copied ? <Check className={icon} /> : <Share className={icon} />}
      </button>
      {copied && <span role="status" className="absolute right-2 top-full mt-1.5 text-xs font-semibold text-brand-link">Link copied</span>}
    </div>
  );
}
