import { Building, Building2, ChevronRight, HardHat, Map, MapPin, Sprout, Wrench } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const LINKS = [
  "Deal Data + Construction",
  "Building List",
  "Offices, Space & Parking",
  "Regional Offices Directory",
  "Community Investment Sites",
  "Property Operations Hub",
  "Facilities Requests",
];
const ICONS = [Building2, Building, MapPin, Map, Sprout, Wrench, HardHat];

export function WhereWeWork() {
  return (
    <Card>
      <SectionHeading title="Where we work" />
      <ul className="grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-2">
        {LINKS.map((link, index) => {
          const Icon = ICONS[index];
          return (
            <li key={link}>
              <a
                href="#"
                className="group flex items-center gap-3 rounded-card px-2 py-2 -mx-2 text-sm text-brand-navy transition-colors hover:bg-surface-subtle"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-navy/10 text-brand-navy">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex-1 font-medium">{link}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-brand-navy/30 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-navy/60" />
              </a>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
