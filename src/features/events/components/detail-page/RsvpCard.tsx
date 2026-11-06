import { useRef } from "react";
import { useLocalStorage } from "../../../../lib/useLocalStorage";
import { ATTENDEE_NAMES } from "../../data";
import type { EventItem, Rsvp, RsvpChoice } from "../../types";

const CHOICES: RsvpChoice[] = ["Yes", "Maybe", "No"];
const AVATARS_SHOWN = 3;
const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
const avatar = "relative grid shrink-0 place-items-center rounded-full bg-ev-accent-soft font-extrabold text-ev-navy";

/** "Will you attend?" plus who else is going. */
export function RsvpCard({ event }: { event: EventItem }) {
  // Local only for now; swap for the RSVP requests once the backend exists.
  const [response, setResponse] = useLocalStorage<Rsvp>(`cornerstone:event-rsvp:${event.id}`, event.rsvp);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const attendees = ATTENDEE_NAMES.slice(0, event.attendees);

  return (
    <section className="rounded-[14px] bg-white p-[22px] shadow-ev-panel">
      <p className="mb-1.5 text-xs font-extrabold uppercase tracking-[.12em] text-ev-muted">Your response</p>
      <h2 className="mb-4 text-xl font-bold">Will you attend?</h2>

      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Choose your RSVP">
        {CHOICES.map((choice) => (
          <button
            key={choice}
            type="button"
            onClick={() => setResponse(choice)}
            className={`h-[42px] rounded-lg border text-sm font-bold hover:border-ev-navy ${
              response === choice ? "border-ev-navy bg-ev-navy text-ev-accent" : "border-ev-line bg-white"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      <p role="status" className="mt-2.5 min-h-[18px] text-sm text-ev-muted">
        {response === "Pending" ? "You haven't responded yet." : `Your response: ${response}`}
      </p>

      {attendees.length > 0 && (
        <div className="mt-4 flex items-center gap-2.5 border-t border-ev-line pt-4 text-sm text-ev-muted">
          <div className="flex items-center" aria-hidden="true">
            {attendees.slice(0, AVATARS_SHOWN).map((name) => (
              <span key={name} className={`${avatar} -ml-1.5 size-7 border-2 border-white text-xs first:ml-0`}>
                {initials(name)}
              </span>
            ))}
          </div>
          {attendees.length > AVATARS_SHOWN && (
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              aria-label={`Show ${attendees.length} people attending`}
              className="rounded-lg bg-ev-tile px-2.5 py-1 text-xs font-extrabold text-ev-navy hover:bg-ev-accent-soft"
            >
              +{attendees.length - AVATARS_SHOWN}
            </button>
          )}
          <span className="whitespace-nowrap">
            <strong>{event.attendees}</strong> people attending
          </span>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby={`attendees-${event.id}`}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto max-h-[min(540px,calc(100%-32px))] w-[min(400px,calc(100%-32px))] rounded-xl bg-white p-0 text-ev-ink shadow-ev-pop backdrop:bg-[rgb(21_39_60/55%)]"
      >
        <div className="flex max-h-[inherit] flex-col">
          <header className="flex items-start justify-between gap-3 border-b border-ev-line px-5 pb-3.5 pt-5">
            <div>
              <h2 id={`attendees-${event.id}`} className="text-lg font-bold">People attending</h2>
              <p className="mt-1 text-xs text-ev-muted">{event.attendees} people attending</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close attendee list"
              className="grid size-[30px] place-items-center rounded-lg bg-ev-tile text-lg leading-none text-ev-muted"
            >
              ×
            </button>
          </header>
          <ul className="grid gap-0.5 overflow-y-auto px-3 pb-3.5 pt-2">
            {attendees.map((name) => (
              <li key={name} className="flex items-center gap-2.5 rounded-lg p-2 text-sm hover:bg-ev-tile">
                <span className={`${avatar} size-8 text-xs`} aria-hidden="true">{initials(name)}</span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </section>
  );
}
