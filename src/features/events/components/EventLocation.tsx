import type { EventItem } from "../types";

/** The place of an event; online events also get a link to join. */
export function EventLocation({ event }: { event: EventItem }) {
  return (
    <>
      {event.location}
      {event.meetingUrl && (
        <>
          {" · "}
          <a
            href={event.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ev-link underline underline-offset-2"
          >
            Join online
          </a>
        </>
      )}
    </>
  );
}
