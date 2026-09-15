import { PlaceholderImage } from "./PlaceholderImage";

export function NewsListItem({
  category,
  title,
  meta,
}: {
  category: string;
  title: string;
  meta: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-link">{category}</p>
        <h3 className="mt-1 text-base font-bold leading-snug text-brand-navy">{title}</h3>
        <p className="mt-1.5 text-xs text-brand-navy/55">{meta}</p>
      </div>
      <PlaceholderImage label="thumb" className="h-24 w-24 shrink-0" />
    </div>
  );
}
