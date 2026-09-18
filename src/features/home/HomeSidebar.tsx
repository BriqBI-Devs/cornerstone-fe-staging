import { BarChart3, Briefcase, Home, PanelLeft, Settings, SlidersHorizontal, Star, User } from "lucide-react";
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
  return (
    <div className="sticky top-[217px] hidden h-[calc(100svh_-_217px)] w-14 shrink-0 flex-col items-center gap-1 self-start rounded-card bg-brand-navy py-4 md:flex">
      <button
        aria-label="Toggle panel"
        className="mb-2 flex h-9 w-9 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
      >
        <PanelLeft className="h-4 w-4" />
      </button>

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
