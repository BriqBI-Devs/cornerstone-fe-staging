import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { NavIcon } from "./NavIcon";
import { ADMIN_NAV, ADMIN_TITLE } from "./data";

interface SidebarProps {
  /** On phones the sidebar is a drawer; this says whether it is slid in. */
  open: boolean;
  /** Called when a page link is clicked, so the drawer can close. */
  onNavigate: () => void;
}

/** The left sidebar: sections that fold, groups and page links. Stays in place while the page scrolls. */
export function Sidebar({ open, onNavigate }: SidebarProps) {
  return (
    <nav
      id="admin-sidebar"
      aria-label={ADMIN_TITLE}
      className={cn(
        "overflow-y-auto overscroll-contain border-r border-admin-line bg-admin-soft px-3.5 pb-8 pt-5",
        // desktop: stays in place under the top navbar
        "min-[961px]:sticky min-[961px]:top-16 min-[961px]:h-[calc(100vh-4rem)]",
        // phones: a drawer that slides in over the page
        "max-[960px]:fixed max-[960px]:inset-y-0 max-[960px]:left-0 max-[960px]:z-40 max-[960px]:w-72 max-[960px]:max-w-[86vw] max-[960px]:shadow-xl max-[960px]:transition-transform",
        !open && "max-[960px]:-translate-x-full max-[960px]:invisible",
      )}
    >
      <h2 className="px-2 pb-3.5 text-base font-bold tracking-[-0.01em]">{ADMIN_TITLE}</h2>

      {ADMIN_NAV.map((section) => (
        // <details> folds and unfolds on its own, so no state is needed.
        <details key={section.section} open className="group border-t border-admin-line pt-1.5 first-of-type:border-t-0">
          <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg p-2 text-[11px] font-extrabold uppercase tracking-[0.1em] hover:bg-admin-hover [&::-webkit-details-marker]:hidden">
            {section.section}
            <ChevronDown className="size-[15px] -rotate-90 transition-transform group-open:rotate-0" aria-hidden="true" />
          </summary>

          {section.groups.map((group) => (
            <div key={group.title ?? "ungrouped"} className="mb-4 mt-2">
              {group.title && <p className="px-2 pb-2 pt-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#6a7182]">{group.title}</p>}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={`/admin/${item.id}`}
                      onClick={onNavigate}
                      // The open page gets aria-current="page", which tints its row.
                      className="group/link flex items-center justify-between gap-2 rounded-md px-3 py-2.5 text-sm text-[#1c253e] hover:bg-admin-hover aria-[current=page]:bg-admin-tint aria-[current=page]:font-semibold aria-[current=page]:text-admin-tint-ink"
                    >
                      <span className="flex min-w-0 items-center gap-[11px]">
                        <NavIcon id={item.id} className="size-[17px] shrink-0 text-[#7d8697] group-hover/link:text-brand-navy group-aria-[current=page]/link:text-admin-gold" />
                        <span>
                          {item.label}
                          {item.note && ` · ${item.note}`}
                        </span>
                      </span>
                      {item.badge && <span className="whitespace-nowrap text-[11px] font-semibold text-[#7a6420]">{item.badge}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </details>
      ))}
    </nav>
  );
}
