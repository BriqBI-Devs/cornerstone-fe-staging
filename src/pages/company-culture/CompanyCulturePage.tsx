import { ArrowUpRight } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";

interface DesignOption {
  name: string;
  summary: string;
  href: string;
}

const DESIGN_OPTIONS: DesignOption[] = [
  {
    name: "Design 1 — Category Widget Cards",
    summary:
      "No hero — the page opens straight into a grid of category cards (Workiversaries, New Hires & Welcomes, Community + Connection, Cultural Observances, Company Guide), each a white panel with a colored icon badge and a list of stories.",
    href: "/company&culture/design1/index.html",
  },
  {
    name: "Design 2 — Photo Hero + Category Cards",
    summary:
      "A full-bleed photo hero (auto-rotating through a pool of stories) above the same category card grid as Design 1.",
    href: "/company&culture/design2/index.html",
  },
];

export function CompanyCulturePage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-l-4 border-l-brand-accent bg-brand-accent/10">
        <div className="flex items-center gap-2">
          <Badge variant="accent">Temporary</Badge>
          <span className="text-sm font-semibold text-brand-navy">For client review — not final</span>
        </div>
        <p className="mt-2 text-sm text-brand-navy/75">
          We're exploring a couple of directions for the Company + Culture page. Open each option
          below and let us know which one to move forward with — or which pieces to mix together.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {DESIGN_OPTIONS.map((option) => (
          <Card key={option.name} className="flex flex-col">
            <h2 className="text-base font-semibold text-brand-navy">{option.name}</h2>
            <p className="mt-2 flex-1 text-sm text-brand-navy/70">{option.summary}</p>
            <a
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-surface-subtle"
            >
              View design
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
