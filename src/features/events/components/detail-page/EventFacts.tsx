import { formatDateSpan, formatEventTime } from "../../helpers/format";
import type { EventItem } from "../../types";
import { EventLocation } from "../EventLocation";

// Temporary link until per-event Outlook sync exists.
const OUTLOOK_URL = "https://outlook.office.com/calendar/";

/** Date, time and place of the event. */
export function EventFacts({ event }: { event: EventItem }) {
  const facts = [
    { label: "Date", value: formatDateSpan(event) },
    { label: "Time", value: formatEventTime(event) },
    { label: "Location", value: <EventLocation event={event} /> },
  ];

  return (
    <section className="rounded-[14px] bg-white p-[22px] shadow-ev-panel">
      <h2 className="mb-2.5 text-xl font-bold">Event information</h2>
      {facts.map(({ label, value }) => (
        <p key={label} className="grid grid-cols-[64px_minmax(0,1fr)] gap-2.5 border-t border-ev-line py-3 text-sm leading-normal">
          <span className="text-ev-muted">{label}</span>
          <strong className="break-words font-semibold">{value}</strong>
        </p>
      ))}
      <a
        href={OUTLOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#bcd0f7] bg-ev-link-soft text-sm font-bold text-ev-link no-underline hover:border-ev-link hover:bg-[#dbe6fb]"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M12 13v5M9.5 15.5 12 18l2.5-2.5" /></svg>
        <span>Sync to Outlook</span>
      </a>
    </section>
  );
}
