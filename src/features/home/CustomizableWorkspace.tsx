import { Clock, FileText, Star } from "lucide-react";
import { cn } from "../../lib/cn";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const FAVORITE_APPS = [
  { image: "outlook-img.png", label: "Outlook" },
  { image: "copilot-img.png", label: "Copilot" },
  { image: "zoom-img.png", label: "Zoom" },
  { image: "Salesforce-img.png", label: "Salesforce" },
  { image: "monday-com-img.png", label: "Monday.com" },
];

const RECENT = [
  "Q3 headcount review.xlsx",
  "Benefits enrollment guide",
  "Fulton Park site plans.pdf",
  "New hire onboarding checklist",
  "Q3 town hall slides.pptx",
];

export function CustomizableWorkspace() {
  return (
    <Card className="border-t-2 border-t-brand-accent">
      <SectionHeading title="My workspace" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  "flex items-center gap-2.5 py-2 text-sm text-brand-navy hover:text-brand-link",
                  i > 0 && "border-t border-border",
                )}
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-brand-navy/45" />
                <span className="truncate">{item}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
