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
    <div className="border-b border-border py-4 last:border-b-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-link">{category}</p>
      <h3 className="mt-1 font-serif text-base font-bold leading-snug text-brand-navy">{title}</h3>
      <p className="mt-1.5 text-xs text-brand-navy/55">{meta}</p>
    </div>
  );
}
