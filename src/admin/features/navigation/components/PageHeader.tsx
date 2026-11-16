import { Link } from "react-router-dom";
import { cn } from "../../../../lib/cn";
import { ADMIN_TITLE, DEFAULT_ADMIN_PAGE } from "../data";
import type { AdminPageInfo } from "../types";
import { NavIcon } from "./NavIcon";

/** The header band of an admin page: breadcrumb, icon and title, description and the page's tabs. */
export function PageHeader({ page, activeTab }: { page: AdminPageInfo; activeTab: string | undefined }) {
  const crumbs = [ADMIN_TITLE, page.section, page.group, page.label].filter(Boolean);

  return (
    <div className={cn("border-b border-admin-line px-6 pt-8 md:px-12", !page.tabs && "pb-8")}>
      <div className="mx-auto max-w-[880px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-2 text-sm text-admin-muted">
          {crumbs.map((crumb, index) => (
            <span key={crumb}>
              {index > 0 && <span className="mr-2 text-admin-faint">/</span>}
              {index === 0 ? (
                <Link to={`/admin/${DEFAULT_ADMIN_PAGE}`} className="hover:text-brand-link hover:underline">
                  {crumb}
                </Link>
              ) : (
                crumb
              )}
            </span>
          ))}
        </nav>

        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-admin-tint text-admin-gold">
            <NavIcon id={page.id} className="size-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">{page.label}</h1>
        </div>
        <p className="mt-2 max-w-[680px] text-sm leading-relaxed text-admin-muted">{page.description}</p>

        {page.tabs && (
          <div role="tablist" aria-label="Sections" className="mt-6 flex flex-wrap gap-6">
            {page.tabs.map((tab) => (
              <Link
                key={tab.id}
                to={`/admin/${page.id}/${tab.id}`}
                role="tab"
                aria-selected={tab.id === activeTab}
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
