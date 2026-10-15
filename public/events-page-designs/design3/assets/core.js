// Shared by every events page. Load after events-data.js.
// `api` is the backend boundary: each method names the endpoint it stands in for.
// Everything outside `api` is presentation and never reads EVENT_DATA directly.
window.EventsKit = (() => {
  const todayString = "2026-10-13";
  const today = new Date(2026, 9, 13, 12);

  // ---- Formatting ----
  const dateOf = (value) => new Date(`${value}T12:00:00`);
  const pad = (value) => String(value).padStart(2, "0");
  const toDateString = (day) => `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`;
  const formatTime = (value) => {
    const [hours, minutes] = value.split(":").map(Number);
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(2026, 0, 1, hours, minutes));
  };
  const formatDate = (value, options = { weekday: "short", month: "short", day: "numeric", year: "numeric" }) =>
    new Intl.DateTimeFormat("en-US", options).format(dateOf(value));
  const formatEventDateTime = (event, options = { weekday: "long", month: "long", day: "numeric", year: "numeric" }) => {
    const endDate = event.endDate || event.date;
    if (event.allDay) return `${event.date === endDate ? formatDate(event.date, options) : `${formatDate(event.date, options)} – ${formatDate(endDate, options)}`} · All day`;
    if (event.dailySchedule) return `${formatDate(event.date, options)} – ${formatDate(endDate, options)} · Daily, ${formatTime(event.start)}–${formatTime(event.end)}`;
    return event.date === endDate
      ? `${formatDate(event.date, options)} · ${formatTime(event.start)}–${formatTime(event.end)}`
      : `${formatDate(event.date, options)} ${formatTime(event.start)} – ${formatDate(endDate, options)} ${formatTime(event.end)}`;
  };
  const eventCoversDate = (event, date) => event.date <= date && (event.endDate || event.date) >= date;
  const isMultiDayEvent = (event) => Boolean(event.endDate && event.endDate > event.date);
  const isUpcoming = (event) => dateOf(event.endDate || event.date) >= today;
  const initialsFor = (name) => name.split(/[\s&]+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const locationMarkup = (location) => {
    const escaped = location.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    if (!/\bonline\b/i.test(location)) return escaped;
    const zoomLink = '<a href="https://zoom.us/" target="_blank" rel="noopener noreferrer" aria-label="Visit the official Zoom website">https://zoom.us/</a>';
    return /\bzoom\b/i.test(location) ? escaped.replace(/\bzoom\b/i, zoomLink) : `${escaped} · ${zoomLink}`;
  };

  // Plain-text location for use inside links (nested <a> is invalid and breaks the card).
  const locationText = (location) => location.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // ---- Links ----
  const eventHref = (event, from) => `event-detail.html?id=${encodeURIComponent(event.id)}&from=${encodeURIComponent(from)}`;
  const listHref = (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.date && filters.date !== "future") params.set("date", filters.date);
    if (filters.day) params.set("day", filters.day);
    (filters.rsvps || []).forEach((rsvp) => params.append("rsvp", rsvp));
    return `list.html${params.size ? `?${params}` : ""}`;
  };

  // ---- Data (mock backend) ----
  const events = EVENT_DATA.map((event) => ({
    ...event,
    rsvp: localStorage.getItem(`event-rsvp-${event.id}`) || event.rsvp,
    authors: event.id === "benefits-open-enrollment" ? ["Destiny Tucker", "Belinda Apprey", "Jordan Lee"] : ["Destiny Tucker", "Belinda Apprey"],
  }));
  const sorted = [...events].sort((a, b) => `${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`));
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const matchesFilters = (event, { q = "", rsvps = [], date = "all", day = "" }) =>
    `${event.title} ${event.location} ${event.topics.join(" ")}`.toLowerCase().includes(q.toLowerCase())
    && (date === "all" || (date === "future" ? isUpcoming(event) : !isUpcoming(event)))
    && (!day || eventCoversDate(event, day))
    && (!rsvps.length || rsvps.includes(event.rsvp));

  const api = {
    // GET /api/events?page=&pageSize=&q=&rsvp=&date=future|past|all&day=&excludeId=
    async listEvents({ page = 1, pageSize = 10, excludeId, ...filters }) {
      await delay(200);
      let matched = sorted.filter((event) => event.id !== excludeId && matchesFilters(event, filters));
      if (filters.date === "past") matched = matched.reverse();
      const totalPages = Math.max(1, Math.ceil(matched.length / pageSize));
      const current = Math.min(Math.max(1, page), totalPages);
      return { items: matched.slice((current - 1) * pageSize, current * pageSize), total: matched.length, page: current, pageSize, totalPages };
    },
    // GET /api/events/range?from=YYYY-MM-DD&to=YYYY-MM-DD&rsvp=   (calendar: only the visible grid, never the full list)
    async listRange({ from, to, rsvps = [] }) {
      await delay(150);
      return sorted.filter((event) => event.date <= to && (event.endDate || event.date) >= from && matchesFilters(event, { rsvps }));
    },
    // GET /api/events/:id
    async getEvent(id) {
      await delay(100);
      return events.find((event) => event.id === id) || null;
    },
    // GET /api/events/:id/related?limit=
    async related(event, limit = 3) {
      await delay(120);
      return events.filter((item) => item.id !== event.id)
        .map((item) => ({ item, score: item.topics.filter((topic) => event.topics.includes(topic)).length }))
        .sort((a, b) => b.score - a.score || a.item.date.localeCompare(b.item.date))
        .slice(0, limit).map(({ item }) => item);
    },
    // GET /api/events/featured
    async featured() {
      await delay(120);
      return sorted.find((event) => dateOf(event.date) >= today && !event.allDay) || sorted.find(isUpcoming) || null;
    },
    // GET /api/events/summary  ->  { today, week, going }
    async summary() {
      await delay(150);
      const weekEnd = new Date(today); weekEnd.setDate(weekEnd.getDate() + 7);
      return {
        today: events.filter((event) => eventCoversDate(event, todayString)).length,
        week: events.filter((event) => dateOf(event.date) >= today && dateOf(event.date) <= weekEnd).length,
        going: events.filter((event) => event.rsvp === "Yes").length,
      };
    },
  };

  // ---- Shared UI pieces ----
  const eventRow = (event, from) => {
    const multiDay = event.endDate && event.endDate > event.date;
    const time = event.allDay
      ? `All day${multiDay ? `<small>Until ${formatDate(event.endDate, { month: "short", day: "numeric" })}</small>` : ""}`
      : `${formatTime(event.start)}<small>${formatTime(event.end)}</small>`;
    return `
      <li>
        <a class="event-row" href="${eventHref(event, from)}">
          <span class="cell-date"><strong>${formatDate(event.date, { month: "short" })} ${dateOf(event.date).getDate()}</strong><span>${formatDate(event.date, { weekday: "long" })}</span></span>
          <span class="cell-title">${event.title}</span>
          <span class="cell-time">${time}</span>
          <span class="cell-place">${locationText(event.location)}</span>
          <span class="cell-people">${event.allDay ? "" : `${event.attendees} attending`}</span>
        </a>
      </li>`;
  };
  const eventList = (items, from) => `
    <div class="event-table">
      <div class="table-head" aria-hidden="true"><span>Date</span><span>Event</span><span>Time</span><span>Location</span><span>Attending</span></div>
      <ul class="event-list">${items.map((event) => eventRow(event, from)).join("")}</ul>
    </div>`;
  const skeletonRows = (count) => `
    <div class="event-table" aria-hidden="true">
      <ul class="event-list">${Array.from({ length: count }, () => '<li><div class="event-row skeleton-row"><span class="skeleton skeleton-line"></span><span class="skeleton skeleton-line"></span></div></li>').join("")}</ul>
    </div>`;
  const emptyState = (title, message) => `<div class="empty-state"><strong>${title}</strong>${message}</div>`;

  return {
    today, todayString, api,
    dateOf, pad, toDateString, formatTime, formatDate, formatEventDateTime, eventCoversDate, isMultiDayEvent,
    initialsFor, locationMarkup, eventHref, listHref, eventRow, eventList, skeletonRows, emptyState,
  };
})();
