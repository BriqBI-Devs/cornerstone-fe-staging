// Small UI helpers shared by every page. Anything rendered twice lives here.
(() => {
  const { RSVP, needsRsvp } = EventsApp.rsvp;

  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  // 24px line icons, drawn with currentColor so they follow the text colour.
  const ICONS = {
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19M16 5.5a3 3 0 0 1 0 5.8M17 14a4.5 4.5 0 0 1 3.5 4.4V19"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  };
  const icon = (name) =>
    `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

  const NAV = [
    ["News", "/news"],
    ["Company + Culture", "/company-culture"],
    ["Events", "index.html"],
    ["People", "/people"],
    ["Departments", "/departments"],
    ["Policies + Resources", "/policies-resources"],
  ];
  const mountHeader = (element) => {
    element.className = "site-header";
    element.innerHTML = `
      <a class="wordmark" href="/" aria-label="Cornerstone home">CORNERSTONE</a>
      <nav class="primary-nav" aria-label="Main navigation">
        ${NAV.map(([label, href]) => `<a href="${href}"${label === "Events" ? ' class="active" aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>`;
  };

  // "Online" locations get a Zoom link; everything else is plain text.
  const locationHtml = (location, { link = true } = {}) => {
    const text = esc(location);
    if (!link || !/\bonline\b/i.test(location)) return text;
    const zoom = '<a href="https://zoom.us/" target="_blank" rel="noopener noreferrer">zoom.us</a>';
    return /\bzoom\b/i.test(location) ? text.replace(/\bzoom\b/i, zoom) : `${text} · ${zoom}`;
  };

  const statusChip = (event) =>
    needsRsvp(event) ? `<span class="chip tone-${RSVP[event.rsvp].tone}">${RSVP[event.rsvp].label}</span>` : "";

  // Three-button RSVP control. `onChange(updatedEvent)` runs after the API call succeeds.
  const mountRsvpButtons = (container, event, onChange) => {
    const choices = ["Yes", "Maybe", "No"];
    container.innerHTML = choices
      .map((status) => `<button type="button" class="rsvp-btn tone-${RSVP[status].tone}" data-status="${status}" aria-pressed="${event.rsvp === status}">${RSVP[status].label}</button>`)
      .join("");
    container.querySelectorAll("[data-status]").forEach((button) =>
      button.addEventListener("click", async () => {
        const updated = await EventsApp.api.setRsvp(event.id, button.dataset.status);
        mountRsvpButtons(container, updated, onChange);
        onChange(updated);
      }),
    );
  };

  const emptyState = (title, message, action = "") => `<div class="empty-state"><strong>${title}</strong><p>${message}</p>${action}</div>`;

  EventsApp.ui = { esc, icon, mountHeader, locationHtml, statusChip, mountRsvpButtons, emptyState };
})();
