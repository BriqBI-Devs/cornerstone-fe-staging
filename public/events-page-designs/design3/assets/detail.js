// Event detail page: description, RSVP, attendees and related events.
const { api, initialsFor, locationMarkup } = EventsKit;
(async () => {
const params = new URLSearchParams(location.search);
const event = await api.getEvent(params.get("id"));
if (!event) {
  document.querySelector(".detail-main").innerHTML = `<p>We could not find that event. <a href="index.html">Browse all events</a></p>`;
  return;
}
const demoAttendeeDirectory = [
  "Avery Morgan", "Jordan Ellis", "Riley Bennett", "Taylor Brooks", "Casey Parker", "Morgan Reed",
  "Jamie Foster", "Cameron Hayes", "Quinn Bailey", "Drew Sullivan", "Skyler Price", "Reese Coleman",
  "Rowan Murphy", "Emerson Hughes", "Finley Ward", "Dakota James", "Peyton Russell", "Kendall Griffin",
  "Charlie Barnes", "Alexandra Ross", "Sage Peterson", "Blake Cooper", "Elliot Richardson", "Remy Cox",
  "Harper Howard", "Noah Flores", "Milan Rogers", "Ari Simmons", "Robin Bell", "Micah Cook",
  "Shiloh Kelly", "Logan Sanders", "Cory Bennett", "Samira Brooks", "Devon Murphy", "Lee Parker",
  "Amari Watson", "Ellis Turner", "Dana Mitchell", "Jules Ramirez", "Frankie Bailey", "Terry Morgan",
];
const attendeeStartIndex = Array.from(event.id).reduce((total, character) => total + character.charCodeAt(0), 0) % demoAttendeeDirectory.length;
const eventAttendees = Array.from({ length: Math.min(event.attendees, demoAttendeeDirectory.length) }, (_, index) => ({
  name: demoAttendeeDirectory[(attendeeStartIndex + index) % demoAttendeeDirectory.length],
  picture: "",
}));
const dateOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
const endDate = event.endDate || event.date;
const formatDate = (value, options = dateOptions) => EventsKit.formatDate(value, options);
const timeText = EventsKit.formatTime;
const dateText = event.date === endDate ? formatDate(event.date) : `${formatDate(event.date)} – ${formatDate(endDate)}`;
const timeSummary = event.allDay
  ? "All day"
  : event.dailySchedule
    ? `Daily, ${timeText(event.start)}–${timeText(event.end)}`
    : event.date === endDate
      ? `${timeText(event.start)}–${timeText(event.end)}`
      : `${timeText(event.start)} ${formatDate(event.date, { month: "short", day: "numeric" })} – ${timeText(event.end)} ${formatDate(endDate, { month: "short", day: "numeric" })}`;
const currentResponse = event.rsvp;
const eventUrl = (item) => `event-detail.html?id=${encodeURIComponent(item.id)}&from=${encodeURIComponent(params.get("from") || "index.html")}`;

document.title = `${event.title} | Cornerstone Events`;
if (event.rsvpRequired === false) {
  document.getElementById("rsvpCard").hidden = false;
  document.querySelector(".rsvp-actions").hidden = true;
  document.querySelector(".card-eyebrow").textContent = "No RSVP needed";
  document.querySelector("#rsvpCard h2").textContent = "Open to everyone";
}
document.getElementById("eventTitle").textContent = event.title;
document.getElementById("heroEyebrow").textContent = event.organizer || "Event";
const heroDate = new Date(`${event.date}T12:00:00`);
document.getElementById("detailDate").innerHTML = `<span>${new Intl.DateTimeFormat("en-US", { month: "short" }).format(heroDate)}</span><strong>${heroDate.getDate()}</strong>`;
document.getElementById("eventMeta").innerHTML = `<span>${dateText}${event.allDay ? "" : ` · ${timeSummary}`}</span><span>${locationMarkup(event.location)}</span>`;
const image = document.getElementById("eventImage");
image.src = event.image;
image.alt = event.imageAlt;
document.getElementById("eventDescription").replaceChildren(...event.description.split(/\n\n+/).map((paragraph) => {
  const element = document.createElement("p");
  element.textContent = paragraph;
  return element;
}));
if (event.registrationUrl) {
  const registration = document.getElementById("eventRegistration");
  registration.hidden = false;
  const prompt = document.createElement("strong");
  prompt.textContent = "Register in advance for the meeting here:";
  const link = document.createElement("a");
  link.href = event.registrationUrl;
  link.textContent = event.registrationUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  registration.append(prompt, document.createElement("br"), link);
}

const authorsList = document.getElementById("eventAuthors");
const authorAvatars = event.authors.map((author) => {
  const wrapper = document.createElement("div");
  wrapper.className = "author";
  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = initialsFor(author);
  const name = document.createElement("span");
  name.innerHTML = `${author}<small>Published Jun 18, 2025 · Edited Jun 20, 2025</small>`;
  name.firstChild.textContent = author;
  wrapper.append(avatar, name);
  authorsList.append(wrapper);
  return avatar;
});
void (async () => {
  const url = new URL("https://randomuser.me/api/");
  url.searchParams.set("results", String(authorAvatars.length));
  url.searchParams.set("inc", "picture");
  url.searchParams.set("noinfo", "");
  url.searchParams.set("seed", `cornerstone-authors-${event.id}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Random User API returned HTTP ${response.status}`);
  const payload = await response.json();
  payload.results.slice(0, authorAvatars.length).forEach((profile, index) => {
    const picture = profile.picture?.thumbnail;
    if (typeof picture !== "string") return;
    const img = document.createElement("img");
    img.src = picture;
    img.alt = "";
    img.addEventListener("error", () => img.remove(), { once: true });
    authorAvatars[index].append(img);
  });
})().catch((error) => console.error("Unable to load sample author photos.", error));

document.getElementById("attendeeCount").textContent = event.attendees;
document.getElementById("attendeeSummary").hidden = event.attendees === 0;
const attendeeAvatars = document.getElementById("attendeeAvatars");
const attendeeOverflow = document.getElementById("attendeeOverflow");
const overflowCount = Math.max(0, event.attendees - 3);
attendeeOverflow.hidden = overflowCount === 0;
if (overflowCount > 0) {
  attendeeOverflow.textContent = `+${overflowCount}`;
  attendeeOverflow.setAttribute("aria-label", `Show ${event.attendees} people attending`);
}
const attendeeDialog = document.getElementById("attendeeDialog");
document.getElementById("attendeeDialogCount").textContent = `${event.attendees} people attending`;
const attendeeList = document.getElementById("attendeeList");
const attendeeLoadStatus = document.getElementById("attendeeLoadStatus");
const makeAttendeeAvatar = (attendee, eager = false) => {
  const avatar = document.createElement("span");
  avatar.className = "attendee-avatar";
  avatar.textContent = initialsFor(attendee.name);
  avatar.setAttribute("aria-hidden", "true");
  if (attendee.picture) {
    const img = document.createElement("img");
    img.src = attendee.picture;
    img.alt = "";
    img.loading = eager ? "eager" : "lazy";
    img.addEventListener("error", () => img.remove(), { once: true });
    avatar.append(img);
  }
  return avatar;
};
const renderAttendeeList = () => {
  attendeeAvatars.replaceChildren(...eventAttendees.slice(0, 3).map((attendee) => makeAttendeeAvatar(attendee, true)));
  attendeeList.replaceChildren(...eventAttendees.map((attendee) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = attendee.name;
    item.append(makeAttendeeAvatar(attendee), label);
    return item;
  }));
};
renderAttendeeList();
(async () => {
  if (!event.attendees) { attendeeLoadStatus.textContent = ""; return; }
  try {
    const url = new URL("https://randomuser.me/api/");
    url.searchParams.set("results", String(event.attendees));
    url.searchParams.set("inc", "name,picture");
    url.searchParams.set("noinfo", "");
    url.searchParams.set("seed", `cornerstone-${event.id}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Random User API returned HTTP ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.results) || payload.results.length < eventAttendees.length) throw new Error("Incomplete attendee list");
    const profiles = payload.results.slice(0, eventAttendees.length).map((profile) => ({
      name: `${profile.name.first} ${profile.name.last}`,
      picture: profile.picture.thumbnail,
    }));
    eventAttendees.splice(0, eventAttendees.length, ...profiles);
    attendeeLoadStatus.textContent = "";
    renderAttendeeList();
  } catch (error) {
    console.error("Unable to load sample attendee profiles.", error);
    attendeeLoadStatus.textContent = "Sample profile photos could not be loaded. Showing initials instead.";
  }
})();
attendeeOverflow.addEventListener("click", () => attendeeDialog.showModal());
attendeeDialog.querySelector(".attendee-dialog-close").addEventListener("click", () => attendeeDialog.close());
attendeeDialog.addEventListener("click", (clickEvent) => { if (clickEvent.target === attendeeDialog) attendeeDialog.close(); });

document.getElementById("factDate").textContent = dateText;
document.getElementById("factTime").textContent = timeSummary;
document.getElementById("factLocation").innerHTML = locationMarkup(event.location);
document.getElementById("rsvpMessage").textContent = currentResponse === "Pending" ? "You haven't responded yet." : `Your response: ${currentResponse}`;
document.querySelectorAll("[data-rsvp]").forEach((button) => {
  button.classList.toggle("selected", button.dataset.rsvp === currentResponse);
  button.addEventListener("click", () => {
    localStorage.setItem(`event-rsvp-${event.id}`, button.dataset.rsvp);
    document.querySelectorAll("[data-rsvp]").forEach((choice) => choice.classList.toggle("selected", choice === button));
    document.getElementById("rsvpMessage").textContent = `Your response: ${button.dataset.rsvp}`;
  });
});

const requestedReturn = params.get("from");
if (requestedReturn && /^(index|calendar|events)\.html/.test(requestedReturn)) {
  const back = document.getElementById("backLink");
  back.href = requestedReturn;
  back.lastChild.textContent = requestedReturn.startsWith("calendar") ? " Back to calendar" : requestedReturn.includes("?") ? " Back to results" : " Back to events";
}
const shortDate = (item) => item.date === (item.endDate || item.date)
  ? formatDate(item.date, { weekday: "short", month: "short", day: "numeric" })
  : `${formatDate(item.date, { month: "short", day: "numeric" })} – ${formatDate(item.endDate, { month: "short", day: "numeric" })}`;
const related = await api.related(event, 3);
document.getElementById("relatedEvents").innerHTML = related.map((item) => `
  <a class="related-card" href="${eventUrl(item)}">
    <img src="${item.image}" alt="${item.imageAlt}" loading="lazy">
    <span class="rc-date">${shortDate(item)}</span>
    <strong>${item.title}</strong>
  </a>`).join("");
  })().catch((error) => console.error("Unable to load event.", error));
