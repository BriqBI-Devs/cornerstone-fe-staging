document.getElementById("outlookCalendar").href = OutlookSync.calendarUrl();
// Events landing page: calendar (month/week) and list views, search, filters, quick preview.
const searchInput = document.getElementById("searchInput");
const content = document.getElementById("eventsContent");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const calendarToolbar = document.getElementById("calendarToolbar");
const calendarMode = document.getElementById("calendarMode");
const periodTitle = document.getElementById("periodTitle");
const state = {
  view: new URLSearchParams(location.search).get("view") === "list" ? "list" : "calendar",
  dateFilter: new URLSearchParams(location.search).get("date") || "all",
  day: new URLSearchParams(location.search).get("day") || "",
  query: new URLSearchParams(location.search).get("q") || "",
  rsvps: new URLSearchParams(location.search).getAll("rsvp"),
  month: new Date(2026, 9, 13),
  calendarMode: new URLSearchParams(location.search).get("calendar") === "week" ? "week" : "month",
};
const today = new Date(2026, 9, 13);
const dateOf = (value) => new Date(`${value}T12:00:00`);
const pad = (value) => String(value).padStart(2, "0");
const formatTime = (value) => {
  const [hours, minutes] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(2026, 0, 1, hours, minutes));
};
const formatDate = (value, options = { weekday: "short", month: "short", day: "numeric", year: "numeric" }) =>
  new Intl.DateTimeFormat("en-US", options).format(dateOf(value));
