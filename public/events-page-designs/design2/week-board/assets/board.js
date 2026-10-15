// Week board page: one week of events as seven day columns, with a quick-view drawer.
(() => {
  const { dates, rsvp, api, ui } = EventsApp;
  const { RSVP, needsRsvp } = rsvp;
  const { esc, icon, locationHtml, statusChip, mountRsvpButtons, emptyState } = ui;
  const $ = (id) => document.getElementById(id);

  const FILTERS = [["all", "All"], ["Yes", "Going"], ["Maybe", "Maybe"], ["Pending", "Needs response"]];
  const params = new URLSearchParams(location.search);
  const state = {
    weekStart: dates.weekStart(params.get("week") || dates.TODAY),
    query: params.get("q") || "",
    filter: FILTERS.some(([value]) => value === params.get("show")) ? params.get("show") : "all",
  };
  let weekEvents = [];
  let requestId = 0;

  // ---- URL ----
  const syncUrl = () => {
    const next = new URLSearchParams();
    if (state.weekStart !== dates.weekStart(dates.TODAY)) next.set("week", state.weekStart);
    if (state.query) next.set("q", state.query);
    if (state.filter !== "all") next.set("show", state.filter);
    history.replaceState(null, "", `${location.pathname}${next.size ? `?${next}` : ""}`);
  };
  const detailHref = (event) => `event-detail.html?id=${encodeURIComponent(event.id)}&week=${state.weekStart}`;

  // ---- Rendering ----
  const visibleEvents = () =>
    state.filter === "all" ? weekEvents : weekEvents.filter((event) => needsRsvp(event) && event.rsvp === state.filter);

  const renderControls = () => {
    const end = dates.addDays(state.weekStart, 6);
    $("weekTitle").textContent = `${dates.format(state.weekStart, { month: "short", day: "numeric" })} – ${dates.format(end, { month: "short", day: "numeric", year: "numeric" })}`;
    $("rsvpFilter").innerHTML = FILTERS.map(([value, label]) => {
      const count = value === "all" ? weekEvents.length : weekEvents.filter((event) => needsRsvp(event) && event.rsvp === value).length;
      return `<button type="button" data-filter="${value}" aria-pressed="${state.filter === value}">${label} <span class="count">${count}</span></button>`;
    }).join("");
  };

  const eventCard = (event, day) => {
    const tone = needsRsvp(event) ? ` tone-${RSVP[event.rsvp].tone}` : "";
    const note = dates.isMultiDay(event) ? `<span class="event-note">${dates.dayPosition(event, day)}</span>` : "";
    return `
      <button type="button" class="event-card${tone}" data-id="${esc(event.id)}">
        <span class="event-time">${dates.timeLabel(event)}</span>
        <span class="event-title">${esc(event.title)}</span>
        <span class="event-meta">${esc(event.location)}</span>
        <span class="event-foot">${statusChip(event)}${note}</span>
      </button>`;
  };

  const dayColumn = (day, items) => {
    const isToday = day === dates.TODAY;
    return `
      <section class="day${isToday ? " is-today" : ""}" aria-label="${dates.format(day, { weekday: "long", month: "long", day: "numeric" })}">
        <header class="day-head">
          <span class="day-name">${dates.format(day, { weekday: "short" })}</span>
          <span class="day-num">${dates.parse(day).getDate()}</span>
          ${isToday ? '<span class="day-today">Today</span>' : ""}
        </header>
        ${items.length
          ? `<ul class="day-list">${items.map((event) => `<li>${eventCard(event, day)}</li>`).join("")}</ul>`
          : '<p class="day-empty">No events</p>'}
      </section>`;
  };

  const renderBoard = () => {
    const items = visibleEvents();
    if (!items.length) {
      const reset = state.filter !== "all" || state.query ? '<button type="button" class="btn" id="resetFilters">Show everything this week</button>' : "";
      $("board").innerHTML = weekEvents.length
        ? emptyState("Nothing to show", "No events match this filter this week.", reset)
        : emptyState("No events this week", "Try another week, or clear your search.", reset);
      return;
    }
    $("board").innerHTML = Array.from({ length: 7 }, (_, index) => dates.addDays(state.weekStart, index))
      .map((day) => dayColumn(day, items.filter((event) => dates.covers(event, day))))
      .join("");
  };

  const renderSkeleton = () => {
    $("board").innerHTML = Array.from({ length: 7 }, () => `<div class="day" aria-hidden="true"><div class="skeleton skeleton-card"></div></div>`).join("");
  };

  const render = () => {
    renderControls();
    renderBoard();
  };

  // ---- Data loading. A response for a superseded request is ignored. ----
  const load = async () => {
    const thisRequest = ++requestId;
    syncUrl();
    renderControls();
    $("board").setAttribute("aria-busy", "true");
    renderSkeleton();
    try {
      const result = await api.listRange({ from: state.weekStart, to: dates.addDays(state.weekStart, 6), q: state.query });
      if (thisRequest !== requestId) return;
      weekEvents = result;
      render();
    } catch (error) {
      if (thisRequest !== requestId) return;
      console.error("Unable to load events.", error);
      $("board").innerHTML = emptyState("We couldn't load events", "Check your connection and try again.", '<button type="button" class="btn" id="retry">Retry</button>');
    } finally {
      if (thisRequest === requestId) $("board").removeAttribute("aria-busy");
    }
  };

  // ---- Drawer ----
  const drawer = $("drawer");
  const openDrawer = (event) => {
    const firstParagraph = event.description.split(/\n\n+/)[0];
    drawer.innerHTML = `
      <div class="drawer-head">
        <div>
          <h2 id="drawerTitle">${esc(event.title)}</h2>
          <span id="drawerChip">${statusChip(event)}</span>
        </div>
        <button type="button" class="icon-btn" id="drawerClose" aria-label="Close">${icon("close")}</button>
      </div>
      <div class="drawer-body">
        <ul class="facts">
          <li>${icon("calendar")}<span>${dates.rangeLabel(event)}</span></li>
          <li>${icon("clock")}<span>${dates.scheduleLabel(event)}</span></li>
          <li>${icon("pin")}<span>${locationHtml(event.location)}</span></li>
          ${event.allDay ? "" : `<li>${icon("people")}<span>${event.attendees} attending</span></li>`}
        </ul>
        <div class="prose"><p>${esc(firstParagraph)}</p></div>
        ${needsRsvp(event) ? '<p class="section-label">Your response</p><div class="rsvp-group" id="drawerRsvp"></div>' : ""}
      </div>
      <div class="drawer-foot"><a class="btn btn-primary" href="${detailHref(event)}">View full details</a></div>`;
    if (needsRsvp(event)) {
      mountRsvpButtons($("drawerRsvp"), event, (updated) => {
        weekEvents = weekEvents.map((item) => (item.id === updated.id ? updated : item));
        $("drawerChip").innerHTML = statusChip(updated);
        render();
      });
    }
    $("drawerClose").addEventListener("click", () => drawer.close());
    drawer.showModal();
  };
  drawer.addEventListener("click", (event) => {
    if (event.target === drawer) drawer.close();
  });

  // ---- Events ----
  $("prevWeek").innerHTML = icon("chevronLeft");
  $("nextWeek").innerHTML = icon("chevronRight");
  $("searchIcon").innerHTML = icon("search");
  const goToWeek = (weekStart) => {
    state.weekStart = weekStart;
    load();
  };
  $("prevWeek").addEventListener("click", () => goToWeek(dates.addDays(state.weekStart, -7)));
  $("nextWeek").addEventListener("click", () => goToWeek(dates.addDays(state.weekStart, 7)));
  $("thisWeek").addEventListener("click", () => goToWeek(dates.weekStart(dates.TODAY)));

  let searchTimer;
  $("search").addEventListener("input", (event) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = event.target.value.trim();
      load();
    }, 250);
  });

  $("rsvpFilter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.filter = button.dataset.filter;
    syncUrl();
    render();
  });

  $("board").addEventListener("click", (event) => {
    const card = event.target.closest(".event-card");
    if (card) return openDrawer(weekEvents.find((item) => item.id === card.dataset.id));
    if (event.target.closest("#retry")) return load();
    if (event.target.closest("#resetFilters")) {
      state.filter = "all";
      state.query = "";
      $("search").value = "";
      load();
    }
  });

  ui.mountHeader($("siteHeader"));
  $("search").value = state.query;
  load();
})();
