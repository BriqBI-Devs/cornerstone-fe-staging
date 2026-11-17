import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";

interface PageHeaderProps {
  breadcrumbs: { label: string; to?: string }[];
  icon: ReactNode;
  title: string;
  tabs?: { label: string; to: string; selected: boolean }[];
}

/** The header band of an admin page: breadcrumb, icon and title, and tabs. */
export function PageHeader({ breadcrumbs, icon, title, tabs }: PageHeaderProps) {
  return (
    <div className={cn("border-b border-admin-line px-6 pt-10 md:px-12", !tabs && "pb-10")}>
      <div className="mx-auto max-w-[1080px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-2 text-sm text-admin-muted">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label}>
              {index > 0 && <span className="mr-2 text-admin-faint">/</span>}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-brand-link hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                crumb.label
              )}
            </span>
          ))}
        </nav>

        <div className="mt-5 flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-admin-tint text-admin-gold">{icon}</span>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        </div>

        {tabs && (
          <div role="tablist" aria-label="Sections" className="mt-10 flex flex-wrap gap-6">
            {tabs.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                role="tab"
                aria-selected={tab.selected}
                // The open tab shows a line along the bottom, sitting on the header's own bottom border.
                className="-mb-px border-b-2 border-transparent pb-3 text-sm font-medium text-admin-muted hover:text-brand-navy aria-selected:border-brand-accent aria-selected:font-semibold aria-selected:text-brand-navy"
              >
                {tab.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
