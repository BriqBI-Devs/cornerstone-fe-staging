import { Link } from "react-router-dom";
import { formatEventDateTime } from "../../helpers/format";
import type { EventItem } from "../../types";
import { EventLocation } from "../EventLocation";

/** One list row: event thumbnail where the date tile was, then the name with date and details below. */
export function EventListItem({ event }: { event: EventItem }) {
  return (
    <article className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-3.5 border-t border-ev-line bg-white p-3.5 transition-colors first:border-t-0 hover:bg-ev-tile motion-reduce:transition-none md:grid-cols-[160px_minmax(0,1fr)_16px] md:gap-5 md:px-5 md:py-4 md:after:text-xl md:after:leading-none md:after:text-[#a9b3c0] md:after:content-['›'] md:hover:after:text-ev-link">
      <Link to={`/events/${event.id}`} tabIndex={-1} aria-hidden="true" className="block leading-[0]">
        <img
          src={event.image}
          alt=""
          loading="lazy"
          className="block aspect-[4/3] w-24 rounded-lg bg-ev-tile object-cover md:w-40"
        />
      </Link>
      <div className="min-w-0">
        <h3 className="m-0 text-base font-bold leading-[1.35]">
          <Link to={`/events/${event.id}`} className="no-underline hover:text-ev-link">
            {event.title}
          </Link>
        </h3>
        <div className="mt-1.5 flex flex-wrap text-sm text-ev-muted [&>span+span]:before:mx-2.5 [&>span+span]:before:text-[#c3cad4] [&>span+span]:before:content-['•']">
          <span>{formatEventDateTime(event, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
          <span><EventLocation event={event} /></span>
          {!event.allDay && <span>{event.attendees} attending</span>}
        </div>
      </div>
    </article>
  );
}
