import { Clock, MapPin, User } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const EVENTS = [
  {
    month: "Jul",
    day: "10",
    weekday: "Friday",
    title: "Safety stand-down · all sites",
    host: "EHS Team",
    time: "7:00 AM",
    location: "Every field site",
  },
  {
    month: "Jul",
    day: "14",
    weekday: "Tuesday",
    title: "Q3 town hall",
    host: "Leadership Team",
    time: "12:00 PM",
    location: "All staff · virtual",
  },
  {
    month: "Jul",
    day: "18",
    weekday: "Saturday",
    title: "River Crossing site tour",
    host: "Margaret Carestia",
    time: "9:00 AM",
    location: "River Crossing, Bronx",
  },
];

export function UpcomingEvents() {
  return (
    <Card className="flex h-full flex-col">
      <SectionHeading title="Upcoming events" />
      <div className="space-y-4">
        {EVENTS.map((event) => (
          <div
            key={event.title}
            className="flex items-start gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex w-14 shrink-0 flex-col items-center rounded-card border border-border py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-navy/55">
                {event.month}
              </span>
              <span className="text-lg font-bold leading-none text-brand-navy">
                {event.day}
              </span>
              <span className="text-[10px] text-brand-navy/55">{event.weekday}</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-brand-navy">{event.title}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-navy/65">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {event.host}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
              </div>
            </div>

            <a
              href="#"
              className="shrink-0 self-center rounded-md border border-border px-3 py-1.5 text-sm font-medium text-brand-navy hover:bg-surface-subtle"
            >
              Go to event
            </a>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="mt-auto block pt-3 text-right text-sm font-semibold text-brand-navy hover:underline"
      >
        View more →
      </a>
    </Card>
  );
}
