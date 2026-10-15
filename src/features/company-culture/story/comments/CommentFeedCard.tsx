import { ThumbsUp } from "lucide-react";
import { Avatar } from "../../../../components/ui/Avatar";
import type { Comment } from "../../data";
import { formatCommentDate } from "../../format";

interface CommentFeedCardProps {
  comment: Comment;
  liked: boolean;
  onToggleLike: () => void;
  currentUser: string;
}

export function CommentFeedCard({ comment, liked, onToggleLike, currentUser }: CommentFeedCardProps) {
  const reactions = comment.reactions + (liked ? 1 : 0);

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <Avatar name={comment.author} size="sm" />
          <div>
            <p className="text-[13px] font-bold">{comment.author}</p>
            <p className="text-xs text-brand-navy/55">{formatCommentDate(comment.postedAt)}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-[1.6]">{comment.text}</p>
        {reactions > 0 && (
          <p className="mt-3 text-xs text-brand-navy/55">
            {reactions} {reactions === 1 ? "reaction" : "reactions"}
          </p>
        )}
        <div className="mt-2.5 border-t border-border pt-2.5">
          <button
            type="button"
            onClick={onToggleLike}
            aria-pressed={liked}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy/70 hover:text-brand-link aria-pressed:text-brand-link"
          >
            <ThumbsUp className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
            Like
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2.5 bg-surface-subtle px-4 py-2.5">
        <Avatar name={currentUser} size="sm" />
        <input
          placeholder="Leave a reply…"
          aria-label={`Reply to ${comment.author}`}
          className="w-full rounded-md border border-border bg-surface px-3 py-1.5 text-[13px] outline-none focus:border-brand-link"
        />
      </div>
    </article>
  );
}
