import { buildWeek } from "../../helpers/calendar";
import { isMultiDay } from "../../helpers/dates";
import { formatEventDateTime, formatTimeRange } from "../../helpers/format";
import type { EventItem } from "../../types";

// 52px time column + seven day columns.
const GRID = "grid w-full min-w-[680px] grid-cols-[52px_repeat(7,minmax(84px,1fr))]";
const HOURS = Array.from({ length: 24 }, (_, hour) =>
  new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(new Date(2026, 0, 1, hour)),
);
const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));

interface WeekViewProps {
  anchor: Date;
  events: EventItem[];
  onSelect: (event: EventItem, trigger: HTMLElement) => void;
  onShowDay: (date: string) => void;
}

export function WeekView({ anchor, events, onSelect, onShowDay }: WeekViewProps) {
  const week = buildWeek(anchor, events);
  const allDayHeight = 32 + week.laneCount * 20;

  const open = (event: EventItem) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSelect(event, e.currentTarget);
  };
  const more = (date: string, count: number) => (
    <a
      href={`/events?day=${date}`}
      onClick={(e) => {
        e.preventDefault();
        onShowDay(date);
      }}
      className="mt-1 block text-xs font-bold text-ev-link no-underline"
    >
      +{count} more
    </a>
  );

  return (
    <div className="max-h-[min(70vh,680px)] scroll-pt-[54px] overflow-auto overscroll-contain rounded-lg border border-ev-line">
      {/* Day names */}
      <div className={`${GRID} sticky top-0 z-[5] bg-ev-tile`}>
        <div className="sticky left-0 z-[3] border-b border-r border-ev-line bg-ev-tile" />
        {week.days.map((day) => (
          <div
            key={day.date}
            className="border-b border-r border-ev-line px-1 py-2.5 text-center text-xs font-bold uppercase tracking-[.06em] text-ev-muted"
          >
            {day.weekday}
            <strong className="mt-1 block text-base normal-case tracking-normal text-ev-ink">{day.dayOfMonth}</strong>
          </div>
        ))}
      </div>

      <div className={GRID}>
        {/* All-day events */}
        <div className={`${GRID} relative col-span-full`}>
          <div
            style={{ minHeight: allDayHeight }}
            className="sticky left-0 z-[1] border-b border-r border-ev-line bg-white pr-2 pt-1 text-right text-xs text-ev-muted"
          >
            All day
          </div>
          {week.days.map((day) => (
            <div
              key={day.date}
              style={{ paddingTop: 22 + week.laneCount * 20, minHeight: allDayHeight }}
              className="grid content-start gap-0.5 border-b border-r border-ev-line px-0.5 pb-0.5"
            >
              {day.allDay.map((event) => (
                <a
                  key={event.id}
                  href={`/events/${event.id}`}
                  title={`${formatEventDateTime(event)} · ${event.title}`}
                  onClick={open(event)}
                  className="block h-[18px] truncate rounded-sm bg-ev-link px-2 py-0.5 text-xs font-semibold leading-[14px] text-white no-underline"
                >
                  {event.title}
                </a>
              ))}
              {day.allDayHidden > 0 && more(day.date, day.allDayHidden)}
            </div>
          ))}
          {week.bars.map(({ event, firstDay, lastDay, lane }) => (
            <a
              key={event.id}
              href={`/events/${event.id}`}
              title={`${formatEventDateTime(event)} · ${event.title}`}
              onClick={open(event)}
              style={{
                left: `calc(52px + (100% - 52px) * ${firstDay / 7})`,
                width: `calc((100% - 52px) * ${(lastDay - firstDay + 1) / 7})`,
                top: 2 + lane * 20,
              }}
              className="absolute z-[2] h-[18px] truncate rounded-sm bg-ev-link px-2 py-0.5 text-xs font-semibold leading-[14px] text-white no-underline"
            >
              {event.title}
            </a>
          ))}
        </div>

        {/* Hourly rows */}
        {HOURS.map((label, hour) => (
          <div key={label} className="contents">
            <div className="sticky left-0 z-[1] min-h-11 border-b border-r border-ev-line bg-white pr-2 pt-1 text-right text-xs text-ev-muted">
              {label}
            </div>
            {week.days.map((day) => (
              <div
                key={day.date}
                className={`relative min-h-11 border-b border-r border-ev-line ${day.byHour[hour].some(isMultiDay) ? "z-[2]" : "z-0"}`}
              >
                {day.byHour[hour].map((event) => (
                  <a
                    key={event.id}
                    href={`/events/${event.id}`}
                    title={`${formatEventDateTime(event)} · ${event.title}`}
                    onClick={open(event)}
                    style={
                      isMultiDay(event)
                        ? { height: Math.max(18, ((minutes(event.end) - minutes(event.start)) / 60) * 42 - 6) }
                        : undefined
                    }
                    className={`block overflow-hidden rounded-sm border-l-[3px] border-ev-link bg-ev-link-soft px-1.5 py-1 text-xs leading-[1.3] text-ev-ink no-underline hover:bg-[#d6e1fa] ${
                      isMultiDay(event) ? "absolute inset-x-[3px] top-[3px] z-[1]" : "m-[3px]"
                    }`}
                  >
                    <span className="block truncate font-bold text-ev-ink-soft">{formatTimeRange(event)}</span>
                    <span className="line-clamp-2 block">{event.title}</span>
                  </a>
                ))}
                {day.moreHour === hour && day.moreCount > 0 && more(day.date, day.moreCount)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
