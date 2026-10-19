import { ArrowUpRight } from "lucide-react";
import { Card } from "../../components/ui/Card";

interface DesignOption {
  name: string;
  summary: string;
  /** Folder under public/people-page-designs; the design opens at its index.html. */
  folder: string;
}

const DESIGN_OPTIONS: DesignOption[] = [
  {
    name: "Design 1 — Table Directory with Filter Sidebar",
    summary:
      "A navy-header table directory with a filter sidebar (company, department, job title, time zone, management, entity), a card profile with contact and additional details, and an org chart that always loads every manager above the selected person.",
    folder: "design1",
  },
  {
    name: "Design 2 — Light List with Filter Chips",
    summary:
      "A light, divided people list with pill-shaped filters, a profile with a large portrait and an org section of person cards, and a vertical org chart with rectangular cards.",
    folder: "design2",
  },
  {
    name: "Design 3 — Tinted ID Profile",
    summary:
      "A segmented filter bar over the list, a photo-card org chart, and a profile with a white identity panel, three info cards (contact, additional, org) and stacked published and mentioned content.",
    folder: "design3",
  },
  {
    name: "Design 4 — Flat Cornerstone Theme",
    summary:
      "The Cornerstone navy, yellow and link-blue theme in a flat list, vertical org chart cards, and a profile with a navy hero, a reporting-line card and a sticky details card.",
    folder: "design4",
  },
  {
    name: "Design 5 — Editorial Profile on White",
    summary:
      "A clean white directory, a vertical org chart with a navy selected card, and an editorial profile with a round portrait, numbered sections and an Edit profile form (personal, about, contact, additional and manager).",
    folder: "design5",
  },
];

export function PeoplePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {DESIGN_OPTIONS.map((option) => (
          <Card key={option.name} className="flex flex-col">
            <h2 className="text-base font-semibold text-brand-navy">{option.name}</h2>
            <p className="mt-2 flex-1 text-sm text-brand-navy/70">{option.summary}</p>
            <a
              href={`/people-page-designs/${option.folder}/index.html`}
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
