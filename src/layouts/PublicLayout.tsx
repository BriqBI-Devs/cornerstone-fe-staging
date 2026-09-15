import { Bell, LayoutGrid, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Avatar } from "../components/ui/Avatar";
import { cn } from "../lib/cn";
import { useClickOutside } from "../lib/useClickOutside";
import { useDateAndWeather } from "../lib/useDateAndWeather";
import { AppLauncherPanel } from "./AppLauncherPanel";
import { NotificationsPanel } from "./NotificationsPanel";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/company-culture", label: "Company + Culture" },
  { to: "/events", label: "Events" },
  { to: "/people", label: "People" },
  { to: "/departments", label: "Departments" },
  { to: "/documents", label: "Documents" },
  { to: "/policies-resources", label: "Policies + Resources" },
];

const FOOTER_COLUMNS = [
  {
    heading: "News",
    links: ["Must reads", "Newsletters", "News archive"],
  },
  {
    heading: "Departments",
    links: ["Builders", "Community Investment", "HR Central", "Operations"],
  },
  {
    heading: "Resources",
    links: ["Document center", "Building list", "Company guide", "Brand assets"],
  },
  {
    heading: "Help",
    links: ["IT help desk", "HR questions", "Facilities", "Accessibility"],
  },
];

export function PublicLayout() {
  const dateAndWeather = useDateAndWeather();
  const [searchOpen, setSearchOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const isHome = useLocation().pathname === "/";

  const appsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  useClickOutside(appsRef, () => setAppsOpen(false));
  useClickOutside(notificationsRef, () => setNotificationsOpen(false));

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-surface">
        <div className="grid grid-cols-3 items-center border-b border-border px-4 pb-2 pt-4 text-xs text-brand-navy/65 md:px-8">
          <span>{dateAndWeather}</span>
          <img
            src="/cornerstone-assets/L+m-development-partners-logo.avif"
            alt="L+M Development Partners"
            className="mx-auto h-6 w-auto object-contain"
          />
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={searchOpen ? "Close search" : "Search"}
              className="flex h-7 w-7 items-center justify-center text-brand-navy/75 hover:text-brand-navy"
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
            <div ref={appsRef} className="relative flex h-7 w-7 items-center justify-center">
              <button
                onClick={() => setAppsOpen((open) => !open)}
                aria-label="Apps"
                className="flex h-7 w-7 items-center justify-center text-brand-navy/75 hover:text-brand-navy"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              {appsOpen && <AppLauncherPanel />}
            </div>
            <div ref={notificationsRef} className="relative flex h-7 w-7 items-center justify-center">
              <button
                onClick={() => setNotificationsOpen((open) => !open)}
                aria-label="Notifications"
                className="flex h-7 w-7 items-center justify-center text-brand-navy/75 hover:text-brand-navy"
              >
                <Bell className="h-4 w-4" />
              </button>
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
              {notificationsOpen && <NotificationsPanel />}
            </div>
            <Avatar name="Jordan Davis" size="sm" />
          </div>
        </div>

        {searchOpen && !isHome && (
          <div className="border-b border-border px-4 py-3 md:px-8">
            <div className="mx-auto flex max-w-[600px] items-center gap-2 rounded-full bg-surface-subtle px-4 py-2">
              <Search className="h-4 w-4 shrink-0 text-brand-navy/50" />
              <input
                autoFocus
                type="text"
                placeholder="Search Cornerstone — people, files, news..."
                className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-brand-navy/50"
              />
            </div>
          </div>
        )}

        <div className="border-b border-brand-navy py-6 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-wide text-brand-navy">
            CORNERSTONE
          </h1>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-navy/55">
            The L+M Development Partners Daily
          </p>
        </div>

        <div className="border-b border-border">
          <nav className="mx-auto flex max-w-[1280px] justify-center gap-8 overflow-x-auto px-4 py-3 md:px-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "whitespace-nowrap border-b-2 pb-1 text-xs font-semibold uppercase tracking-wide",
                    isActive
                      ? "border-brand-accent text-brand-navy"
                      : "border-transparent text-brand-navy hover:text-brand-navy",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-8">
        <Outlet context={{ searchOpen }} />
      </main>

      <footer className="border-t-2 border-brand-accent bg-brand-navy text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
            <div>
              <span className="text-lg font-bold text-brand-accent">Cornerstone</span>
              <p className="mt-2 text-sm text-white/70">
                The home for everything L+M — news, people, tools, and the work
                we build together.
              </p>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-semibold">{col.heading}</h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/70 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <span>© 2026 L+M Development Partners · Cornerstone intranet</span>
            <span>Privacy · Terms · Accessibility · Site map</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
