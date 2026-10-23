import { ArrowUpRight } from "lucide-react";
import { Card } from "../../components/ui/Card";

interface DesignOption {
  name: string;
  summary: string;
  /** Folder under public/events-page-designs; the design opens at its index.html. */
  folder: string;
}

const DESIGN_OPTIONS: DesignOption[] = [
  {
    name: "Design 1 — Calendar-First Events Hub",
    summary:
      "A month and week calendar by default with a list view toggle. Search, date and RSVP filters, a quick-preview popover on each event, and a detail page with RSVP, attendees and related events.",
    folder: "design1",
  },
  {
    name: "Design 2 — Simpplr-Style Events",
    summary:
      "The Design 1 calendar and list in a simpler look, with a dark intro band. The event detail page follows the existing Simpplr site: banner, RSVP side card, related events, reactions and comments.",
    folder: "design2",
  },
  {
    name: "Design 3 — Table List + Calendar",
    summary:
      "A navy title band with a List / Calendar switch. The list is a table (date, event, time, location, attending) with search, a date filter and paging; the calendar shows month and week.",
    folder: "design3",
  },
];

export function EventsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {DESIGN_OPTIONS.map((option) => (
          <Card key={option.name} className="flex flex-col">
            <h2 className="text-base font-semibold text-brand-navy">{option.name}</h2>
            <p className="mt-2 flex-1 text-sm text-brand-navy/70">{option.summary}</p>
            <a
              href={`/events-page-designs/${option.folder}/index.html`}
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
