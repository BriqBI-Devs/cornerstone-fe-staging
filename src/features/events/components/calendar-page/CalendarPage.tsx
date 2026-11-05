import { useState } from "react";
import { PageHeaderBanner } from "../../../../components/ui/PageHeaderBanner";
import { EVENTS } from "../../data";
import { formatPeriodTitle, shiftPeriod } from "../../helpers/calendar";
import { toISODate } from "../../helpers/dates";
import type { CalendarMode, DateFilter, EventItem, EventsView, Rsvp } from "../../types";
import { CalendarToolbar } from "./CalendarToolbar";
import { EventList } from "./EventList";
import { EventPreview } from "./EventPreview";
import { EventsToolbar } from "./EventsToolbar";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";

/** The /events page: intro band, then search and filters, then the calendar (default) or the list. */
export function CalendarPage() {
  const today = new Date();
  const todayISO = toISODate(today);

  const [view, setView] = useState<EventsView>("calendar");
  const [mode, setMode] = useState<CalendarMode>("month");
  const [anchor, setAnchor] = useState(today);
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [day, setDay] = useState("");
  const [preview, setPreview] = useState<{ event: EventItem; anchor: DOMRect } | null>(null);

  // Temporary client-side filtering until events come from the backend.
  const events = EVENTS.filter((event) => {
    const lastDay = event.endDate ?? event.date;
    return (
      `${event.title} ${event.location} ${event.topics.join(" ")}`.toLowerCase().includes(query.toLowerCase()) &&
      (dateFilter === "all" || (dateFilter === "future" ? lastDay >= todayISO : lastDay < todayISO)) &&
      (!day || (event.date <= day && lastDay >= day)) &&
      (!rsvps.length || rsvps.includes(event.rsvp))
    );
  });

  const openPreview = (event: EventItem, trigger: HTMLElement) =>
    setPreview({ event, anchor: trigger.getBoundingClientRect() });
  const showDay = (date: string) => {
    setPreview(null);
    setDay(date);
    setView("list");
  };
  const showCalendar = () => {
    setView("calendar");
    setQuery("");
    setDay("");
  };
  const changeQuery = (value: string) => {
    setQuery(value);
    if (value) setView("list"); // a search shows as a list; the calendar always shows every event
  };

  return (
    <div className="flex flex-col">
      <PageHeaderBanner
        eyebrow="Cornerstone Events"
        title="Find something to join"
        description="Gatherings, learning sessions and chances to connect. Switch between the calendar and a simple list."
        // Extra space at the bottom: the events panel overlaps the band.
        className="pb-[76px] md:pb-[88px]"
        action={
          view === "list" && (
            <a
              href="#eventsContent"
              onClick={(e) => {
                e.preventDefault();
                showCalendar();
              }}
              className="text-sm font-bold text-brand-accent no-underline hover:underline"
            >
              View calendar →
            </a>
          )
        }
      />

      {/* Paper-coloured area below the band, full window width like the mockup. */}
      <div className="relative left-1/2 -mb-6 -ml-[50vw] w-screen bg-ev-paper pb-14 text-ev-ink">
      <div className="relative z-[1] mx-auto -mt-14 max-w-[1280px] px-4 md:px-8">
        <section aria-label="Events" className="rounded-[14px] bg-white shadow-ev-panel">
          <EventsToolbar
            query={query}
            onQueryChange={changeQuery}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            rsvps={rsvps}
            onRsvpsChange={setRsvps}
            view={view}
            onViewChange={(next) => (next === "calendar" ? showCalendar() : setView("list"))}
          />
          {view === "calendar" && (
            <CalendarToolbar
              title={formatPeriodTitle(anchor, mode)}
              mode={mode}
              onModeChange={setMode}
              onPrevious={() => setAnchor(shiftPeriod(anchor, mode, -1))}
              onNext={() => setAnchor(shiftPeriod(anchor, mode, 1))}
              onToday={() => setAnchor(new Date())}
            />
          )}
          <div id="eventsContent" aria-live="polite" className="min-h-[280px] px-2.5 pb-3.5 md:px-5 md:pb-5">
            {view === "list" ? (
              <EventList events={events} />
            ) : mode === "month" ? (
              <MonthView month={anchor} events={events} today={todayISO} onSelect={openPreview} onShowDay={showDay} />
            ) : (
              <WeekView anchor={anchor} events={events} onSelect={openPreview} onShowDay={showDay} />
            )}
          </div>
        </section>
      </div>
      </div>

      {preview &&<EventPreview event={preview.event} anchor={preview.anchor} onClose={() => setPreview(null)} />}
    </div>
  );
}
