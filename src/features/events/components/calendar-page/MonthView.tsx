import { cn } from "../../../../lib/cn";
import { buildMonthWeeks, MAX_VISIBLE_PER_DAY } from "../../helpers/calendar";
import { formatEventDateTime, formatTimeRange } from "../../helpers/format";
import type { EventItem } from "../../types";
import { CalendarEvent } from "./CalendarEvent";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface MonthViewProps {
  month: Date;
  events: EventItem[];
  /** Today as YYYY-MM-DD, to highlight the day. */
  today: string;
  onSelect: (event: EventItem, trigger: HTMLElement) => void;
  onShowDay: (date: string) => void;
}

export function MonthView({ month, events, today, onSelect, onShowDay }: MonthViewProps) {
  return (
    <div className="grid grid-cols-7 overflow-hidden rounded-lg border border-ev-line">
      {WEEKDAYS.map((day) => (
        <div
          key={day}
          className="border-b border-ev-line bg-ev-tile px-2 py-2.5 text-center text-xs font-bold uppercase tracking-[.06em] text-ev-muted"
        >
          {day}
        </div>
      ))}

      {buildMonthWeeks(month, events).map((week) => (
        <div key={week.days[0].date} className="group/week relative col-span-full grid grid-cols-7">
          {week.days.map((day) => (
            <div
              key={day.date}
              style={{ paddingTop: 35 + week.laneCount * 20 }}
              className={cn(
                "relative min-h-[76px] border-b border-r border-ev-line px-[3px] pb-1.5 md:min-h-[124px] md:px-1.5",
                "nth-7:border-r-0 group-last/week:border-b-0",
                day.date === today ? "bg-[#fffbea]" : day.outsideMonth ? "bg-ev-tile" : "bg-white",
              )}
            >
              <span
                className={cn(
                  "absolute left-2 top-1.5 grid size-6 place-items-center rounded-full text-xs font-semibold",
                  day.outsideMonth && "text-[#a9b3c0]",
                  day.date === today && "bg-ev-navy font-bold text-white",
                )}
              >
                {day.dayOfMonth}
              </span>
              {day.events.slice(0, MAX_VISIBLE_PER_DAY).map((event) => (
                <CalendarEvent key={event.id} event={event} onSelect={onSelect} />
              ))}
              {day.events.length > MAX_VISIBLE_PER_DAY && (
                <a
                  href={`/events?day=${day.date}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onShowDay(day.date);
                  }}
                  className="ml-1 mt-1.5 block text-xs font-bold text-ev-link no-underline hover:underline"
                >
                  +{day.events.length - MAX_VISIBLE_PER_DAY} more
                </a>
              )}
            </div>
          ))}

          {week.bars.map(({ event, firstDay, lastDay, lane }) => (
            <a
              key={event.id}
              href={`/events/${event.id}`}
              title={`${formatEventDateTime(event)} · ${event.title}`}
              style={{ left: `${(firstDay / 7) * 100}%`, width: `${((lastDay - firstDay + 1) / 7) * 100}%`, top: 31 + lane * 20 }}
              onClick={(e) => {
                e.preventDefault();
                onSelect(event, e.currentTarget);
              }}
              className="absolute z-[2] h-[18px] overflow-hidden text-ellipsis whitespace-nowrap rounded-sm bg-ev-link px-2 py-0.5 text-xs font-semibold leading-[14px] text-white no-underline hover:bg-[#1e46b0]"
            >
              {event.allDay ? "All day" : `${formatTimeRange(event)}${event.dailySchedule ? " daily" : ""}`} · {event.title}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
