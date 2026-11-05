import { Check, MessageCircle, Share, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "../../../../lib/useFavorites";
// Same like bar and comment feed as the Company + Culture story page.
import { COMMENT_INPUT_ID, StoryCommentFeed } from "../../../company-culture/story/comments/StoryCommentFeed";
import { formatDate } from "../../helpers/format";
import type { EventItem } from "../../types";

const STARTING_LIKES = 8;

const button =
  "flex flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-sm font-semibold text-brand-navy/70 transition-colors hover:bg-surface hover:text-brand-link aria-pressed:text-brand-link sm:flex-none sm:px-6";
const icon = "h-5 w-5 stroke-[1.5]";
const Divider = () => <span aria-hidden className="h-5 w-px bg-border" />;

const goToComments = () => {
  const input = document.getElementById(COMMENT_INPUT_ID);
  input?.scrollIntoView({ behavior: "smooth", block: "center" });
  input?.focus({ preventScroll: true });
};

/** Like, comments, favourite and copy-link bar, then the comment feed (local state only). */
export function EventEngage({ event }: { event: EventItem }) {
  // Local state only for now; the like and favourite requests go here once the backend exists.
  const [liked, setLiked] = useState(false);
  const { has, toggle } = useFavorites();
  const favourite = has(`event-${event.id}`);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section aria-label="Reactions and comments" className="mt-10">
      <div className="relative flex w-full items-center justify-center rounded-xl bg-surface-subtle p-1.5">
        <button type="button" onClick={() => setLiked(!liked)} aria-pressed={liked} aria-label="Like" className={button}>
          <ThumbsUp className={icon} fill={liked ? "currentColor" : "none"} />
          {STARTING_LIKES + (liked ? 1 : 0)}
        </button>
        <Divider />
        <button type="button" onClick={goToComments} aria-label="Comments" className={button}>
          <MessageCircle className={icon} />0
        </button>
        <Divider />
        <button
          type="button"
          onClick={() =>
            toggle({
              id: `event-${event.id}`,
              tab: "apps",
              sub: "events",
              title: event.title,
              to: `/events/${event.id}`,
              image: event.image,
              date: [formatDate(event.date, { month: "short" }), String(Number(event.date.slice(8)))],
            })
          }
          aria-pressed={favourite}
          aria-label="Favourite"
          className={button}
        >
          <Star className={icon} fill={favourite ? "currentColor" : "none"} />
        </button>
        <Divider />
        <button type="button" onClick={copyLink} aria-label="Copy link" className={button}>
          {copied ? <Check className={icon} /> : <Share className={icon} />}
        </button>
        {copied && (
          <span role="status" className="absolute right-2 top-full mt-1.5 text-xs font-semibold text-brand-link">
            Link copied
          </span>
        )}
      </div>

      <StoryCommentFeed feed={[]} />
    </section>
  );
}
