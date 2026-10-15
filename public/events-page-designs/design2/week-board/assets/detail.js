// Event detail page: full event, RSVP, and related events.
(() => {
  const { dates, rsvp, api, ui } = EventsApp;
  const { RSVP, needsRsvp } = rsvp;
  const { esc, icon, locationHtml, statusChip, mountRsvpButtons, emptyState } = ui;
  const root = document.getElementById("detail");

  const params = new URLSearchParams(location.search);
  const week = params.get("week");
  const weekQuery = week ? `&week=${encodeURIComponent(week)}` : "";
  const backHref = `index.html${week ? `?week=${encodeURIComponent(week)}` : ""}`;
  const initials = (name) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  const rsvpMessage = (event) => (event.rsvp === "Pending" ? "You haven't responded yet." : `Your response: ${RSVP[event.rsvp].label}`);

  const render = (event, related) => {
    document.title = `${event.title} | Cornerstone Events`;
    const backLink = `<a class="back-link" href="${backHref}">${icon("chevronLeft")} Back to this week</a>`;

    const rsvpCard = needsRsvp(event)
      ? `<section class="card aside-card">
           <h2>Will you attend?</h2>
           <div class="rsvp-group" id="rsvp"></div>
           <p class="rsvp-status" id="rsvpStatus" role="status">${rsvpMessage(event)}</p>
         </section>`
      : `<section class="card aside-card"><h2>No RSVP needed</h2><p class="rsvp-status">This one is open to everyone.</p></section>`;

    const registration = event.registrationUrl
      ? `<p class="registration"><strong>Register in advance:</strong><br><a href="${esc(event.registrationUrl)}" target="_blank" rel="noopener noreferrer">${esc(event.registrationUrl)}</a></p>`
      : "";

    root.innerHTML = `
      ${backLink}
      <div class="detail-hero"><img src="${esc(event.image)}" alt="${esc(event.imageAlt)}"></div>
      <h1 class="detail-title">${esc(event.title)}</h1>
      ${statusChip(event)}

      <div class="detail-layout">
        <article class="card detail-main">
          <ul class="facts">
            <li>${icon("calendar")}<span>${dates.rangeLabel(event)}</span></li>
            <li>${icon("clock")}<span>${dates.scheduleLabel(event)}</span></li>
            <li>${icon("pin")}<span>${locationHtml(event.location)}</span></li>
            ${event.allDay ? "" : `<li>${icon("people")}<span>${event.attendees} attending</span></li>`}
          </ul>
          <p class="section-label">About this event</p>
          <div class="prose">${event.description.split(/\n\n+/).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</div>
          ${registration}
          <div class="topics">${event.topics.map((topic) => `<span>${esc(topic)}</span>`).join("")}</div>
          <p class="section-label">Posted by</p>
          <div class="authors">${event.authors.map((name) => `<span class="author"><span class="avatar" aria-hidden="true">${initials(name)}</span>${esc(name)}</span>`).join("")}</div>
        </article>
        <aside class="detail-aside">${rsvpCard}</aside>
      </div>

      <section class="related">
        <h2>More events you might like</h2>
        <div class="related-grid">
          ${related.map((item) => `
            <a class="card related-card" href="event-detail.html?id=${encodeURIComponent(item.id)}${weekQuery}">
              <img src="${esc(item.image)}" alt="" loading="lazy">
              <div><small>${dates.format(item.date, { weekday: "short", month: "short", day: "numeric" })}</small><strong>${esc(item.title)}</strong></div>
            </a>`).join("")}
        </div>
      </section>
      <p class="prototype-note">Design concept · Sample event information</p>`;

    if (needsRsvp(event)) {
      mountRsvpButtons(document.getElementById("rsvp"), event, (updated) => {
        document.getElementById("rsvpStatus").textContent = rsvpMessage(updated);
      });
    }
  };

  const load = async () => {
    root.innerHTML = '<div class="skeleton" style="height:280px;border-radius:16px" aria-hidden="true"></div>';
    try {
      const event = await api.getEvent(params.get("id"));
      if (!event) {
        root.innerHTML = emptyState("Event not found", "It may have been removed.", `<a class="btn" href="${backHref}">Back to this week</a>`);
        return;
      }
      render(event, await api.related(event, 3));
    } catch (error) {
      console.error("Unable to load event.", error);
      root.innerHTML = emptyState("We couldn't load this event", "Check your connection and try again.", '<button type="button" class="btn" id="retry">Retry</button>');
      document.getElementById("retry").addEventListener("click", load);
    }
  };

  ui.mountHeader(document.getElementById("siteHeader"));
  load();
})();
