import { cn } from "../../../../lib/cn";

interface PagerProps {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}

const button = "h-9 min-w-9 rounded-md px-2 text-sm text-brand-navy/70 hover:bg-surface-subtle disabled:opacity-40 disabled:hover:bg-transparent";

/** Previous, the page numbers, next. The current page is a light grey chip. */
export function Pager({ page, pages, onChange }: PagerProps) {
  if (pages <= 1) return null;

  return (
    <nav className="mt-6 flex items-center justify-center gap-1" aria-label="Pagination">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page" className={button}>
        ‹
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(button, n === page && "bg-surface-subtle font-bold text-brand-navy")}
        >
          {n}
        </button>
      ))}
      <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="Next page" className={button}>
        ›
      </button>
    </nav>
  );
}
