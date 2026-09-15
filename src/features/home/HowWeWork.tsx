import { BarChart3, Building2, MapPin } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const LINKS = [
  { label: "Deal Data", icon: BarChart3 },
  { label: "Building List", icon: Building2 },
  { label: "Offices & Parking", icon: MapPin },
];

export function HowWeWork() {
  return (
    <Card>
      <SectionHeading title="How we work" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {LINKS.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-3 rounded-card border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-card"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-brand-navy">{label}</span>
          </a>
        ))}
      </div>
    </Card>
  );
}
