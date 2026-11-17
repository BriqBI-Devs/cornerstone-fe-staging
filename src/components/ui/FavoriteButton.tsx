import { Star } from "lucide-react";
import { cn } from "../../lib/cn";
import { FAVORITES } from "../../features/favorites/data";

/** Static for now: shows a filled star for items in the sample favorites; clicking does nothing until the backend exists. */
export function FavoriteButton({ id, title, className }: { id: string; title: string; className?: string }) {
  const saved = FAVORITES.some((item) => item.id === id);
  return (
    <button type="button" aria-pressed={saved} aria-label={`Favourite ${title}`} className={cn("flex h-8 w-8 items-center justify-center rounded-md text-brand-accent hover:bg-surface-subtle", className)}>
      <Star className="h-[18px] w-[18px]" fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
