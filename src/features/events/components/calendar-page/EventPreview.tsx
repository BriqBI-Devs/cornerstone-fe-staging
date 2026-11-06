import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "../../../../lib/useClickOutside";
import { formatDate, formatEventDateTime } from "../../helpers/format";
import type { EventItem } from "../../types";
import { EventLocation } from "../EventLocation";

const initials = (name: string) => name.split(/[\s&]+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
const icon = "size-4 text-ev-muted";

interface EventPreviewProps {
  event: EventItem;
  /** The clicked calendar item; the popover opens just below (or above) it. */
  anchor: DOMRect;
  onClose: () => void;
}

/** Quick look at an event, opened from the calendar. */
export function EventPreview({ event, anchor, onClose }: EventPreviewProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ left: 12, top: 12 });
  useClickOutside(ref, onClose);

  useLayoutEffect(() => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const below = anchor.bottom + 8;
    setPosition({
      left: Math.max(12, Math.min(anchor.left, window.innerWidth - box.width - 12)),
      top: below + box.height <= window.innerHeight - 12 ? below : Math.max(12, anchor.top - box.height - 8),
    });
  }, [anchor]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const metaRow = "grid grid-cols-[18px_minmax(0,1fr)] gap-2";

  return (
    <section
      ref={ref}
      role="dialog"
      aria-label={`${event.title} preview`}
      style={position}
      className="fixed z-40 flex max-h-[min(70vh,500px)] w-[min(380px,calc(100vw-24px))] flex-col overflow-hidden rounded-xl border border-ev-line bg-white shadow-ev-pop"
    >
      <button type="button" aria-label="Close event preview" autoFocus onClick={onClose} className="absolute right-3 top-3 z-[1] grid size-7 place-items-center rounded-lg bg-ev-tile text-ev-muted">
        <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="m3 3 6 6M9 3 3 9" /></svg>
      </button>

      <div className="overflow-y-auto overscroll-contain px-[18px] pb-3.5 pt-[18px]">
        <div className="mb-4 mr-8 grid grid-cols-[48px_minmax(0,1fr)] items-start gap-3.5">
          <div className="rounded-lg border border-ev-line bg-white pb-[7px] pt-1.5 text-center text-ev-ink">
            <span className="block text-xs font-extrabold uppercase tracking-[.08em] text-ev-link">{formatDate(event.date, { month: "short" })}</span>
            <strong className="mt-0.5 block text-xl font-bold leading-none">{Number(event.date.slice(8))}</strong>
          </div>
          <Link to={`/events/${event.id}`} className="block text-base font-bold leading-[1.35] no-underline hover:text-ev-link">
            {event.title}
          </Link>
        </div>

        <div className="mb-3.5 grid gap-2.5 text-xs leading-[1.45] text-ev-ink-soft">
          <div className={metaRow}>
            <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            <span>{formatEventDateTime(event)}</span>
          </div>
          <div className={metaRow}>
            <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
            <span><EventLocation event={event} /></span>
          </div>
          {!event.allDay && (
            <div className={metaRow}>
              <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19ZM16 5.5a3 3 0 0 1 0 5.8M17 14a4.5 4.5 0 0 1 3.5 4.4V19" /></svg>
              <span>{event.attendees} attending</span>
            </div>
          )}
        </div>

        <div className="mb-3.5 text-xs leading-[1.6] text-ev-ink-soft">
          {event.description.split(/\n\n+/).map((paragraph) => (
            <p key={paragraph} className="mb-2.5 last:mb-0">{paragraph}</p>
          ))}
        </div>

        <div className="grid gap-2.5 border-t border-ev-line pt-3 text-xs">
          {event.authors.map((author, index) => (
            <div key={author} className="grid grid-cols-[18px_28px_minmax(0,1fr)] items-center gap-2">
              {index === 0 ? (
                <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
              ) : (
                <span aria-hidden="true" />
              )}
              <span className="grid size-7 place-items-center rounded-full bg-ev-accent-soft text-xs font-extrabold text-ev-navy" aria-hidden="true">{initials(author)}</span>
              <div>
                <small className="mb-0.5 block text-xs text-ev-muted">Author</small>
                <strong className="font-semibold">{author}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-ev-line bg-ev-tile px-[18px] py-3 text-center">
        <Link to={`/events/${event.id}`} className="text-sm font-bold text-ev-link no-underline hover:underline">View details</Link>
      </div>
    </section>
  );
}
