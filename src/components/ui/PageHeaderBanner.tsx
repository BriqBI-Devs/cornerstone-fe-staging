import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface PageHeaderBannerProps {
  title: string;
  description?: string;
  /** Small label above the title. */
  eyebrow?: string;
  /** Shown on the right of the band, e.g. a link. */
  action?: ReactNode;
  /** Extra classes for the inner column, e.g. more bottom padding when a panel overlaps the band. */
  className?: string;
}

/** Full-width navy header at the top of the section landing pages (Company + Culture, Events). */
export function PageHeaderBanner({ title, description, eyebrow, action, className }: PageHeaderBannerProps) {
  return (
    // Breaks out of the centred page column so the band spans the full window width.
    <header className="relative left-1/2 -ml-[50vw] -mt-6 w-screen border-t-[5px] border-brand-accent bg-brand-navy text-white">
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] flex-col justify-between gap-5 px-4 py-10 md:flex-row md:items-end md:px-8 md:py-12",
          className,
        )}
      >
        <div className="flex flex-col gap-3">
          {eyebrow && <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-accent">{eyebrow}</p>}
          <h1 className="text-[clamp(34px,4.6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em]">{title}</h1>
          {description && (
            <p className="max-w-[600px] text-balance text-[15px] leading-[1.65] text-white/75">{description}</p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
