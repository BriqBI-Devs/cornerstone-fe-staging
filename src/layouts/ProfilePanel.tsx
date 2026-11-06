import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "../components/ui/Avatar";

/** The menu that opens from the profile picture at the top right: who is signed in, a link to their profile and Log out. */
export function ProfilePanel({ name, photo, profilePath, onClose }: { name: string; photo?: string; profilePath: string; onClose: () => void }) {
  return (
    <div
      role="menu"
      aria-label="Profile"
      className="fixed inset-x-4 top-14 z-40 w-auto rounded-card border border-border bg-surface text-left shadow-card md:absolute md:inset-x-auto md:right-0 md:top-full md:z-10 md:mt-2 md:w-72"
    >
      <div className="px-5 pb-4 pt-5">
        <div className="flex items-center gap-3">
          <Avatar name={name} src={photo} size="lg" />
          <p className="min-w-0 truncate text-lg font-bold text-brand-navy">{name}</p>
        </div>

        <Link
          to={profilePath}
          role="menuitem"
          onClick={onClose}
          className="mt-4 block rounded-full border border-brand-navy px-4 py-2 text-center text-sm font-semibold text-brand-navy transition-colors hover:bg-surface-subtle"
        >
          View profile
        </Link>
      </div>

      <div className="border-t border-border py-2">
        {/* No sign-in exists yet, so this only closes the menu. */}
        <button
          type="button"
          role="menuitem"
          onClick={onClose}
          className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm text-brand-navy transition-colors hover:bg-surface-subtle"
        >
          <LogOut className="h-4 w-4 shrink-0 text-brand-navy/70" aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  );
}
