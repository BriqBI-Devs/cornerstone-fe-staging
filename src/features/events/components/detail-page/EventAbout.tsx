import type { EventItem } from "../../types";

const MAX_AUTHORS_SHOWN = 4;
const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
const label = "text-xs font-extrabold uppercase tracking-[.12em] text-ev-muted";
const authorBubble =
  "relative -ml-2 grid size-9 shrink-0 place-items-center rounded-full border-[3px] border-white text-xs font-extrabold first:ml-0";

/** Description, registration link, topics and who posted the event. */
export function EventAbout({ event }: { event: EventItem }) {
  const hiddenAuthors = event.authors.length - MAX_AUTHORS_SHOWN;

  return (
    <div className="rounded-[14px] bg-white p-[22px] shadow-ev-panel md:px-9 md:py-8">
      <p className={`mb-3 ${label}`}>About this event</p>
      <div className="max-w-[700px] text-base leading-[1.75] text-ev-ink-soft">
        {event.description.split(/\n\n+/).map((paragraph) => (
          <p key={paragraph} className="mb-4">{paragraph}</p>
        ))}
      </div>

      {event.registrationUrl && (
        <div className="my-5 rounded-lg bg-ev-link-soft p-4 text-center text-sm leading-normal">
          <strong>Register in advance for the meeting here:</strong>
          <br />
          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="break-all text-ev-link">
            {event.registrationUrl}
          </a>
        </div>
      )}

      <div className="mt-[22px] flex flex-wrap gap-2">
        {event.topics.map((topic) => (
          <span key={topic} className="rounded-lg bg-ev-tile px-3 py-[5px] text-xs font-semibold text-ev-ink-soft">
            {topic}
          </span>
        ))}
      </div>

      <section aria-label="Event authors" className="mt-7 grid gap-2.5 border-t border-ev-line pt-[22px]">
        <div className={label}>Posted by</div>
        <div className="flex items-center" aria-label={`${event.authors.length} authors: ${event.authors.join(", ")}`}>
          {event.authors.slice(0, MAX_AUTHORS_SHOWN).map((author) => (
            <span key={author} className={`${authorBubble} bg-ev-accent-soft text-ev-navy`} aria-hidden="true">
              {initials(author)}
            </span>
          ))}
          {hiddenAuthors > 0 && (
            <span className={`${authorBubble} bg-ev-tile text-ev-ink-soft`} aria-hidden="true">+{hiddenAuthors}</span>
          )}
        </div>
        <div className="text-xs text-ev-muted">{event.published} ({event.edited})</div>
      </section>
    </div>
  );
}
