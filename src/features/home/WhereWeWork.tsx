import { ArrowRight, Building2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const SITES = [
  "Builders",
  "Community Investment",
  "HR Central",
  "Operations",
  "Managers' Corner",
  "IT + Intranet",
  "Corporate Functions",
  "Property Management",
];

export function WhereWeWork() {
  return (
    <Card>
      <SectionHeading title="Where we work" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SITES.map((site) => (
          <a
            key={site}
            href="#"
            className="group flex flex-col justify-between gap-4 rounded-card border border-border bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-card"
          >
            <Building2 className="h-5 w-5 text-brand-navy/50" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-brand-navy">{site}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-navy/40 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>
      <a
        href="#"
        className="mt-4 block text-right text-sm font-semibold text-brand-navy hover:underline"
      >
        View more →
      </a>
    </Card>
  );
}
