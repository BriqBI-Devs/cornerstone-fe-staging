import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const LINKS = ["Deal Data + Construction", "Building List", "Offices, Space & Parking"];

export function WhereWeWork() {
  return (
    <Card>
      <SectionHeading title="Where we work" />
      <ul className="space-y-2">
        {LINKS.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-brand-link hover:underline">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
