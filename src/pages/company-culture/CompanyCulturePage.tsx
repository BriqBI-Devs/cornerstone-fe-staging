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
    name: "Design 1 — Full Landing Page",
    summary:
      "Everything visible on one scroll: a featured story, an About card with a Read more toggle, an auto-rotating Latest stories carousel, and a panel per category listing its pages with a View more row.",
    href: "/company&culture/design1/index.html",
  },
  {
    name: "Design 2 — Stories Feed + Sidebar",
    summary:
      "A featured story, then a two-column layout: a grid of the latest stories (with category labels) on the left, and a sticky sidebar on the right with the category list and an About card with Read more.",
    href: "/company&culture/design2/index.html",
  },
  {
    name: "Design 3 — Editorial Feature + Category Rows",
    summary:
      "A large featured story up top (no card box), an auto-scrolling Latest stories strip, then More stories revealed one category at a time via Load more, and an About note at the bottom.",
    href: "/company&culture/design3/index.html",
  },
  {
    name: "Design 4 — Magazine Front Page",
    summary:
      "An About note at the top, a large featured story, four Latest story cards, then a newest-first More stories feed with Load more and a View all categories button.",
    href: "/company&culture/design4/index.html",
  },
  {
    name: "Design 5 — Featured Band + Category Cards",
    summary:
      "An About strip at the top, a full-width navy featured-story band, category cards showing each category's latest date, and an auto-scrolling Latest stories carousel.",
    href: "/company&culture/design5/index.html",
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
