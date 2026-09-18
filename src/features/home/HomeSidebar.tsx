import { BarChart3, Briefcase, Home, PanelLeft, Settings, SlidersHorizontal, Star, User } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/cn";

const TOP_ITEMS = [
  { icon: Home, label: "Home", active: true },
  { icon: User, label: "Profile" },
  { icon: Briefcase, label: "Departments" },
  { icon: Star, label: "Favorites" },
];

const BOTTOM_ITEMS = [
  { icon: SlidersHorizontal, label: "Preferences" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export function HomeSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-[217px] z-20 hidden h-[calc(100svh_-_217px)] w-14 shrink-0 flex-col items-center gap-1 self-start rounded-card bg-brand-navy py-4 md:flex">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle panel"
        className="mb-2 flex h-9 w-9 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
      >
        <PanelLeft className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute left-full top-0 z-20 ml-2 h-full w-48 rounded-card border border-border bg-surface p-2 shadow-card">
          {[...TOP_ITEMS, ...BOTTOM_ITEMS].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-brand-navy hover:bg-surface-subtle"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        {TOP_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            aria-label={label}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md",
              active
                ? "bg-brand-accent text-brand-navy"
                : "text-white/60 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1">
        {BOTTOM_ITEMS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
