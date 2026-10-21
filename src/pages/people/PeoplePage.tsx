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
      "A table directory with sortable columns and a filter sidebar (company, department, job title, time zone, management, entity), a profile with a header card, a contact and additional card beside an org chart card, and published and mentioned lists, plus a carousel org chart that opens on any person.",
    folder: "design1",
  },
  {
    name: "Design 2 — Light List with Filter Pills",
    summary:
      "A light people list with pill-shaped filters, a profile with a sticky left rail (round photo, contact with copy buttons and social icons) beside a long page of reporting line, additional details and an Activity section with Published and Mentioned tabs, and a vertical org chart with rectangular cards.",
    folder: "design2",
  },
  {
    name: "Design 3 — Title-Strip Profile",
    summary:
      "A directory with a tinted filter panel, a photo-card org chart, and a profile with a People / Profile title strip, a round-photo header, a contact rail with icon links, additional and org chart cards, and a full-width Activity section with tabs and sorting.",
    folder: "design3",
  },
  {
    name: "Design 4 — Flat Cornerstone Theme",
    summary:
      "The Cornerstone navy, yellow and link-blue theme in a flat list, vertical org chart cards, and a profile with a navy hero showing company and department, an org chart card, Activity tabs and a sticky details card with icon social links.",
    folder: "design4",
  },
  {
    name: "Design 5 — Editorial Profile on White",
    summary:
      "A clean white directory, a vertical org chart with a navy selected card, and an editorial profile with a round portrait, numbered sections, Activity tabs, icon social links and an Edit profile form (personal, about, contact, additional, org chart).",
    folder: "design5",
  },
  {
    name: "Design 6 — Menu Filters and Poster Profile",
    summary:
      "A table directory with menu-style filter buttons (each with an Any option, selected values shown on the button), and a poster profile with a round photo beside a large name, contact lines with copy buttons, an indented org tree panel, an additional details grid and a full-width Activity section. The edit form follows the site theme with a yellow accent.",
    folder: "design6",
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
