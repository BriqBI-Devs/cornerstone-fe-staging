document.getElementById("outlookCalendar").href = OutlookSync.calendarUrl();
// Calendar page: month and week grids that only load the visible range.
const { api, todayString, toDateString, formatTime, formatDate, formatEventDateTime, eventCoversDate, isMultiDayEvent, locationMarkup, eventHref, listHref, emptyState } = EventsKit;
const content = document.getElementById("eventsContent");
const periodTitle = document.getElementById("periodTitle");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const urlParams = new URLSearchParams(location.search);
const state = {
  rsvps: urlParams.getAll("rsvp"),
  anchor: new Date(2026, 9, 13),
  mode: urlParams.get("calendar") === "week" ? "week" : "month",
};
const maxVisibleEventsPerDay = 2;
const fromHere = () => `index.html${location.search}`;
const dayListHref = (date) => listHref({ date: "all", day: date });
const syncUrl = () => {
  const params = new URLSearchParams();
  state.rsvps.forEach((rsvp) => params.append("rsvp", rsvp));
  if (state.mode === "week") params.set("calendar", "week");
  history.replaceState(null, "", `${location.pathname}${params.size ? `?${params}` : ""}`);
};

// The visible date range is the only thing the backend is asked for.
const monthGridStart = () => {
  const first = new Date(state.anchor.getFullYear(), state.anchor.getMonth(), 1);
  return new Date(first.getFullYear(), first.getMonth(), 1 - ((first.getDay() + 6) % 7));
};
// Weeks the visible month needs (4-6), so no row of next month's days is drawn for nothing.
const monthWeekCount = () => {
  const year = state.anchor.getFullYear();
  const month = state.anchor.getMonth();
  const leadingDays = (new Date(year, month, 1).getDay() + 6) % 7;
  return Math.ceil((leadingDays + new Date(year, month + 1, 0).getDate()) / 7);
};
const weekStart = () => {
  const monday = new Date(state.anchor);
  monday.setDate(state.anchor.getDate() - ((state.anchor.getDay() + 6) % 7));
  return monday;
};
const addDays = (day, count) => { const next = new Date(day); next.setDate(day.getDate() + count); return next; };
const visibleRange = () => {
  const start = state.mode === "week" ? weekStart() : monthGridStart();
  return { from: toDateString(start), to: toDateString(addDays(start, state.mode === "week" ? 6 : monthWeekCount() * 7 - 1)) };
};

