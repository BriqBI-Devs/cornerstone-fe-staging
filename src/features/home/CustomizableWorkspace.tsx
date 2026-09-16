import { Clock, FileText, Plus, Star } from "lucide-react";
import { cn } from "../../lib/cn";
import { Card } from "../../components/ui/Card";

const FAVORITE_APPS = [
  { image: "outlook-img.png", label: "Outlook" },
  { image: "copilot-img.png", label: "Copilot" },
  { image: "zoom-img.png", label: "Zoom" },
  { image: "Salesforce-img.png", label: "Salesforce" },
  { image: "monday-com-img.png", label: "Monday.com" },
];

const RECENT = [
  "Q3 headcount review",
  "Benefits enrollment guide",
  "Fulton Park site plans",
  "New hire onboarding checklist",
  "Q3 town hall slides",
];

export function CustomizableWorkspace() {
  return (
    <Card className="border-t-2 border-t-brand-accent">
      <h2 className="text-base font-semibold text-brand-navy">My workspace</h2>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-navy/55">
            <Star className="h-3 w-3" /> Favorites
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {FAVORITE_APPS.map((app) => (
              <a
                key={app.label}
                href="#"
                className="flex flex-col items-center gap-1.5 rounded-card border border-border p-2 text-center transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
                  <img
                    src={`/cornerstone-assets/apps/${app.image}`}
                    alt=""
                    className="h-full w-full object-contain p-1"
                  />
                </span>
                <span className="text-xs font-medium text-brand-navy">{app.label}</span>
              </a>
            ))}
            <button className="flex flex-col items-center justify-center gap-1.5 rounded-card border border-dashed border-border p-2 text-center text-brand-navy/40 transition-colors hover:border-brand-navy/40 hover:text-brand-navy">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl">
                <Plus className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium">Add</span>
            </button>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-navy/55">
            <Clock className="h-3 w-3" /> Recently visited
          </p>
          <div className="mt-2">
            {RECENT.map((item, i) => (
              <a
                key={item}
                href="#"
                className={cn(
                  "-mx-2 flex items-center gap-2.5 rounded-card px-2 py-2 text-sm text-brand-navy transition-colors hover:bg-surface-subtle",
                  i > 0 && "border-t border-border",
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-navy/10 text-brand-navy">
                  <FileText className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">{item}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
