import { Bell, LayoutGrid, LogOut, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface TopNavProps {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}

/** The navbar that stays at the top: menu button (phones), logo, search, tools, Exit and the signed-in avatar. */
export function TopNav({ drawerOpen, onToggleDrawer }: TopNavProps) {
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

      <Link to="/" aria-label="Cornerstone home" className="flex min-w-0 flex-1 items-center">
        <img src="/cornerstone-assets/L+m-logo.avif" alt="L+M" className="block h-[26px] w-auto" />
      </Link>

      <label className="flex h-10 flex-[0_1_480px] items-center gap-2.5 rounded-[10px] border border-[#e9eaee] bg-admin-soft px-3.5 text-admin-faint focus-within:border-brand-link focus-within:bg-white">
        <Search className="size-[18px] shrink-0" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search Cornerstone…"
          aria-label="Search Cornerstone"
          className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-admin-faint"
        />
      </label>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5">
        <button type="button" aria-label="Apps" className="grid size-[38px] place-items-center rounded-[10px] text-[#3a3f4c] hover:bg-admin-soft max-[960px]:hidden">
          <LayoutGrid className="size-[18px]" />
        </button>
        <button type="button" aria-label="Notifications" className="relative grid size-[38px] place-items-center rounded-[10px] text-[#3a3f4c] hover:bg-admin-soft">
          <Bell className="size-[18px]" />
          <span className="absolute right-[9px] top-2 size-2 rounded-full border-2 border-white bg-admin-danger" />
        </button>
        <Link
          to="/"
          aria-label="Exit the Admin Console"
          title="Exit the Admin Console"
          className="inline-flex h-[38px] items-center gap-2 rounded-[10px] bg-admin-navy px-3.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <LogOut className="size-[18px]" aria-hidden="true" />
          <span>Exit</span>
        </Link>
        {/* TEMP: fixed until sign-in exists. */}
        <span aria-label="Signed in as SB" className="ml-2 grid size-9 shrink-0 place-items-center rounded-full bg-[#d0d4e0] text-xs font-semibold text-admin-muted">
          SB
        </span>
      </div>
    </header>
  );
}