// --- Event preview popover ---
let activeTrigger = null;
let loadedEvents = [];
const closePreview = () => {
  document.querySelector(".event-preview")?.remove();
  if (activeTrigger?.isConnected) activeTrigger.focus({ preventScroll: true });
  activeTrigger = null;
};
const openPreview = (event, trigger) => {
  closePreview();
  activeTrigger = trigger;
  const preview = document.createElement("section");
  preview.className = "event-preview";
  preview.setAttribute("role", "dialog");
  preview.setAttribute("aria-label", `${event.title} preview`);
  preview.innerHTML = `
    <button class="event-preview-close" type="button" aria-label="Close event preview"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="m3 3 6 6M9 3 3 9"/></svg></button>
    <div class="event-preview-body">
      <a class="event-preview-title"></a>
      <div class="event-preview-meta"><span class="pv-when"></span><span class="pv-where"></span><span class="pv-count"></span></div>
      <p class="event-preview-description"></p>
    </div>
    <div class="event-preview-footer"><a href="${eventHref(event, fromHere())}">View details →</a></div>`;
  document.body.append(preview);
  const title = preview.querySelector(".event-preview-title");
  title.href = eventHref(event, fromHere());
  title.textContent = event.title;
  preview.querySelector(".pv-when").textContent = formatEventDateTime(event);
  preview.querySelector(".pv-where").innerHTML = locationMarkup(event.location);
  preview.querySelector(".pv-count").textContent = event.allDay ? "" : `${event.attendees} attending`;
  preview.querySelector(".event-preview-description").textContent = event.description.split(/\n\n+/)[0];
  const rect = trigger.getBoundingClientRect();
  const box = preview.getBoundingClientRect();
  const below = rect.bottom + 8;
  preview.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - box.width - 12))}px`;
  preview.style.top = `${below + box.height <= window.innerHeight - 12 ? below : Math.max(12, rect.top - box.height - 8)}px`;
  preview.querySelector(".event-preview-close").addEventListener("click", closePreview);
  preview.querySelector(".event-preview-close").focus();
};
content.addEventListener("click", (clickEvent) => {
  const trigger = clickEvent.target.closest(".calendar-event, .multi-day-event, .week-event");
  if (!trigger) return;
  clickEvent.preventDefault();
  const selected = loadedEvents.find((item) => item.id === new URL(trigger.href).searchParams.get("id"));
  if (selected) openPreview(selected, trigger);
});
document.addEventListener("click", (clickEvent) => {
  if (document.querySelector(".event-preview") && !clickEvent.target.closest(".event-preview, .calendar-event, .multi-day-event, .week-event")) closePreview();
});
document.addEventListener("keydown", (keyEvent) => {
  if (keyEvent.key === "Escape" && document.querySelector(".event-preview")) closePreview();
});

// --- Month view ---
const renderMonth = (visible) => {
  const month = state.anchor.getMonth();
  periodTitle.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(state.anchor);
  const start = monthGridStart();
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeks = [];
  for (let week = 0; week < monthWeekCount(); week += 1) {
    const days = Array.from({ length: 7 }, (_, index) => addDays(start, week * 7 + index));
    const dates = days.map(toDateString);
    const multiDay = visible.filter((event) => isMultiDayEvent(event) && dates.some((date) => eventCoversDate(event, date)));
    const lanes = [];
    const bars = multiDay.map((event) => {
      const firstDay = Math.max(0, dates.findIndex((date) => eventCoversDate(event, date)));
      let lastDay = firstDay;
      for (let index = firstDay; index < dates.length && eventCoversDate(event, dates[index]); index += 1) lastDay = index;
      let lane = lanes.findIndex((laneEnd) => laneEnd < firstDay);
      if (lane === -1) lane = lanes.length;
      lanes[lane] = lastDay;
      const label = event.allDay ? `All day · ${event.title}` : `${formatTime(event.start)}–${formatTime(event.end)}${event.dailySchedule ? " daily" : ""} · ${event.title}`;
      return `<a class="multi-day-event" href="${eventHref(event, fromHere())}" title="${formatEventDateTime(event)}" style="left:${(firstDay / 7) * 100}%;width:${((lastDay - firstDay + 1) / 7) * 100}%;top:${31 + lane * 20}px">${label}</a>`;
    }).join("");
    const cells = days.map((day, index) => {
      const dateString = dates[index];
      const dayEvents = visible.filter((event) => !isMultiDayEvent(event) && eventCoversDate(event, dateString));
      const shown = dayEvents.slice(0, maxVisibleEventsPerDay);
      const more = dayEvents.length > shown.length ? `<a class="calendar-more" href="${dayListHref(dateString)}">+${dayEvents.length - shown.length} more</a>` : "";
      return `<div class="day-cell${day.getMonth() !== month ? " outside" : ""}${dateString === todayString ? " today" : ""}"><span class="day-number">${day.getDate()}</span>${shown.map((event) => `<a class="calendar-event" href="${eventHref(event, fromHere())}" title="${formatEventDateTime(event)}">${event.allDay ? "All day" : `${formatTime(event.start)}–${formatTime(event.end)}`} ${event.title}</a>`).join("")}${more}</div>`;
    }).join("");
    weeks.push(`<div class="month-week" style="--multi-day-lanes:${lanes.length}">${cells}${bars}</div>`);
  }
  content.innerHTML = `<div class="month-grid">${weekdays.map((day) => `<div class="weekday">${day}</div>`).join("")}${weeks.join("")}</div>`;
};

// --- Week view ---
const renderWeek = (visible) => {
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart(), index));
  periodTitle.textContent = `${formatDate(toDateString(weekDays[0]), { month: "short", day: "numeric" })} – ${formatDate(toDateString(weekDays[6]), { month: "short", day: "numeric", year: "numeric" })}`;
  const eventsByDay = weekDays.map((day) => {
    const date = toDateString(day);
    return { date, events: visible.filter((event) => eventCoversDate(event, date)) };
  });
  const weekDates = eventsByDay.map(({ date }) => date);
  const multiDay = visible.filter((event) => event.allDay && isMultiDayEvent(event) && weekDates.some((date) => eventCoversDate(event, date)));
  const lanes = [];
  const bars = multiDay.map((event) => {
    const firstDay = Math.max(0, weekDates.findIndex((date) => eventCoversDate(event, date)));
    let lastDay = firstDay;
    for (let index = firstDay; index < weekDates.length && eventCoversDate(event, weekDates[index]); index += 1) lastDay = index;
    let lane = lanes.findIndex((laneEnd) => laneEnd < firstDay);
    if (lane === -1) lane = lanes.length;
    lanes[lane] = lastDay;
    return `<a class="week-all-day-event week-event" href="${eventHref(event, fromHere())}" title="${formatEventDateTime(event)}" style="left:calc(52px + (100% - 52px) * ${firstDay / 7});width:calc((100% - 52px) * ${(lastDay - firstDay + 1) / 7});top:${2 + lane * 20}px">${event.title}</a>`;
  });
  const allDayCells = eventsByDay.map(({ date, events: dayEvents }) => {
    const single = dayEvents.filter((event) => event.allDay && !isMultiDayEvent(event));
    const shown = single.slice(0, maxVisibleEventsPerDay);
    const more = single.length > shown.length ? `<a class="week-more" href="${dayListHref(date)}">+${single.length - shown.length} more</a>` : "";
    return `<div class="week-all-day-cell">${shown.map((event) => `<a class="week-all-day-event week-event" href="${eventHref(event, fromHere())}">${event.title}</a>`).join("")}${more}</div>`;
  }).join("");
  const rows = [`<div class="week-grid week-all-day-row" style="--multi-day-lanes:${lanes.length}"><div class="week-all-day-time">All day</div>${allDayCells}${bars.join("")}</div>`];
  for (let hour = 0; hour < 24; hour += 1) {
    rows.push(`<div class="week-time">${new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(new Date(2026, 0, 1, hour))}</div>`);
    eventsByDay.forEach(({ date, events: dayEvents }) => {
      const timed = dayEvents.filter((event) => !event.allDay);
      const shown = timed.slice(0, maxVisibleEventsPerDay);
      const atHour = shown.filter((event) => Number(event.start.slice(0, 2)) === hour);
      const showMore = timed.length > maxVisibleEventsPerDay && shown.length && Number(shown[shown.length - 1].start.slice(0, 2)) === hour;
      const more = showMore ? `<a class="week-more" href="${dayListHref(date)}">+${timed.length - shown.length} more</a>` : "";
      rows.push(`<div class="week-cell${atHour.some(isMultiDayEvent) ? " week-cell-has-multi-day" : ""}">${atHour.map((event) => {
        const minutes = Number(event.end.slice(0, 2)) * 60 + Number(event.end.slice(3)) - (Number(event.start.slice(0, 2)) * 60 + Number(event.start.slice(3)));
        const style = isMultiDayEvent(event) ? ` week-multi-day-timed-event" style="height:${Math.max(18, (minutes / 60) * 42 - 6)}px` : "";
        return `<a class="week-event${style}" href="${eventHref(event, fromHere())}" title="${formatEventDateTime(event)}">${formatTime(event.start)}–${formatTime(event.end)} ${event.title}</a>`;
      }).join("")}${more}</div>`);
    });
  }
  content.innerHTML = `<div class="week-scroll"><div class="week-grid week-head"><div></div>${weekDays.map((day) => `<div>${new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(day)}<strong>${day.getDate()}</strong></div>`).join("")}</div><div class="week-grid">${rows.join("")}</div></div>`;
};

// Late responses from superseded requests are discarded.
let requestId = 0;
const render = async () => {
  const thisRequest = ++requestId;
  syncUrl();
  closePreview();
  document.querySelectorAll("[data-mode]").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
  const count = document.getElementById("filterCount");
  count.hidden = state.rsvps.length === 0;
  count.textContent = state.rsvps.length;
  content.setAttribute("aria-busy", "true");
  try {
    const visible = await api.listRange({ ...visibleRange(), rsvps: state.rsvps });
    if (thisRequest !== requestId) return;
    loadedEvents = visible;
    state.mode === "week" ? renderWeek(visible) : renderMonth(visible);
  } catch (error) {
    if (thisRequest !== requestId) return;
    console.error("Unable to load calendar events.", error);
    content.innerHTML = emptyState("We couldn't load this period", `<button type="button" class="btn" id="retryLoad" style="margin-top:14px">Retry</button>`);
    document.getElementById("retryLoad").addEventListener("click", render);
  } finally {
    if (thisRequest === requestId) content.removeAttribute("aria-busy");
  }
};
const shift = (direction) => {
  state.anchor = state.mode === "week"
    ? addDays(state.anchor, direction * 7)
    : new Date(state.anchor.getFullYear(), state.anchor.getMonth() + direction, 13);
  render();
};

document.querySelectorAll('input[name="rsvpFilter"]').forEach((box) => {
  box.checked = state.rsvps.includes(box.value);
  box.addEventListener("change", () => {
    state.rsvps = [...document.querySelectorAll('input[name="rsvpFilter"]:checked')].map((item) => item.value);
    render();
  });
});
filterToggle.addEventListener("click", () => {
  filterPanel.hidden = !filterPanel.hidden;
  filterToggle.setAttribute("aria-expanded", String(!filterPanel.hidden));
});
document.addEventListener("click", (clickEvent) => {
  if (!clickEvent.target.closest(".filter-wrap")) {
    filterPanel.hidden = true;
    filterToggle.setAttribute("aria-expanded", "false");
  }
});
document.getElementById("clearFilters").addEventListener("click", () => {
  state.rsvps = [];
  document.querySelectorAll('input[name="rsvpFilter"]').forEach((box) => { box.checked = false; });
  render();
});
document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => { state.mode = button.dataset.mode; render(); }));
document.getElementById("previousPeriod").addEventListener("click", () => shift(-1));
document.getElementById("nextPeriod").addEventListener("click", () => shift(1));
document.getElementById("todayButton").addEventListener("click", () => { state.anchor = new Date(2026, 9, 13); render(); });
render();

// The calendar always shows every event. A search opens the list with the results.
const searchInput = document.getElementById("searchInput");
const openResults = () => {
  const query = searchInput.value.trim();
  if (query) location.href = listHref({ q: query, date: "all" });
};
let searchTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(openResults, 600);
});
searchInput.addEventListener("keydown", (keyEvent) => {
  if (keyEvent.key === "Enter") { clearTimeout(searchTimer); openResults(); }
});
document.getElementById("searchButton").addEventListener("click", () => { clearTimeout(searchTimer); openResults(); });
