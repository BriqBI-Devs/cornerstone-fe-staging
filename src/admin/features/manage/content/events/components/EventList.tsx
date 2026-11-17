import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SearchInput } from "@/components/ui/SearchInput";
import { EVENTS } from "../data";

export function EventList() {
  const [query, setQuery] = useState("");
  const events = EVENTS.filter((event) => `${event.title} ${event.location} ${event.organizer}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search events" className="w-full max-w-sm border border-admin-line bg-white" />
        <Button className="h-10 shrink-0 px-4">Create event</Button>
      </div>

      <div className="divide-y divide-admin-line">
        {events.map((event) => (
          <article key={event.title} className="flex items-center gap-4 py-5 first:pt-0 sm:gap-6">
            <PlaceholderImage label="thumb" className="h-[60px] w-24 shrink-0 sm:h-[76px] sm:w-[140px]" />
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-admin-tint px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-admin-tint-ink">
                {event.date} · {event.time}
              </span>
              <h3 className="mt-2 text-base font-bold leading-snug">{event.title}</h3>
              <p className="mt-2 text-xs text-admin-muted">
                {event.location} · <span className="font-semibold text-brand-navy">{event.organizer}</span>
              </p>
            </div>
            <RowMenu label={event.title} />
          </article>
        ))}
        {events.length === 0 && <p className="py-8 text-center text-sm text-admin-muted">No events match.</p>}
      </div>
    </div>
  );
}
