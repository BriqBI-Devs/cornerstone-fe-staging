import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const STATS = [
  { label: "Homes delivered to date", value: "40K+" },
  { label: "Projects in pre-development", value: "48" },
  { label: "Units in construction", value: "1,214" },
  { label: "Apartments managed", value: "18,600" },
];

export function KPICards() {
  return (
    <Card>
      <SectionHeading title="L+M at a glance" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-card border border-border bg-surface-subtle p-4 text-center"
          >
            <p className="text-2xl font-bold text-brand-navy">{stat.value}</p>
            <p className="mt-1 text-xs text-brand-navy/65">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-brand-navy/45">
        Live figures pending Dataverse integration — shown here as representative placeholders.
      </p>
    </Card>
  );
}