const formatEventDateTime = (event, options = { weekday: "long", month: "long", day: "numeric", year: "numeric" }) => {
  const endDate = event.endDate || event.date;
  if (event.allDay) {
    const dates = event.date === endDate
      ? formatDate(event.date, options)
      : `${formatDate(event.date, options)} – ${formatDate(endDate, options)}`;
    return `${dates} · All day`;
  }
  const start = `${formatDate(event.date, options)} ${formatTime(event.start)}`;
  const end = `${formatDate(endDate, options)} ${formatTime(event.end)}`;
  if (event.dailySchedule) {
    return `${formatDate(event.date, options)} – ${formatDate(endDate, options)} · Daily, ${formatTime(event.start)}–${formatTime(event.end)}`;
  }
  return event.date === endDate
    ? `${formatDate(event.date, options)} · ${formatTime(event.start)}–${formatTime(event.end)}`
    : `${start} – ${end}`;
};
const maxVisibleEventsPerDay = 2;
const eventCoversDate = (event, date) => event.date <= date && (event.endDate || event.date) >= date;
const isMultiDayEvent = (event) => Boolean(event.endDate && event.endDate > event.date);
const organizerInitials = (organizer) => organizer.split(/[\s&]+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
const locationMarkup = (location) => {
  const escapedLocation = location.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
  if (!/\bonline\b/i.test(location)) return escapedLocation;
  const zoomLink = '<a href="https://zoom.us/" target="_blank" rel="noopener noreferrer" aria-label="Visit the official Zoom website">https://zoom.us/</a>';
  return /\bzoom\b/i.test(location)
    ? escapedLocation.replace(/\bzoom\b/i, zoomLink)
    : `${escapedLocation} · ${zoomLink}`;
};
const authorPictureRequests = new Map();
const loadAuthorPictures = (event) => {
  if (!authorPictureRequests.has(event.id)) {
    const request = (async () => {
      const url = new URL("https://randomuser.me/api/");
      url.searchParams.set("results", String(event.authors.length));
      url.searchParams.set("inc", "picture");
      url.searchParams.set("noinfo", "");
      url.searchParams.set("seed", `cornerstone-authors-${event.id}`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Random User API returned HTTP ${response.status}`);
      const payload = await response.json();
      if (!Array.isArray(payload.results) || payload.results.length < event.authors.length) {
        throw new Error("Random User API returned an incomplete author profile list");
      }
      return payload.results.map((profile) => {
        const picture = profile.picture?.thumbnail;
        if (typeof picture !== "string") throw new Error("Random User API returned an invalid author photo");
        return picture;
      });
    })();
    authorPictureRequests.set(event.id, request);
  }
  return authorPictureRequests.get(event.id);
};
const renderEventDescription = (container, event) => {
  container.replaceChildren(...event.description.split(/\n\n+/).map((paragraph) => {
    const element = document.createElement("p");
    element.textContent = paragraph;
    return element;
  }));
  if (!event.registrationUrl) return;
  const registration = document.createElement("div");
  registration.className = "event-preview-registration";
  const prompt = document.createElement("strong");
  prompt.textContent = "Register in advance for the meeting here:";
  const link = document.createElement("a");
  link.href = event.registrationUrl;
  link.textContent = event.registrationUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  registration.append(prompt, document.createElement("br"), link);
  container.after(registration);
};
const sortedEvents = [...events].sort((a, b) => `${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`));
const eventHref = (event) => `event-detail.html?id=${encodeURIComponent(event.id)}&from=${encodeURIComponent(`index.html${location.search}`)}`;
const dayListHref = (date) => `index.html?view=list&day=${encodeURIComponent(date)}`;
let activePreviewTrigger = null;
const closeEventPreview = () => {
  document.querySelector(".event-preview")?.remove();
  if (activePreviewTrigger?.isConnected) activePreviewTrigger.focus({ preventScroll: true });
  activePreviewTrigger = null;
};
const openEventPreview = (event, trigger) => {
  closeEventPreview();
  activePreviewTrigger = trigger;
  const preview = document.createElement("section");
  preview.className = "event-preview";
  preview.setAttribute("role", "dialog");
  preview.setAttribute("aria-label", `${event.title} preview`);
  preview.innerHTML = `
    <button class="event-preview-close" type="button" aria-label="Close event preview"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="m3 3 6 6M9 3 3 9"/></svg></button>
    <div class="event-preview-body">
      <div class="event-preview-heading">
        <div class="event-preview-date"><span></span><strong></strong></div>
        <a class="event-preview-title"></a>
      </div>
      <div class="event-preview-meta">
        <div class="event-preview-meta-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          <span class="event-preview-date-time"></span>
        </div>
        <div class="event-preview-meta-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          <span class="event-preview-location"></span>
        </div>
        <div class="event-preview-meta-row event-preview-attendance-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19ZM16 5.5a3 3 0 0 1 0 5.8M17 14a4.5 4.5 0 0 1 3.5 4.4V19"/></svg>
          <span class="event-preview-attendees"></span>
        </div>
      </div>
      <div class="event-preview-description"></div>
      <div class="event-preview-people">
        <div class="event-preview-authors"></div>
      </div>
    </div>
    <div class="event-preview-footer"><a href="${eventHref(event)}">View details</a></div>`;
  document.body.append(preview);
  preview.querySelector(".event-preview-date span").textContent = formatDate(event.date, { month: "short" });
  preview.querySelector(".event-preview-date strong").textContent = dateOf(event.date).getDate();
  const titleLink = preview.querySelector(".event-preview-title");
  titleLink.href = eventHref(event);
  titleLink.textContent = event.title;
  preview.querySelector(".event-preview-date-time").textContent = formatEventDateTime(event);
  preview.querySelector(".event-preview-location").innerHTML = locationMarkup(event.location);
  preview.querySelector(".event-preview-attendees").textContent = `${event.attendees} attending`;
  preview.querySelector(".event-preview-attendance-row").hidden = Boolean(event.allDay);
  renderEventDescription(preview.querySelector(".event-preview-description"), event);
  const authors = preview.querySelector(".event-preview-authors");
  event.authors.forEach((author, index) => {
    const person = document.createElement("div");
    person.className = "event-preview-person-row";
    const userIcon = index === 0
      ? '<svg class="event-preview-person-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>'
      : '<span aria-hidden="true"></span>';
    person.innerHTML = `${userIcon}<span class="event-preview-person-avatar" aria-hidden="true"></span><div><small>Author</small><strong></strong></div>`;
    person.querySelector(".event-preview-person-avatar").textContent = organizerInitials(author);
    person.querySelector("strong").textContent = author;
    authors.append(person);
  });
  loadAuthorPictures(event).then((pictures) => {
    if (!preview.isConnected) return;
    preview.querySelectorAll(".event-preview-person-avatar").forEach((avatar, index) => {
      const image = document.createElement("img");
      image.src = pictures[index];
      image.alt = "";
      image.addEventListener("error", () => image.remove(), { once: true });
      avatar.append(image);
    });
  }).catch((error) => {
    console.error("Unable to load sample author photos.", error);
  });
  preview.querySelector(".event-preview-registration")?.remove();
  const triggerRect = trigger.getBoundingClientRect();
  const previewRect = preview.getBoundingClientRect();
  const left = Math.max(12, Math.min(triggerRect.left, window.innerWidth - previewRect.width - 12));
  const below = triggerRect.bottom + 8;
  const top = below + previewRect.height <= window.innerHeight - 12
    ? below
    : Math.max(12, triggerRect.top - previewRect.height - 8);
  preview.style.left = `${left}px`;
  preview.style.top = `${top}px`;
  preview.querySelector(".event-preview-close").addEventListener("click", closeEventPreview);
  preview.querySelector(".event-preview-close").focus();
};
content.addEventListener("click", (clickEvent) => {
  const trigger = clickEvent.target.closest(".calendar-event, .multi-day-event, .week-event");
  if (!trigger) return;
  clickEvent.preventDefault();
  const eventId = new URL(trigger.href).searchParams.get("id");
  const selectedEvent = events.find((event) => event.id === eventId);
  if (!selectedEvent) return;
  openEventPreview(selectedEvent, trigger);
});
document.addEventListener("click", (clickEvent) => {
  if (!document.querySelector(".event-preview")) return;
  if (clickEvent.target.closest(".event-preview, .calendar-event, .multi-day-event, .week-event")) return;
  closeEventPreview();
});
document.addEventListener("keydown", (keyEvent) => {
  if (keyEvent.key === "Escape" && document.querySelector(".event-preview")) closeEventPreview();
});
const syncUrl = () => {
  const params = new URLSearchParams();
  if (state.view !== "list" || state.day) params.set("view", state.view);
  if (state.dateFilter !== "all") params.set("date", state.dateFilter);
  if (state.day && state.view === "list") params.set("day", state.day);
  if (state.query) params.set("q", state.query);
  state.rsvps.forEach((rsvp) => params.append("rsvp", rsvp));
  if (state.view === "calendar") {
    params.set("calendar", state.calendarMode);
    if (state.calendarMode === "week") {
      params.set("week", `${state.month.getFullYear()}-${pad(state.month.getMonth() + 1)}-${pad(state.month.getDate())}`);
    } else {
      params.set("month", `${state.month.getFullYear()}-${pad(state.month.getMonth() + 1)}`);
    }
  }
  history.replaceState(null, "", `${location.pathname}${params.size ? `?${params}` : ""}`);
};
const filteredEvents = () => sortedEvents.filter((event) => {
  const matchesQuery = `${event.title} ${event.location} ${event.topics.join(" ")}`.toLowerCase().includes(state.query.toLowerCase());
  const matchesDate = state.dateFilter === "all" || (state.dateFilter === "future" ? dateOf(event.endDate || event.date) >= today : dateOf(event.endDate || event.date) < today);
  const matchesDay = !state.day || eventCoversDate(event, state.day);
  const matchesRsvp = !state.rsvps.length || state.rsvps.includes(event.rsvp);
  return matchesQuery && matchesDate && matchesDay && matchesRsvp;
});
const dateTile = (event) => `<div class="date-tile" aria-label="${formatDate(event.date)}"><span class="date-month">${formatDate(event.date, { month: "short" })}</span><span class="date-day">${dateOf(event.date).getDate()}</span></div>`;
const renderList = () => {
  const items = filteredEvents();
  if (!items.length) {
    content.innerHTML = `<div class="empty-state"><strong>No events found</strong>Try another search or clear your filters.</div>`;
    return;
  }
  content.innerHTML = `<div class="event-list">${items.map((event) => `
    <article class="event-row">
      ${dateTile(event)}
      <div class="event-copy">
        <h3 class="event-title"><a href="${eventHref(event)}">${event.title}</a></h3>
        <div class="event-details"><span>${formatEventDateTime(event, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span><span>${locationMarkup(event.location)}</span>${event.allDay ? "" : `<span>${event.attendees} attending</span>`}</div>
      </div>
    </article>`).join("")}</div>`;
};
const renderMonth = () => {
  const year = state.month.getFullYear();
  const month = state.month.getMonth();
  periodTitle.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(state.month);
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - ((first.getDay() + 6) % 7));
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeks = [];
  const visibleEvents = filteredEvents();
  const leadingDays = (first.getDay() + 6) % 7;
  const weekCount = Math.ceil((leadingDays + new Date(year, month + 1, 0).getDate()) / 7);
  for (let week = 0; week < weekCount; week += 1) {
    const days = Array.from({ length: 7 }, (_, dayIndex) => {
      const day = new Date(start);
      day.setDate(start.getDate() + week * 7 + dayIndex);
      return day;
    });
    const dates = days.map((day) => `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`);
    const multiDayEvents = visibleEvents.filter((event) => isMultiDayEvent(event) && dates.some((date) => eventCoversDate(event, date)));
    const lanes = [];
    const bars = multiDayEvents.map((event) => {
      const firstDay = Math.max(0, dates.findIndex((date) => eventCoversDate(event, date)));
      let lastDay = firstDay;
      for (let index = firstDay; index < dates.length && eventCoversDate(event, dates[index]); index += 1) lastDay = index;
      let lane = lanes.findIndex((laneEnd) => laneEnd < firstDay);
      if (lane === -1) lane = lanes.length;
      lanes[lane] = lastDay;
      const left = (firstDay / 7) * 100;
      const width = ((lastDay - firstDay + 1) / 7) * 100;
      const label = event.allDay
        ? `All day · ${event.title}`
        : `${formatTime(event.start)}–${formatTime(event.end)}${event.dailySchedule ? " daily" : ""} · ${event.title}`;
      return `<a class="multi-day-event" href="${eventHref(event)}" title="${formatEventDateTime(event)} · ${event.title}" style="left:${left}%;width:${width}%;top:${31 + lane * 20}px">${label}</a>`;
    }).join("");
    const cells = days.map((day, dayIndex) => {
      const dateString = dates[dayIndex];
      const dayEvents = visibleEvents.filter((event) => !isMultiDayEvent(event) && eventCoversDate(event, dateString));
      const shownEvents = dayEvents.slice(0, maxVisibleEventsPerDay);
      const moreLink = dayEvents.length > shownEvents.length ? `<a class="calendar-more" href="${dayListHref(dateString)}">+${dayEvents.length - shownEvents.length} more</a>` : "";
      return `<div class="day-cell${day.getMonth() !== month ? " outside" : ""}${dateString === "2026-10-13" ? " today" : ""}"><span class="day-number">${day.getDate()}</span>${shownEvents.map((event) => `<a class="calendar-event" href="${eventHref(event)}" title="${formatEventDateTime(event)} · ${event.title}">${event.allDay ? "All day" : `${formatTime(event.start)}–${formatTime(event.end)}`} ${event.title}</a>`).join("")}${moreLink}</div>`;
    }).join("");
    weeks.push(`<div class="month-week" style="--multi-day-lanes:${lanes.length}">${cells}${bars}</div>`);
  }
  content.innerHTML = `<div class="month-grid">${weekdays.map((day) => `<div class="weekday">${day}</div>`).join("")}${weeks.join("")}</div>`;
};
const renderWeek = () => {
  const dayOfWeek = (state.month.getDay() + 6) % 7;
  const monday = new Date(state.month);
  monday.setDate(state.month.getDate() - dayOfWeek);
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);
    return day;
  });
  periodTitle.textContent = `${formatDate(`${weekDays[0].getFullYear()}-${pad(weekDays[0].getMonth() + 1)}-${pad(weekDays[0].getDate())}`, { month: "short", day: "numeric" })} – ${formatDate(`${weekDays[6].getFullYear()}-${pad(weekDays[6].getMonth() + 1)}-${pad(weekDays[6].getDate())}`, { month: "short", day: "numeric", year: "numeric" })}`;
  const rows = [];
  const eventsByDay = weekDays.map((day) => {
    const date = `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`;
    return { date, events: filteredEvents().filter((event) => eventCoversDate(event, date)) };
  });
  const weekDates = eventsByDay.map(({ date }) => date);
  const multiDayEvents = filteredEvents().filter((event) => event.allDay && isMultiDayEvent(event) && weekDates.some((date) => eventCoversDate(event, date)));
  const allDayLanes = [];
  const multiDayBars = multiDayEvents.map((event) => {
    const firstDay = Math.max(0, weekDates.findIndex((date) => eventCoversDate(event, date)));
    let lastDay = firstDay;
    for (let index = firstDay; index < weekDates.length && eventCoversDate(event, weekDates[index]); index += 1) lastDay = index;
    let lane = allDayLanes.findIndex((laneEnd) => laneEnd < firstDay);
    if (lane === -1) lane = allDayLanes.length;
    allDayLanes[lane] = lastDay;
    const daySpan = lastDay - firstDay + 1;
    const left = `calc(52px + (100% - 52px) * ${firstDay / 7})`;
    const width = `calc((100% - 52px) * ${daySpan / 7})`;
    return `<a class="week-all-day-event week-event" href="${eventHref(event)}" title="${formatEventDateTime(event)} · ${event.title}" style="left:${left};width:${width};top:${2 + lane * 20}px">${event.title}</a>`;
  });
  const allDayCells = eventsByDay.map(({ date, events: dayEvents }) => {
    const singleDayEvents = dayEvents.filter((event) => event.allDay && !isMultiDayEvent(event));
    const shownAllDayEvents = singleDayEvents.slice(0, maxVisibleEventsPerDay);
    const moreAllDay = singleDayEvents.length > shownAllDayEvents.length
      ? `<a class="week-more" href="${dayListHref(date)}">+${singleDayEvents.length - shownAllDayEvents.length} more</a>`
      : "";
    return `<div class="week-all-day-cell">${shownAllDayEvents.map((event) => `<a class="week-all-day-event week-event" href="${eventHref(event)}" title="${formatEventDateTime(event)} · ${event.title}">${event.title}</a>`).join("")}${moreAllDay}</div>`;
  }).join("");
  rows.push(`<div class="week-grid week-all-day-row" style="--multi-day-lanes:${allDayLanes.length}"><div class="week-all-day-time">All day</div>${allDayCells}${multiDayBars}</div>`);
  for (let hour = 0; hour < 24; hour += 1) {
    rows.push(`<div class="week-time">${new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(new Date(2026, 0, 1, hour))}</div>`);
    eventsByDay.forEach(({ date, events: dayEvents }) => {
      const timedEvents = dayEvents.filter((event) => !event.allDay);
      const visibleEvents = timedEvents.slice(0, maxVisibleEventsPerDay);
      const eventsAtHour = visibleEvents.filter((event) => Number(event.start.slice(0, 2)) === hour);
      const showMore = timedEvents.length > maxVisibleEventsPerDay && visibleEvents.length && Number(visibleEvents[visibleEvents.length - 1].start.slice(0, 2)) === hour;
      const more = showMore ? `<a class="week-more" href="${dayListHref(date)}">+${timedEvents.length - visibleEvents.length} more</a>` : "";
      rows.push(`<div class="week-cell${eventsAtHour.some(isMultiDayEvent) ? " week-cell-has-multi-day" : ""}">${eventsAtHour.map((event) => {
        const durationMinutes = Number(event.end.slice(0, 2)) * 60 + Number(event.end.slice(3)) - (Number(event.start.slice(0, 2)) * 60 + Number(event.start.slice(3)));
        const durationHeight = Math.max(18, (durationMinutes / 60) * 42 - 6);
        const multiDayStyle = isMultiDayEvent(event) ? ` week-multi-day-timed-event" style="height:${durationHeight}px` : "";
        return `<a class="week-event${multiDayStyle}" href="${eventHref(event)}" title="${formatEventDateTime(event)}">${formatTime(event.start)}–${formatTime(event.end)} ${event.title}</a>`;
      }).join("")}${more}</div>`);
    });
  }
  content.innerHTML = `<div class="week-scroll"><div class="week-grid week-head"><div></div>${weekDays.map((day) => `<div>${new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(day)}<strong>${day.getDate()}</strong></div>`).join("")}</div><div class="week-grid">${rows.join("")}</div></div>`;
};
const render = () => {
  syncUrl();
  document.querySelectorAll("[data-view]").forEach((button) => {
    const selected = button.dataset.view === state.view;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  calendarToolbar.hidden = state.view !== "calendar";
  document.getElementById("calendarShortcut").hidden = state.view === "calendar";
  if (state.view === "list") renderList();
  else if (state.calendarMode === "week") renderWeek();
  else renderMonth();
  const count = state.rsvps.length + (state.dateFilter !== "all" ? 1 : 0);
  document.getElementById("filterCount").hidden = count === 0;
  document.getElementById("filterCount").textContent = count;
};
const initialParams = new URLSearchParams(location.search);
const monthParam = initialParams.get("month");
const weekParam = initialParams.get("week");
if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
  const [year, month] = monthParam.split("-").map(Number);
  state.month = new Date(year, month - 1, 13);
}
if (weekParam && /^\d{4}-\d{2}-\d{2}$/.test(weekParam)) {
  const [year, month, day] = weekParam.split("-").map(Number);
  state.month = new Date(year, month - 1, day);
}
searchInput.value = state.query;
document.querySelectorAll('input[name="dateFilter"]').forEach((radio) => { radio.checked = radio.value === state.dateFilter; });
document.querySelectorAll('input[name="rsvpFilter"]').forEach((checkbox) => { checkbox.checked = state.rsvps.includes(checkbox.value); });
calendarMode.value = state.calendarMode;
document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => { state.view = button.dataset.view; render(); }));
document.getElementById("calendarShortcut").addEventListener("click", (event) => {
  event.preventDefault();
  state.view = "calendar";
  render();
});
searchInput.addEventListener("input", () => { state.query = searchInput.value.trim(); render(); });
filterToggle.addEventListener("click", () => {
  const open = filterPanel.hidden;
  filterPanel.hidden = !open;
  filterToggle.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".filter-wrap")) {
    filterPanel.hidden = true;
    filterToggle.setAttribute("aria-expanded", "false");
  }
});
document.querySelectorAll('input[name="dateFilter"]').forEach((radio) => radio.addEventListener("change", () => { state.dateFilter = radio.value; render(); }));
document.querySelectorAll('input[name="rsvpFilter"]').forEach((checkbox) => checkbox.addEventListener("change", () => {
  state.rsvps = [...document.querySelectorAll('input[name="rsvpFilter"]:checked')].map((item) => item.value);
  render();
}));
document.getElementById("clearFilters").addEventListener("click", () => {
  state.dateFilter = "all";
  state.rsvps = [];
  document.querySelector('input[name="dateFilter"][value="all"]').checked = true;
  document.querySelectorAll('input[name="rsvpFilter"]').forEach((checkbox) => { checkbox.checked = false; });
  render();
});
calendarMode.addEventListener("change", () => { state.calendarMode = calendarMode.value; render(); });
document.getElementById("previousPeriod").addEventListener("click", () => {
  state.month = new Date(state.month.getFullYear(), state.month.getMonth() - (state.calendarMode === "week" ? 0 : 1), state.month.getDate() - (state.calendarMode === "week" ? 7 : 0));
  render();
});
document.getElementById("nextPeriod").addEventListener("click", () => {
  state.month = new Date(state.month.getFullYear(), state.month.getMonth() + (state.calendarMode === "week" ? 0 : 1), state.month.getDate() + (state.calendarMode === "week" ? 7 : 0));
  render();
});
document.getElementById("todayButton").addEventListener("click", () => { state.month = new Date(2026, 9, 13); render(); });
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});
render();
