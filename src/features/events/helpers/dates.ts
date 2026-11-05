import type { EventItem } from "../types";

/** Date -> "YYYY-MM-DD" in local time. */
export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Date `amount` days after (or before, if negative) `date`. */
export function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(date.getDate() + amount);
  return next;
}

/** Monday of the week containing `date`. */
export function mondayOf(date: Date): Date {
  return addDays(date, -((date.getDay() + 6) % 7));
}

/** Multi-day events are drawn as bars in the calendar. */
export function isMultiDay(event: EventItem): boolean {
  return (event.endDate ?? event.date) > event.date;
}

/** Whether the event happens on `day` ("YYYY-MM-DD"). */
export function runsOn(event: EventItem, day: string): boolean {
  return event.date <= day && (event.endDate ?? event.date) >= day;
}
