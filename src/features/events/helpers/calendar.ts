import type { CalendarMode, EventItem } from "../types";
import { addDays, isMultiDay, mondayOf, runsOn, toISODate } from "./dates";

/** Single events shown in one calendar day before "+N more". */
export const MAX_VISIBLE_PER_DAY = 2;

/** A multi-day event drawn as one bar across the days of a week row. */
export interface SpanBar {
  event: EventItem;
  /** First and last column (0-6) the bar covers. */
  firstDay: number;
  lastDay: number;
  /** Row of the bar, so bars in the same week never overlap. */
  lane: number;
}

export interface MonthDay {
  date: string;
  dayOfMonth: number;
  outsideMonth: boolean;
  events: EventItem[];
}

export interface MonthWeek {
  days: MonthDay[];
  bars: SpanBar[];
  laneCount: number;
}

export interface WeekDay {
  date: string;
  weekday: string;
  dayOfMonth: number;
  allDay: EventItem[];
  allDayHidden: number;
  /** Visible timed events grouped by start hour (index 0-23). */
  byHour: EventItem[][];
  /** Hour of the last visible event and how many are hidden: where "+N more" goes. */
  moreHour: number;
  moreCount: number;
}

export interface WeekData {
  days: WeekDay[];
  bars: SpanBar[];
  laneCount: number;
}

/** Puts each bar on the first free lane. */
function packBars(events: EventItem[], dates: string[]) {
  const laneEnds: number[] = [];
  const bars = events.map((event): SpanBar => {
    const firstDay = Math.max(0, dates.findIndex((date) => runsOn(event, date)));
    let lastDay = firstDay;
    while (lastDay + 1 < dates.length && runsOn(event, dates[lastDay + 1])) lastDay += 1;
    let lane = laneEnds.findIndex((laneEnd) => laneEnd < firstDay);
    if (lane === -1) lane = laneEnds.length;
    laneEnds[lane] = lastDay;
    return { event, firstDay, lastDay, lane };
  });
  return { bars, laneCount: laneEnds.length };
}

/** Monday-first weeks covering the month of `month`. */
export function buildMonthWeeks(month: Date, events: EventItem[]): MonthWeek[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const leadingDays = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const start = new Date(year, monthIndex, 1 - leadingDays);
  const weekCount = Math.ceil((leadingDays + new Date(year, monthIndex + 1, 0).getDate()) / 7);

  return Array.from({ length: weekCount }, (_, week) => {
    const days = Array.from({ length: 7 }, (_, index) => addDays(start, week * 7 + index));
    const dates = days.map(toISODate);
    const multiDay = events.filter(
      (event) => isMultiDay(event) && dates.some((date) => runsOn(event, date)),
    );
    return {
      ...packBars(multiDay, dates),
      days: days.map((day, index) => ({
        date: dates[index],
        dayOfMonth: day.getDate(),
        outsideMonth: day.getMonth() !== monthIndex,
        events: events.filter((event) => !isMultiDay(event) && runsOn(event, dates[index])),
      })),
    };
  });
}

/** The Monday-first week containing `anchor`. */
export function buildWeek(anchor: Date, events: EventItem[]): WeekData {
  const days = Array.from({ length: 7 }, (_, index) => addDays(mondayOf(anchor), index));
  const dates = days.map(toISODate);
  const weekdayName = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  const allDayMulti = events.filter(
    (event) => event.allDay && isMultiDay(event) && dates.some((date) => runsOn(event, date)),
  );

  return {
    ...packBars(allDayMulti, dates),
    days: days.map((day, index): WeekDay => {
      const dayEvents = events.filter((event) => runsOn(event, dates[index]));
      const allDay = dayEvents.filter((event) => event.allDay && !isMultiDay(event));
      const timed = dayEvents.filter((event) => !event.allDay);
      const visible = timed.slice(0, MAX_VISIBLE_PER_DAY);
      const byHour: EventItem[][] = Array.from({ length: 24 }, () => []);
      visible.forEach((event) => byHour[Number(event.start.slice(0, 2))].push(event));
      const last = visible[visible.length - 1];
      return {
        date: dates[index],
        weekday: weekdayName.format(day),
        dayOfMonth: day.getDate(),
        allDay: allDay.slice(0, MAX_VISIBLE_PER_DAY),
        allDayHidden: Math.max(0, allDay.length - MAX_VISIBLE_PER_DAY),
        byHour,
        moreHour: last ? Number(last.start.slice(0, 2)) : -1,
        moreCount: Math.max(0, timed.length - visible.length),
      };
    }),
  };
}

/** Previous or next period. Months land on the 13th so short months never overflow. */
export function shiftPeriod(anchor: Date, mode: CalendarMode, direction: 1 | -1): Date {
  return mode === "week"
    ? addDays(anchor, 7 * direction)
    : new Date(anchor.getFullYear(), anchor.getMonth() + direction, 13);
}

/** "October 2026" or "Oct 12 – Oct 18, 2026". */
export function formatPeriodTitle(anchor: Date, mode: CalendarMode): string {
  if (mode === "month") {
    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(anchor);
  }
  const monday = mondayOf(anchor);
  const short = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  const withYear = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${short.format(monday)} – ${withYear.format(addDays(monday, 6))}`;
}
