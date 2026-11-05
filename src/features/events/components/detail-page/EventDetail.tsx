import { Link } from "react-router-dom";
import type { EventItem } from "../../types";
import { EventAbout } from "./EventAbout";
import { EventEngage } from "./EventEngage";
import { EventFacts } from "./EventFacts";
import { EventHero } from "./EventHero";
import { RelatedEvents } from "./RelatedEvents";
import { RsvpCard } from "./RsvpCard";

const frame = "mx-auto w-[calc(100%-28px)] md:w-[min(100%-40px,1240px)]";

/** The /events/:id page. */
export function EventDetail({ event }: { event: EventItem }) {
  return (
    // Full-width page like the mockup; the site header above comes from PublicLayout.
    <div className="relative left-1/2 -my-6 -ml-[50vw] min-w-80 w-screen bg-ev-paper pb-14 text-ev-ink">
      <div className={`${frame} pt-[22px]`}>
        <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-ev-ink-soft no-underline hover:text-ev-link">
          <span aria-hidden="true">←</span> Back to events
        </Link>
      </div>

      <div className={`${frame} mt-3.5`}>
        <EventHero event={event} />

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <EventAbout event={event} />
          <aside className="order-first grid gap-4 lg:sticky lg:top-[108px] lg:order-none">
            {event.rsvpRequired !== false && <RsvpCard event={event} />}
            <EventFacts event={event} />
          </aside>
        </div>

        <RelatedEvents currentId={event.id} />
        <EventEngage event={event} />
      </div>
    </div>
  );
}
