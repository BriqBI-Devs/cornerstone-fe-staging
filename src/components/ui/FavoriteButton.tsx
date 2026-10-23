import { Star } from "lucide-react";
import { useFavorites, type FavItem } from "../../lib/useFavorites";
import { cn } from "../../lib/cn";

export function FavoriteButton({ item, className }: { item: FavItem; className?: string }) {
  const { has, toggle } = useFavorites();
  const saved = has(item.id);
  return (
    <button type="button" onClick={() => toggle(item)} aria-pressed={saved} aria-label={`${saved ? "Remove" : "Add"} ${item.title} ${saved ? "from" : "to"} favorites`} className={cn("flex h-8 w-8 items-center justify-center rounded-md text-brand-accent hover:bg-surface-subtle", className)}>
      <Star className="h-[18px] w-[18px]" fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
