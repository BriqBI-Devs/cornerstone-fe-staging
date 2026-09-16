import { Building2, Home, HardHat, Users } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const STATS = [
  { label: "Homes delivered to date", value: "40K+" },
  { label: "Projects in pre-development", value: "48" },
  { label: "Units in construction", value: "1,214" },
  { label: "Apartments managed", value: "18,600" },
];

const THEMES = [
  { icon: Home, bg: "bg-brand-link/10", text: "text-brand-link" },
  { icon: Building2, bg: "bg-brand-accent/15", text: "text-brand-accent" },
  { icon: HardHat, bg: "bg-brand-navy/10", text: "text-brand-navy" },
  { icon: Users, bg: "bg-brand-link/10", text: "text-brand-link" },
];

export function KPICards() {
  return (
    <Card>
      <SectionHeading title="L+M at a glance" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat, index) => {
          const { icon: Icon, bg, text } = THEMES[index];
          return (
            <div
              key={stat.label}
              className="rounded-card border border-border p-4 transition-colors hover:border-brand-link/40 hover:bg-surface-subtle"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${bg} ${text}`}>
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
