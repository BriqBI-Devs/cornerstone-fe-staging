import { Link, useParams } from "react-router-dom";
import { EventDetail } from "../../features/events/components/detail-page/EventDetail";
import { getEventById } from "../../features/events/data";

export function EventDetailPage() {
  const { id } = useParams();
  const event = getEventById(id);

  if (!event) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-xl font-semibold">Event not found</h1>
        <Link to="/events" className="mt-3 inline-block text-sm font-medium text-brand-link hover:underline">
          Back to events
        </Link>
      </div>
    );
  }

  // key resets the RSVP and comment state when moving between events.
  return <EventDetail key={event.id} event={event} />;
}
