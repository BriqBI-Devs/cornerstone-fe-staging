import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { cn } from "../../../lib/cn";

interface PageHeaderProps {
  breadcrumbs: { label: string; to?: string }[];
  icon: ReactNode;
  title: string;
  description: string;
  tabs?: { label: string; to: string; selected: boolean }[];
  /** Text of the button beside the title, e.g. "Create story". */
  action?: string;
}

/** The header band of an admin page: breadcrumb, icon and title, description, action button and tabs. */
export function PageHeader({ breadcrumbs, icon, title, description, tabs, action }: PageHeaderProps) {
  return (
    <div className={cn("border-b border-admin-line px-6 pt-8 md:px-12", !tabs && "pb-8")}>
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

        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-admin-tint text-admin-gold">{icon}</span>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {action && <Button className="ml-auto">{action}</Button>}
        </div>
        <p className="mt-2 max-w-[680px] text-sm leading-relaxed text-admin-muted">{description}</p>

        {tabs && (
          <div role="tablist" aria-label="Sections" className="mt-6 flex flex-wrap gap-6">
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
