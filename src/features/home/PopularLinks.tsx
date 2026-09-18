import { Building2, ChevronRight, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const LINKS: { label: string; icon: LucideIcon }[] = [
  { label: "Deal Data + Construction", icon: Building2 },
  { label: "Building List", icon: Building2 },
  { label: "Offices, Space & Parking", icon: MapPin },
];

export function PopularLinks() {
  return (
    <Card className="flex h-full flex-col">
      <SectionHeading title="Popular links" />
      <div className="flex flex-1 flex-col gap-3">
        {LINKS.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href="#"
            className="group flex flex-1 items-center gap-3 rounded-card border border-border p-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-surface-subtle"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-brand-navy text-white">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">{label}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-brand-navy/30 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-navy/60" />
          </a>
        ))}
      </div>
    </Card>
  );
}
