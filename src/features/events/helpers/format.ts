import type { EventItem } from "../types";

const parse = (value: string) => new Date(`${value}T12:00:00`);
const lastDay = (event: EventItem) => event.endDate ?? event.date;

type DateOptions = Intl.DateTimeFormatOptions;
const SHORT: DateOptions = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
const LONG: DateOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };

/** "2026-10-13" -> "Tue, Oct 13, 2026" (or whatever `options` ask for). */
export const formatDate = (value: string, options: DateOptions = SHORT) =>
  new Intl.DateTimeFormat("en-US", options).format(parse(value));

/** "09:30" -> "9:30 AM". */
export function formatTime(value: string): string {
  const [hours, minutes] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(
    new Date(2026, 0, 1, hours, minutes),
  );
}

/** "9:30 AM–10:00 AM", or "All day". Shown on its own line in the calendar. */
export const formatTimeRange = (event: EventItem) =>
  event.allDay ? "All day" : `${formatTime(event.start)}–${formatTime(event.end)}`;

/** One date, or "first – last" for multi-day events. */
export const formatDateSpan = (event: EventItem, options: DateOptions = LONG) =>
  lastDay(event) === event.date
    ? formatDate(event.date, options)
    : `${formatDate(event.date, options)} – ${formatDate(lastDay(event), options)}`;

/** Date and time on one line, e.g. "Tuesday, October 13, 2026 · 9:30 AM–10:00 AM". */
export function formatEventDateTime(event: EventItem, options: DateOptions = LONG): string {
  if (event.allDay) return `${formatDateSpan(event, options)} · All day`;
  if (event.dailySchedule) return `${formatDateSpan(event, options)} · Daily, ${formatTimeRange(event)}`;
  if (lastDay(event) === event.date) return `${formatDate(event.date, options)} · ${formatTimeRange(event)}`;
  return `${formatDate(event.date, options)} ${formatTime(event.start)} – ${formatDate(lastDay(event), options)} ${formatTime(event.end)}`;
}

/** Time only, for the "Event information" card. */
export function formatEventTime(event: EventItem): string {
  if (event.allDay) return "All day";
  if (event.dailySchedule) return `Daily, ${formatTimeRange(event)}`;
  if (lastDay(event) === event.date) return formatTimeRange(event);
  const short: DateOptions = { month: "short", day: "numeric" };
  return `${formatTime(event.start)} ${formatDate(event.date, short)} – ${formatTime(event.end)} ${formatDate(lastDay(event), short)}`;
}
