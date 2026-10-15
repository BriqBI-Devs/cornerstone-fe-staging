// Outlook sync links. A single event opens Outlook's new-event form prefilled;
// the calendar button subscribes Outlook to the events feed.
const OutlookSync = (() => {
  // Example address only. The backend will serve the real feed (GET /api/events/export.ics).
  const FEED_URL = "https://example.com/api/events/export.ics";
  const OUTLOOK = "https://outlook.office.com/calendar/0";

  const nextDay = (date) => {
    const day = new Date(`${date}T12:00:00`);
    day.setDate(day.getDate() + 1);
    return [day.getFullYear(), String(day.getMonth() + 1).padStart(2, "0"), String(day.getDate()).padStart(2, "0")].join("-");
  };

  const eventUrl = (event) => {
    const endDate = event.endDate || event.date;
    const query = new URLSearchParams({
      subject: event.title,
      location: event.location,
      allday: String(Boolean(event.allDay)),
      startdt: event.allDay ? event.date : `${event.date}T${event.start}:00`,
      enddt: event.allDay ? nextDay(endDate) : `${event.dailySchedule ? event.date : endDate}T${event.end}:00`,
    });
    return `${OUTLOOK}/deeplink/compose?${query}`;
  };

  const calendarUrl = () => `${OUTLOOK}/addfromweb?${new URLSearchParams({ url: FEED_URL, name: "Cornerstone Events" })}`;

  const eventLink = (event) =>
    `<a href="${eventUrl(event)}" target="_blank" rel="noopener noreferrer">Sync to Outlook</a>`;

  return { eventUrl, calendarUrl, eventLink };
})();
