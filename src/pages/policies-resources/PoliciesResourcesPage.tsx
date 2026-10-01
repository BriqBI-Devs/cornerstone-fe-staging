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
    name: "Design 1 — Category Cards",
    summary:
      "Bento-style landing with equal category cards. Each card links to a combined Files & Links detail page, filterable by category.",
    href: "/privacy&resources/design1/Guide%20Categories.html",
  },
  {
    name: "Design 2 — Resource Thumbnail Cards",
    summary:
      "Same categories as Design 1, restyled as image-thumbnail cards with a type badge (Links, Brochure, Guide, Policy, Forms) above each title. Uses the same file listing detail page as Design 1.",
    href: "/privacy&resources/design2/index.html",
  },
  {
    name: "Design 3 — Equal Grid + Metadata",
    summary:
      "Simplified equal-size card grid showing item counts and last-updated info instead of full sub-item lists.",
    href: "/privacy&resources/design3/index.html",
  },
  {
    name: "Design 4 — Tabbed Card Grid",
    summary:
      "File-type card grid with category tabs across the top and a Files / Links toggle for the listing below.",
    href: "/privacy&resources/design4/document-library-mockup-v7-tabs.html",
  },
  {
    name: "Design 5 — Tabbed Ledger Table",
    summary:
      "Same category tabs and Files / Links toggle, presented as a compact numbered ledger table instead of cards.",
    href: "/privacy&resources/design5/document-library-mockup-v8-listing.html",
  },
];

export function PoliciesResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-l-4 border-l-brand-accent bg-brand-accent/10">
        <div className="flex items-center gap-2">
          <Badge variant="accent">Temporary</Badge>
          <span className="text-sm font-semibold text-brand-navy">For client review — not final</span>
        </div>
        <p className="mt-2 text-sm text-brand-navy/75">
          We're exploring a few different directions for the Policies + Resources page. Open each
          option below and let us know which one to move forward with — or which pieces to mix
          together.
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
