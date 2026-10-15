// Dates, RSVP vocabulary and the data API.
// `EventsApp.api` is the only code that reads EVENT_DATA. Each method names the endpoint it stands in for,
// so connecting a backend means rewriting these bodies and nothing else.
window.EventsApp = window.EventsApp || {};

(() => {
  // ---- Dates (all values are ISO strings: YYYY-MM-DD) ----
  const TODAY = "2026-10-13";
  const parse = (iso) => new Date(`${iso}T12:00:00`);
  const toIso = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const addDays = (iso, count) => {
    const date = parse(iso);
    date.setDate(date.getDate() + count);
    return toIso(date);
  };
  const weekStart = (iso) => addDays(iso, -((parse(iso).getDay() + 6) % 7));
  const format = (iso, options) => new Intl.DateTimeFormat("en-US", options).format(parse(iso));
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(2026, 0, 1, hours, minutes));
  };
  const covers = (event, iso) => event.date <= iso && (event.endDate || event.date) >= iso;
  const isMultiDay = (event) => Boolean(event.endDate && event.endDate > event.date);
  const timeLabel = (event) => (event.allDay ? "All day" : `${formatTime(event.start)} – ${formatTime(event.end)}`);
  const rangeLabel = (event) =>
    isMultiDay(event)
      ? `${format(event.date, { weekday: "short", month: "short", day: "numeric" })} – ${format(event.endDate, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}`
      : format(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const scheduleLabel = (event) =>
    event.dailySchedule ? `Daily, ${formatTime(event.start)} – ${formatTime(event.end)}` : timeLabel(event);
  const dayPosition = (event, iso) => {
    const dayOf = (target) => Math.round((parse(target) - parse(event.date)) / 86400000) + 1;
    return `Day ${dayOf(iso)} of ${dayOf(event.endDate)}`;
  };

  // ---- RSVP vocabulary: stored value -> label shown to people + colour tone ----
  const RSVP = {
    Yes: { label: "Going", tone: "going" },
    Maybe: { label: "Maybe", tone: "maybe" },
    No: { label: "Not going", tone: "declined" },
    Pending: { label: "Needs response", tone: "pending" },
  };
  const needsRsvp = (event) => event.rsvpRequired !== false;

  // ---- Mock backend ----
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const rsvpKey = (id) => `event-rsvp-${id}`;
  const events = EVENT_DATA.map((event) => ({
    ...event,
    rsvp: localStorage.getItem(rsvpKey(event.id)) || event.rsvp,
    authors: event.id === "benefits-open-enrollment" ? ["Destiny Tucker", "Belinda Apprey", "Jordan Lee"] : ["Destiny Tucker", "Belinda Apprey"],
  }));
  const byStart = (a, b) => `${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`);

  const api = {
    // GET /api/events?from=&to=&q=
    async listRange({ from, to, q = "" }) {
      await delay(180);
      const needle = q.toLowerCase();
      return events
        .filter((event) => event.date <= to && (event.endDate || event.date) >= from)
        .filter((event) => `${event.title} ${event.location} ${event.topics.join(" ")}`.toLowerCase().includes(needle))
        .sort(byStart);
    },
    // GET /api/events/:id
    async getEvent(id) {
      await delay(100);
      return events.find((event) => event.id === id) || null;
    },
    // GET /api/events/:id/related?limit=
    async related(event, limit = 3) {
      await delay(120);
      return events
        .filter((item) => item.id !== event.id)
        .map((item) => ({ item, score: item.topics.filter((topic) => event.topics.includes(topic)).length }))
        .sort((a, b) => b.score - a.score || byStart(a.item, b.item))
        .slice(0, limit)
        .map(({ item }) => item);
    },
    // PUT /api/events/:id/rsvp  { status: "Yes" | "Maybe" | "No" }
    async setRsvp(id, status) {
      await delay(80);
      const event = events.find((item) => item.id === id);
      if (!event) throw new Error(`Unknown event: ${id}`);
      event.rsvp = status;
      localStorage.setItem(rsvpKey(id), status);
      return event;
    },
  };

  EventsApp.dates = { TODAY, parse, toIso, addDays, weekStart, format, formatTime, covers, isMultiDay, timeLabel, rangeLabel, scheduleLabel, dayPosition };
  EventsApp.rsvp = { RSVP, needsRsvp };
  EventsApp.api = api;
})();
