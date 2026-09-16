import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const LINKS = ["Company Guide", "Mission + Values", "Newsletters"];

export function HowWeWork() {
  return (
    <Card>
      <SectionHeading title="How we work" />
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
