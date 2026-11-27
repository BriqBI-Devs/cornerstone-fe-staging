import { Bell, LayoutGrid, LogOut, Menu, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { getPersonById } from "../../features/people/data";
import { AppLauncherPanel } from "../../layouts/AppLauncherPanel";
import { NotificationsPanel } from "../../layouts/NotificationsPanel";
import { ProfilePanel } from "../../layouts/ProfilePanel";
import { useClickOutside } from "../../lib/useClickOutside";

interface TopNavProps {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}

/** The navbar that stays at the top: menu button (phones), logo, search, tools, Exit and the signed-in avatar. */
export function TopNav({ drawerOpen, onToggleDrawer }: TopNavProps) {
  // TEMP: same fixed user as the site header (person 8) until sign-in exists.
  const currentUser = getPersonById(8)!;
  const [appsOpen, setAppsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const appsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  useClickOutside(appsRef, () => setAppsOpen(false));
  useClickOutside(notificationsRef, () => setNotificationsOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-admin-line bg-white px-3.5 min-[961px]:gap-5 min-[961px]:px-6">
      <button
        type="button"
        onClick={onToggleDrawer}
        aria-label="Open the admin menu"
        aria-expanded={drawerOpen}
        aria-controls="admin-sidebar"
        className="grid size-[38px] place-items-center rounded-[10px] hover:bg-admin-soft min-[961px]:hidden"
      >
        <Menu className="size-[18px]" />
      </button>

      <Link to="/" aria-label="Cornerstone home" className="flex shrink-0 items-center max-sm:mr-auto min-[961px]:flex-1">
        <img src="/cornerstone-assets/L+m-logo.avif" alt="L+M" className="block h-[26px] w-auto" />
      </Link>

      {/* No room for search on phones; below the desktop width it takes whatever is left between the logo and the tools. */}
      <label className="flex h-10 min-w-0 flex-1 max-sm:hidden min-[961px]:flex-[0_1_480px] items-center gap-2.5 rounded-[10px] border border-[#e9eaee] bg-admin-soft px-3.5 text-admin-faint focus-within:border-brand-link focus-within:bg-white">
        <Search className="size-[18px] shrink-0" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search Cornerstone…"
          aria-label="Search Cornerstone"
          className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-admin-faint"
        />
      </label>

      <div className="flex shrink-0 items-center justify-end gap-1 md:gap-4 min-[961px]:flex-1">
        <div ref={appsRef} className="relative flex h-9 w-9 items-center justify-center">
          <button
            type="button"
            onClick={() => setAppsOpen((open) => !open)}
            aria-label="Apps"
            className="flex h-9 w-9 items-center justify-center text-brand-navy/75 hover:text-brand-navy"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          {appsOpen && <AppLauncherPanel />}
        </div>
        <div ref={notificationsRef} className="relative flex h-9 w-9 items-center justify-center">
          <button
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center text-brand-navy/75 hover:text-brand-navy"
          >
            <Bell className="h-5 w-5" />
          </button>
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent md:right-1 md:top-1" />
          {notificationsOpen && <NotificationsPanel />}
        </div>
        <Link
          to="/"
          aria-label="Exit admin and go to the site"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-admin-danger/30 bg-admin-danger/5 px-3.5 text-sm font-semibold text-admin-danger transition-colors hover:bg-admin-danger hover:text-white"
        >
          <LogOut className="size-4" aria-hidden="true" />
          <span className="max-[960px]:hidden">Exit admin</span>
        </Link>
        {/* TEMP: fixed until sign-in exists. */}
        <div ref={profileRef} className="relative flex h-9 w-9 items-center justify-center">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-label="Profile menu"
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            className="flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-link"
          >
            <Avatar name={currentUser.name} src={currentUser.photo} size="md" />
          </button>
          {profileOpen && (
            <ProfilePanel name={currentUser.name} photo={currentUser.photo} profilePath={`/people/${currentUser.id}`} onClose={() => setProfileOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
