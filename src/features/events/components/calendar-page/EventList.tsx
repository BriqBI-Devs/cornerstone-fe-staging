import type { EventItem } from "../../types";
import { EventListItem } from "./EventListItem";

export function EventList({ events }: { events: EventItem[] }) {
  if (!events.length) {
    return (
      <div className="px-5 py-14 text-center text-sm text-ev-muted">
        <strong className="mb-1.5 block text-base text-ev-ink">No events found</strong>
        Try another search or clear your filters.
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-lg border border-ev-line">
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
}
