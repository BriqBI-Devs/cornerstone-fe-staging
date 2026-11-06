import { formatDate, formatEventDateTime } from "../../helpers/format";
import type { EventItem } from "../../types";
import { EventLocation } from "../EventLocation";

/** Top of the detail page: image on the left, title, date and place on the right. */
export function EventHero({ event }: { event: EventItem }) {
  return (
    <section className="grid overflow-hidden rounded-[14px] bg-white shadow-ev-panel lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <img
        src={event.image}
        alt={event.imageAlt}
        className="block aspect-[16/8] h-full w-full bg-ev-tile object-cover lg:aspect-auto lg:min-h-[300px]"
      />
      <div className="relative flex flex-col justify-center p-6 md:px-10 md:py-9">
        <div className="mb-3.5 grid w-14 place-items-center justify-self-start rounded-xl bg-ev-navy pb-2 pt-1.5 text-center text-xs font-extrabold uppercase tracking-[.06em] text-ev-accent md:absolute md:right-8 md:top-7 md:mb-0">
          {formatDate(event.date, { month: "short" })} {Number(event.date.slice(8))}
        </div>
        <p className="mb-2.5 text-xs font-extrabold uppercase tracking-[.14em] text-ev-link">Event details</p>
        <h1 className="mb-4 text-3xl font-bold leading-[1.15] tracking-[-.02em] md:mr-[70px] md:text-4xl">
          {event.title}
        </h1>
        <div className="grid gap-2 text-sm text-ev-ink-soft">
          <span>{formatEventDateTime(event)}</span>
          <span><EventLocation event={event} /></span>
        </div>
      </div>
    </section>
  );
}
