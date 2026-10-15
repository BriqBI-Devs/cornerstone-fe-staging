import { categoryTitle } from "./data";

export function CategoryLabel({ categoryKey, className = "" }: { categoryKey: string; className?: string }) {
  return (
    <span className={`block text-xs font-semibold uppercase tracking-[0.025em] text-brand-link ${className}`}>
      {categoryTitle(categoryKey)}
    </span>
  );
}
