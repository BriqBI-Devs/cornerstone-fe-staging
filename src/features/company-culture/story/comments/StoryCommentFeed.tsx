import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Avatar } from "../../../../components/ui/Avatar";
import type { Comment } from "../../data";
import { CommentFeedCard } from "./CommentFeedCard";

const CURRENT_USER = "Jordan Davis";

export const COMMENT_INPUT_ID = "story-comment-input";

export function StoryCommentFeed({ feed }: { feed: Comment[] }) {
  // Local state only for now; loading, posting and liking comments go here once the backend exists.
  const [comments, setComments] = useState(feed);
  const [liked, setLiked] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [byReactions, setByReactions] = useState(false);

  const shown = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return comments
      .filter((comment) => `${comment.author} ${comment.text}`.toLowerCase().includes(normalized))
      .sort((a, b) => (byReactions ? b.reactions - a.reactions : b.postedAt.localeCompare(a.postedAt)));
  }, [comments, query, byReactions]);

  const post = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    const comment = { id: `new-${Date.now()}`, author: CURRENT_USER, postedAt: new Date().toISOString(), text: draft.trim(), reactions: 0 };
    setComments([comment, ...comments]);
    setDraft("");
  };

  const toggleLike = (id: string) => setLiked(liked.includes(id) ? liked.filter((item) => item !== id) : [...liked, id]);

  return (
    <section aria-label="Comments" className="mt-6 rounded-xl bg-surface-subtle px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-[700px] flex-col gap-4">
        <form onSubmit={post} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
          <Avatar name={CURRENT_USER} />
          <input
            id={COMMENT_INPUT_ID}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Share your thoughts or questions…"
            aria-label="Write a comment"
            className="w-full bg-transparent text-sm outline-none placeholder:text-brand-navy/50"
          />
        </form>

        <div className="flex items-center justify-between gap-3 text-[13px]">
          <label className="flex items-center gap-1.5">
            <Search className="h-4 w-4 text-brand-navy/60" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search feed"
              aria-label="Search feed"
              className="w-32 bg-transparent outline-none placeholder:text-brand-navy"
            />
          </label>
          <label className="relative flex items-center gap-1">
            Sort by
            <select
              value={byReactions ? "reactions" : "date"}
              onChange={(event) => setByReactions(event.target.value === "reactions")}
              className="cursor-pointer appearance-none bg-transparent pr-4 font-semibold outline-none"
            >
              <option value="date">Post date</option>
              <option value="reactions">Most reactions</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5" />
          </label>
        </div>

        {shown.map((comment) => (
          <CommentFeedCard
            key={comment.id}
            comment={comment}
            liked={liked.includes(comment.id)}
            onToggleLike={() => toggleLike(comment.id)}
            currentUser={CURRENT_USER}
          />
        ))}

        <p className="pt-2 text-center text-xs text-brand-navy/60">{shown.length === 0 ? "No comments yet" : "End of results"}</p>
      </div>
    </section>
  );
}
