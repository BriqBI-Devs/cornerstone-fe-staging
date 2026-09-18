import { Building2, HeartHandshake, Home, HardHat, Map, Users } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const STATS = [
  { label: "Homes delivered to date", value: "40K+" },
  { label: "Projects in pre-development", value: "48" },
  { label: "Units in construction", value: "1,214" },
  { label: "Apartments managed", value: "18,600" },
  { label: "States with L+M presence", value: "9" },
  { label: "Volunteer hours this year", value: "12,400" },
];

const ICONS = [Home, Building2, HardHat, Users, Map, HeartHandshake];

export function KPICards() {
  return (
    <Card>
      <SectionHeading title="L+M at a glance" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STATS.map((stat, index) => {
          const Icon = ICONS[index];
          return (
            <div key={stat.label} className="rounded-card border border-border p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-brand-link/10 text-brand-link">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-2xl font-bold text-brand-navy">{stat.value}</p>
              <p className="mt-1 text-xs text-brand-navy/65">{stat.label}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-brand-navy/45">
        Live figures pending Dataverse integration — shown here as representative placeholders.
      </p>
    </Card>
  );
}
