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
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={cn(
        // -mt-4 cancels most of <main>'s py-6 top padding, leaving a small
        // 8px gap above the rail instead of none — and the sticky offset
        // (225px, 8px below the header) matches that same rest position, so
        // there's still nothing to snap through once you start scrolling.
        "sticky top-[225px] -mt-4 hidden w-14 shrink-0 flex-col items-center gap-1 self-start py-4 md:flex",
        // lvh (not svh) — svh can recompute mid-scroll as mobile browser
        // chrome shows/hides, which nudges the mt-auto bottom icons on every
        // recalculation. lvh is fixed, so the icons stay put while scrolling.
        visible ? "h-[calc(100lvh_-_225px)] rounded-card bg-brand-navy" : "h-auto",
      )}
    >
      <button
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide sidebar" : "Show sidebar"}
        aria-expanded={visible}
        className={cn(
          "mb-2 flex h-9 w-9 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white",
          !visible && "bg-brand-navy hover:bg-brand-navy/90",
        )}
      >
        <PanelLeft className="h-4 w-4" />
      </button>

      {visible && (
        <>
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
        </>
      )}
    </div>
  );
}
