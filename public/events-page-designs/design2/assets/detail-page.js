// Event detail page: description, RSVP, attendees and related events.
const params = new URLSearchParams(location.search);
const event = events.find((item) => item.id === params.get("id")) || events[0];
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
const initialsFor = (name) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
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
const date = new Date(`${event.date}T12:00:00`);
const dateOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
const endDate = event.endDate || event.date;
const formatDate = (value, options = dateOptions) => new Intl.DateTimeFormat("en-US", options).format(new Date(`${value}T12:00:00`));
const dateText = event.date === endDate
  ? formatDate(event.date)
  : `${formatDate(event.date)} – ${formatDate(endDate)}`;
const timeText = (value) => {
  const [hours, minutes] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(2026, 0, 1, hours, minutes));
};
const eventDateTimeText = event.allDay
  ? `${dateText} · All day`
  : event.dailySchedule
    ? `${dateText} · Daily, ${timeText(event.start)}–${timeText(event.end)}`
  : event.date === endDate
    ? `${dateText} · ${timeText(event.start)}–${timeText(event.end)}`
    : `${formatDate(event.date)} ${timeText(event.start)} – ${formatDate(endDate)} ${timeText(event.end)}`;
const currentResponse = localStorage.getItem(`event-rsvp-${event.id}`) || event.rsvp;
const eventUrl = (item) => `event-detail.html?id=${encodeURIComponent(item.id)}&from=${encodeURIComponent(params.get("from") || "index.html")}`;
document.title = `${event.title} | Cornerstone Events`;
if (event.rsvpRequired === false) {
  document.querySelector(".detail-aside > .action-card").hidden = true;
  document.querySelector(".event-facts").append(document.getElementById("calendarAction"));
}
document.getElementById("eventTitle").textContent = event.title;
document.getElementById("detailDate").textContent = `${new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)} ${date.getDate()}`;
document.getElementById("eventMeta").innerHTML = `<span>${eventDateTimeText}</span><span>${locationMarkup(event.location)}</span>`;
const image = document.getElementById("eventImage");
image.src = event.image;
image.alt = event.imageAlt;
const description = document.getElementById("eventDescription");
description.replaceChildren(...event.description.split(/\n\n+/).map((paragraph) => {
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
const authorsSummary = document.getElementById("eventAuthors");
authorsSummary.setAttribute("aria-label", `${event.authors.length} authors: ${event.authors.join(", ")}`);
authorsSummary.replaceChildren();
const authorAvatars = event.authors.slice(0, 4).map((author) => {
  const avatar = document.createElement("span");
  avatar.className = "detail-author-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = initialsFor(author);
  authorsSummary.append(avatar);
  return avatar;
});
if (event.authors.length > 4) {
  const overflow = document.createElement("span");
  overflow.className = "detail-author-overflow";
  overflow.setAttribute("aria-hidden", "true");
  overflow.textContent = `+${event.authors.length - 4}`;
  authorsSummary.append(overflow);
}
const loadAuthorPictures = async () => {
  const url = new URL("https://randomuser.me/api/");
  url.searchParams.set("results", String(authorAvatars.length));
  url.searchParams.set("inc", "picture");
  url.searchParams.set("noinfo", "");
  url.searchParams.set("seed", `cornerstone-authors-${event.id}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Random User API returned HTTP ${response.status}`);
  const payload = await response.json();
  if (!Array.isArray(payload.results) || payload.results.length < authorAvatars.length) {
    throw new Error("Random User API returned an incomplete author profile list");
  }
  payload.results.slice(0, authorAvatars.length).forEach((profile, index) => {
    const picture = profile.picture?.thumbnail;
    if (typeof picture !== "string") throw new Error("Random User API returned an invalid author photo");
    const image = document.createElement("img");
    image.src = picture;
    image.alt = "";
    image.addEventListener("error", () => image.remove(), { once: true });
    authorAvatars[index].append(image);
  });
};
void loadAuthorPictures().catch((error) => {
  console.error("Unable to load sample author photos.", error);
});
document.getElementById("authorDate").textContent = `${event.published} (${event.edited})`;
document.getElementById("eventTopics").innerHTML = event.topics.map((topic) => `<span>${topic}</span>`).join("");
document.getElementById("attendeeCount").textContent = event.attendees;
const attendeeSummary = document.getElementById("attendeeSummary");
attendeeSummary.hidden = event.attendees === 0;
const attendeeAvatars = document.getElementById("attendeeAvatars");
const attendeeOverflow = document.getElementById("attendeeOverflow");
const attendeeOverflowCount = Math.max(0, event.attendees - 3);
attendeeOverflow.hidden = attendeeOverflowCount === 0;
if (attendeeOverflowCount > 0) {
  attendeeOverflow.textContent = `+${attendeeOverflowCount}`;
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
    const image = document.createElement("img");
    image.src = attendee.picture;
    image.alt = "";
    image.loading = eager ? "eager" : "lazy";
    image.addEventListener("error", () => image.remove(), { once: true });
    avatar.append(image);
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
const loadAttendeeProfiles = async () => {
  if (!event.attendees) {
    attendeeLoadStatus.textContent = "";
    return;
  }
  try {
    const url = new URL("https://randomuser.me/api/");
    url.searchParams.set("results", String(event.attendees));
    url.searchParams.set("inc", "name,picture");
    url.searchParams.set("noinfo", "");
    url.searchParams.set("seed", `cornerstone-${event.id}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Random User API returned HTTP ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.results) || payload.results.length < eventAttendees.length) {
      throw new Error("Random User API returned an incomplete attendee list");
    }
    const profiles = payload.results.slice(0, eventAttendees.length).map((profile) => {
      const firstName = profile.name?.first;
      const lastName = profile.name?.last;
      const picture = profile.picture?.thumbnail;
      if (typeof firstName !== "string" || typeof lastName !== "string" || typeof picture !== "string") {
        throw new Error("Random User API returned an invalid profile");
      }
      return { name: `${firstName} ${lastName}`, picture };
    });
    eventAttendees.splice(0, eventAttendees.length, ...profiles);
    attendeeLoadStatus.textContent = "";
    renderAttendeeList();
  } catch (error) {
    console.error("Unable to load sample attendee profiles.", error);
    attendeeLoadStatus.textContent = "Sample profile photos could not be loaded. Showing initials instead.";
  }
};
void loadAttendeeProfiles();
attendeeOverflow.addEventListener("click", () => attendeeDialog.showModal());
attendeeDialog.querySelector(".attendee-dialog-close").addEventListener("click", () => attendeeDialog.close());
attendeeDialog.addEventListener("click", (clickEvent) => {
  if (clickEvent.target === attendeeDialog) attendeeDialog.close();
});
document.getElementById("factDate").textContent = dateText;
document.getElementById("factTime").textContent = event.allDay
  ? "All day"
  : event.dailySchedule
    ? `Daily, ${timeText(event.start)}–${timeText(event.end)}`
  : event.date === endDate
    ? `${timeText(event.start)}–${timeText(event.end)}`
    : `${timeText(event.start)} ${formatDate(event.date, { month: "short", day: "numeric" })} – ${timeText(event.end)} ${formatDate(endDate, { month: "short", day: "numeric" })}`;
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
document.getElementById("calendarAction").addEventListener("click", () => {
  const startDateStamp = event.date.replaceAll("-", "");
  const endDateStamp = endDate.replaceAll("-", "");
  const toStamp = (dateStamp, time) => `${dateStamp}T${time.replace(":", "")}00`;
  const endExclusiveDate = new Date(`${endDate}T12:00:00`);
  if (event.allDay) endExclusiveDate.setDate(endExclusiveDate.getDate() + 1);
  const endDateValue = `${endExclusiveDate.getFullYear()}${String(endExclusiveDate.getMonth() + 1).padStart(2, "0")}${String(endExclusiveDate.getDate()).padStart(2, "0")}`;
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    event.allDay ? `DTSTART;VALUE=DATE:${startDateStamp}` : `DTSTART:${toStamp(startDateStamp, event.start)}`,
    event.allDay ? `DTEND;VALUE=DATE:${endDateValue}` : `DTEND:${toStamp(event.dailySchedule ? startDateStamp : endDateStamp, event.end)}`,
    ...(event.dailySchedule ? [`RRULE:FREQ=DAILY;COUNT:${Math.floor((new Date(`${endDate}T12:00:00`) - new Date(`${event.date}T12:00:00`)) / 86400000) + 1}`] : []),
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([calendar], { type: "text/calendar" }));
  link.download = `${event.id}.ics`;
  link.click();
  URL.revokeObjectURL(link.href);
});
const requestedReturn = params.get("from");
if (requestedReturn && requestedReturn.startsWith("index.html")) document.getElementById("backLink").href = requestedReturn;
document.getElementById("relatedEvents").innerHTML = events.filter((item) => item.id !== event.id).slice(0, 3).map((item) => `
  <a class="suggested-card" href="${eventUrl(item)}">
    <img src="${item.image}" alt="${item.imageAlt}">
    <span class="suggested-date">${item.allDay
      ? `${formatDate(item.date, { month: "short", day: "numeric" })} – ${formatDate(item.endDate || item.date, { month: "short", day: "numeric" })} · All day`
      : item.dailySchedule
        ? `${formatDate(item.date, { month: "short", day: "numeric" })} – ${formatDate(item.endDate, { month: "short", day: "numeric" })} · Daily, ${timeText(item.start)}–${timeText(item.end)}`
      : item.date === (item.endDate || item.date)
        ? `${formatDate(item.date, { month: "short", day: "numeric" })} · ${timeText(item.start)}–${timeText(item.end)}`
        : `${formatDate(item.date, { month: "short", day: "numeric" })} ${timeText(item.start)} – ${formatDate(item.endDate, { month: "short", day: "numeric" })} ${timeText(item.end)}`}</span>
    <strong>${item.title}</strong>
  </a>`).join("");
