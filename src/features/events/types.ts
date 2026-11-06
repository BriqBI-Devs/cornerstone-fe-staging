export type Rsvp = "Yes" | "No" | "Maybe" | "Pending";
export type RsvpChoice = Exclude<Rsvp, "Pending">;

export type EventsView = "calendar" | "list";
export type CalendarMode = "month" | "week";
export type DateFilter = "all" | "future" | "past";

export interface EventItem {
  id: string;
  title: string;
  /** First day, YYYY-MM-DD. */
  date: string;
  /** Last day for multi-day events, YYYY-MM-DD. */
  endDate?: string;
  allDay?: boolean;
  /** Multi-day event that repeats the same start and end time every day. */
  dailySchedule?: boolean;
  /** false hides the "Will you attend?" card. */
  rsvpRequired?: boolean;
  /** HH:MM, 24-hour. */
  start: string;
  end: string;
  location: string;
  /** Join link for online events. */
  meetingUrl?: string;
  attendees: number;
  /** Default response until the user chooses one. */
  rsvp: Rsvp;
  image: string;
  imageAlt: string;
  description: string;
  registrationUrl?: string;
  organizer: string;
  topics: string[];
  authors: string[];
  published: string;
  edited: string;
}
