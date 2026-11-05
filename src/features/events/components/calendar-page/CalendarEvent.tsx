import { formatEventDateTime, formatTimeRange } from "../../helpers/format";
import type { EventItem } from "../../types";

/** One event in a month day cell: time on the first line, event name on the second. */
export function CalendarEvent({
  event,
  onSelect,
}: {
  event: EventItem;
  onSelect: (event: EventItem, trigger: HTMLElement) => void;
}) {
  return (
    <a
      href={`/events/${event.id}`}
      title={`${formatEventDateTime(event)} · ${event.title}`}
      onClick={(e) => {
        e.preventDefault();
        onSelect(event, e.currentTarget);
      }}
      className="mt-1 block overflow-hidden rounded-sm border-l-[3px] border-ev-link bg-ev-link-soft px-1.5 py-1 text-xs leading-[1.35] text-ev-ink no-underline hover:bg-[#d6e1fa] max-md:px-[5px] max-md:py-[3px]"
    >
      <span className="block truncate font-bold text-ev-ink-soft">{formatTimeRange(event)}</span>
      <span className="line-clamp-2 block">{event.title}</span>
    </a>
  );
}
