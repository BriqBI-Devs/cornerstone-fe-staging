import { Link } from "react-router-dom";
import { EVENTS } from "../../data";
import { formatEventDateTime } from "../../helpers/format";

/** Three other events to look at next. */
export function RelatedEvents({ currentId }: { currentId: string }) {
  const related = EVENTS.filter((event) => event.id !== currentId).slice(0, 3);

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Related events</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {related.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block overflow-hidden rounded-xl bg-white shadow-ev-card no-underline transition hover:-translate-y-0.5 hover:shadow-ev-panel motion-reduce:transition-none"
          >
            <img src={event.image} alt={event.imageAlt} loading="lazy" className="block aspect-video w-full object-cover" />
            <span className="block px-4 pb-1 pt-3.5 text-xs font-extrabold uppercase tracking-[.04em] text-ev-link">
              {formatEventDateTime(event, { month: "short", day: "numeric" })}
            </span>
            <strong className="block px-4 pb-[18px] text-base leading-[1.4]">{event.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
