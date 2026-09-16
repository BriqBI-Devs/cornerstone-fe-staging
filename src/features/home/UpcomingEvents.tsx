import { Clock, MapPin } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const EVENTS = [
  {
    month: "Sep",
    day: "18",
    weekday: "Friday",
    title: "Safety stand-down · all sites",
    host: "EHS Team",
    time: "7:00 AM",
    location: "Every field site",
  },
  {
    month: "Sep",
    day: "22",
    weekday: "Tuesday",
    title: "Q3 Deal Data walkthrough",
    host: "Leadership Team",
    time: "12:00 PM",
    location: "All staff · virtual",
  },
  {
    month: "Sep",
    day: "26",
    weekday: "Saturday",
    title: "River Crossing site tour",
    host: "Margaret Carestia",
    time: "9:00 AM",
    location: "River Crossing, Bronx",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UpcomingEvents() {
  return (
    <Card className="flex h-full flex-col">
      <SectionHeading title="Upcoming events" />
      <div className="space-y-3">
        {EVENTS.map((event) => (
          <div
            key={event.title}
            className="flex items-start gap-4 rounded-card border border-border p-3 transition-colors hover:border-brand-link/40 hover:bg-surface-subtle"
          >
            <div className="flex w-14 shrink-0 flex-col items-center rounded-card bg-brand-navy py-1.5 text-white">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
                {event.month}
              </span>
              <span className="text-lg font-bold leading-none">{event.day}</span>
              <span className="text-[10px] text-white/70">{event.weekday}</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-brand-navy">{event.title}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-navy/65">
                <span className="flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-navy/10 text-[8px] font-semibold text-brand-navy">
                    {initials(event.host)}
                  </span>
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
              className="shrink-0 self-center rounded-md border border-border px-3 py-1.5 text-sm font-medium text-brand-navy hover:bg-white"
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
