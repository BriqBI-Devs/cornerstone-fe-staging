// Sample people. `manager` is the id of the person they report to (null = top of the chart).
const PEOPLE = [
  { id: 1, name: "Morgan Hale", title: "Chief Executive Officer", team: "Executive Team", location: "New York", manager: null, joined: "2014-03-03", expertise: ["Strategy", "Leadership"] },
  { id: 2, name: "Jordan Ellis", title: "Chief Technology Officer", team: "Technology", location: "New York", manager: 1, joined: "2018-06-11", expertise: ["IT Strategy", "Security"] },
  { id: 3, name: "Priya Osei", title: "Chief Operating Officer", team: "Operations", location: "Boston", manager: 1, joined: "2015-01-19", expertise: ["Operations", "Process Improvement"] },
  { id: 4, name: "Marcus Field", title: "Chief Investment Officer", team: "Investments", location: "Boston", manager: 1, joined: "2016-09-05", expertise: ["Asset Management", "Finance"] },
  { id: 5, name: "Margaret Carestia", title: "Controller", team: "Accounting & Finance", location: "New York", manager: 4, joined: "2014-10-20", expertise: ["Accounting", "Budgeting"] },
  { id: 6, name: "Denise Ramirez", title: "Senior Property Manager", team: "Property Operations", location: "New York", manager: 3, joined: "2016-09-12", expertise: ["Property Management", "Vendors"] },
  { id: 7, name: "Tomás Rivera", title: "Project Coordinator", team: "Property Operations", location: "Saratoga", manager: 6, joined: "2026-09-08", expertise: ["Scheduling"] },
  { id: 8, name: "Alex Kim", title: "Financial Analyst", team: "Accounting & Finance", location: "New York", manager: 5, joined: "2026-09-08", expertise: ["Forecasting"] },
  { id: 9, name: "Priya Shah", title: "Marketing Specialist", team: "Communications & Marketing", location: "New York", manager: 28, joined: "2026-09-08", expertise: ["Content", "Social Media"] },
  { id: 10, name: "Sarah Hunt", title: "HR Generalist", team: "People Team", location: "New York", manager: 13, joined: "2026-09-08", expertise: ["Onboarding", "Benefits"] },
  { id: 11, name: "Laura Reyes", title: "Risk Manager", team: "Risk & Insurance", location: "Saratoga", manager: 4, joined: "2019-04-22", expertise: ["Insurance", "Compliance"] },
  { id: 12, name: "Connor Marsh", title: "Building Envelope Engineer", team: "Building Envelope & Sustainability", location: "Boston", manager: 3, joined: "2021-02-15", expertise: ["Roof Surveys", "Sustainability"] },
  { id: 13, name: "Riley Bennett", title: "Chief People Officer", team: "People Team", location: "New York", manager: 1, joined: "2017-05-08", expertise: ["Culture","Talent"] },
  { id: 14, name: "Taylor Brooks", title: "General Counsel", team: "Legal", location: "New York", manager: 1, joined: "2016-02-01", expertise: ["Contracts","Real Estate Law"] },
  { id: 15, name: "Casey Parker", title: "Senior Counsel", team: "Legal", location: "New York", manager: 14, joined: "2019-08-26", expertise: ["Leasing","Compliance"] },
  { id: 16, name: "Quinn Bailey", title: "Paralegal", team: "Legal", location: "Boston", manager: 15, joined: "2023-03-13", expertise: ["Document Review"] },
  { id: 17, name: "Drew Sullivan", title: "IT Manager", team: "Technology", location: "New York", manager: 2, joined: "2018-11-05", expertise: ["Infrastructure","Vendors"] },
  { id: 18, name: "Skyler Price", title: "Systems Administrator", team: "Technology", location: "Boston", manager: 17, joined: "2022-01-17", expertise: ["Networks","Microsoft 365"] },
  { id: 19, name: "Reese Coleman", title: "Help Desk Analyst", team: "Technology", location: "Boston", manager: 17, joined: "2024-06-03", expertise: ["Support","SysAid"] },
  { id: 20, name: "Rowan Murphy", title: "Director of Construction", team: "Construction", location: "Boston", manager: 3, joined: "2015-07-13", expertise: ["Construction Management"] },
  { id: 21, name: "Emerson Hughes", title: "Senior Project Manager", team: "Construction", location: "Boston", manager: 20, joined: "2018-04-02", expertise: ["Budgets","Schedules"] },
  { id: 22, name: "Finley Ward", title: "Site Superintendent", team: "Construction", location: "Saratoga", manager: 21, joined: "2020-09-14", expertise: ["Site Safety","Subcontractors"] },
  { id: 23, name: "Dakota James", title: "Director of Development", team: "Development", location: "Harlem", manager: 4, joined: "2017-10-23", expertise: ["Entitlements","Partnerships"] },
  { id: 24, name: "Peyton Russell", title: "Development Associate", team: "Development", location: "Harlem", manager: 23, joined: "2023-07-10", expertise: ["Underwriting"] },
  { id: 25, name: "Kendall Griffin", title: "Community Investment Lead", team: "Community Investment", location: "Harlem", manager: 3, joined: "2019-01-28", expertise: ["Volunteering","Partnerships"] },
  { id: 26, name: "Charlie Barnes", title: "Accounting Manager", team: "Accounting & Finance", location: "New York", manager: 5, joined: "2018-02-12", expertise: ["Reporting","Audit"] },
  { id: 27, name: "Jamie Foster", title: "Accounts Payable Specialist", team: "Accounting & Finance", location: "New York", manager: 26, joined: "2025-02-24", expertise: ["Payments"] },
  { id: 28, name: "Cameron Hayes", title: "Communications Manager", team: "Communications & Marketing", location: "New York", manager: 3, joined: "2020-03-02", expertise: ["Internal Comms","Events"] },
  { id: 29, name: "Blake Cooper", title: "Recruiter", team: "People Team", location: "New York", manager: 13, joined: "2022-10-03", expertise: ["Hiring","Interviewing"] },
  { id: 30, name: "Alexandra Ross", title: "HR Business Partner", team: "People Team", location: "Boston", manager: 13, joined: "2021-05-17", expertise: ["Employee Relations"] },
];
// Portraits from the Random User API. The seed keeps the same faces on every load; if the request fails (offline), people keep their initials.
const PHOTOS = fetch(`https://randomuser.me/api/?results=${PEOPLE.length}&seed=cornerstone&inc=picture&noinfo`)
  .then((response) => response.json())
  .then(({ results }) => results.forEach((entry, i) => { PEOPLE[i].photo = entry.picture.large; }))
  .catch(() => {});
const avatar = (person) => person.photo
  ? `<img class="avatar" src="${person.photo}" alt="">`
  : `<span class="avatar" aria-hidden="true">${PE_ESC(initials(person.name))}</span>`;
const byId = (id) => PEOPLE.find((person) => person.id === Number(id));
const reportsOf = (id) => PEOPLE.filter((person) => person.manager === id);
const initials = (name) => name.split(" ").map((part) => part[0]).slice(0, 2).join("");
const jobLine = (person) => [person.title, person.team, person.location].join(" · ");
const tenure = (joined) => {
  const months = Math.max(0, Math.round((new Date("2026-10-19") - new Date(joined)) / 2629800000));
  const years = Math.floor(months / 12), rest = months % 12;
  return [years && `${years} yr${years > 1 ? "s" : ""}`, rest && `${rest} mo`].filter(Boolean).join(" ") || "New";
};
const SHELL = (active) => `
  <a class="skip" href="#main">Skip to content</a>
  <header><a class="wordmark" href="/">CORNERSTONE</a><nav>
    <a href="/news">News</a><a href="/company-culture">Company + Culture</a><a href="/events">Events</a>
    <a class="${active ? "active" : ""}" href="index.html">People</a><a href="/departments">Departments</a><a href="/policies-resources">Policies + Resources</a>
  </nav></header>`;

// Directory filters, derived from the existing data. (Time zone is intentionally not offered.)
// Entity codes (LMBG, LMDP, LMFM, LMXD) for the sample teams (adjust the mapping when the real codes are known).
const ENTITY_CODE = { "Executive Team": "LMBG", Investments: "LMBG", "Accounting & Finance": "LMBG", Legal: "LMBG", "Risk & Insurance": "LMBG", Development: "LMDP", Construction: "LMDP", "Building Envelope & Sustainability": "LMDP", "Community Investment": "LMDP", "Property Operations": "LMFM", Operations: "LMFM", Technology: "LMXD", "Communications & Marketing": "LMXD", "People Team": "LMXD" };
const FACETS = {
  company: (p) => ["Executive Team", "Investments", "Accounting & Finance"].includes(p.team) ? "Cornerstone Capital" : "Cornerstone Property Group",
  department: (p) => p.team,
  title: (p) => p.title,
  timezone: (p) => ({ "New York": "Eastern (ET)", Boston: "Eastern (ET)" })[p.location] || "Eastern (ET)",
  management: (p) => reportsOf(p.id).length ? "Yes" : "No",
  entity: (p) => ENTITY_CODE[p.team] || "LMBG",
};
const FILTERS = [["company", "Company"], ["department", "Department"], ["title", "Job title"], ["timezone", "Time zone"], ["management", "Management"], ["entity", "Entity"]];

// Details list: the first four rows show; a "Show N more" button reveals the rest. `items` are ready-made row markup.
window.DETAILS_OPEN = window.DETAILS_OPEN || {};
const DETAIL_LIST = (key, items, dlClass = "", limit = 4) => {
  const html = items.join(""), tpl = document.createElement("template");
  tpl.innerHTML = html;
  if (!html) return `<p class="empty-note">Not added yet.</p>`;
  const open = !!window.DETAILS_OPEN[key], extra = tpl.content.children.length - limit;   // count the rows, not the array entries
  return `<dl data-collapsible="${key}" data-limit="${limit}" class="${dlClass} ${open ? "open" : ""}">${html}</dl>` +
    (extra > 0 ? `<button type="button" class="show-more" data-more="${key}" data-extra="${extra}" aria-expanded="${open}">${open ? "Show less" : `Show ${extra} more`}</button>` : "");
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-more]");
  if (!b) return;
  const open = !window.DETAILS_OPEN[b.dataset.more];
  window.DETAILS_OPEN[b.dataset.more] = open;
  b.previousElementSibling.classList.toggle("open", open);
  b.setAttribute("aria-expanded", String(open));
  b.textContent = open ? "Show less" : `Show ${b.dataset.extra} more`;
});

// ---- Profile details come only from what was entered in the Edit profile form (no sample values) ----
const PE_ESC = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const ZONE_LABELS = { "America/New_York": "(GMT-04:00) Eastern Time - New York", "America/Chicago": "(GMT-05:00) Central Time - Chicago", "America/Denver": "(GMT-06:00) Mountain Time - Denver", "America/Los_Angeles": "(GMT-07:00) Pacific Time - Los Angeles", "Europe/London": "(GMT+01:00) British Time - London", "Europe/Paris": "(GMT+02:00) Central European Time - Paris", "Asia/Kolkata": "(GMT+05:30) India Standard Time - Kolkata", "Asia/Tokyo": "(GMT+09:00) Japan Standard Time - Tokyo", "Australia/Sydney": "(GMT+10:00) Australian Eastern Time - Sydney" };
const LANGUAGE_LABELS = { "en-US": "English (US) - English (US)", "en-GB": "English (UK) - English (UK)", es: "Español - Spanish", fr: "Français - French", de: "Deutsch - German", "pt-BR": "Português (Brasil) - Portuguese (Brazil)", hi: "हिन्दी - Hindi" };
const PROFILE_DETAILS = (p) => {
  const e = p.edit || {};
  const link = (href, text) => `<a href="${PE_ESC(href)}">${PE_ESC(text)}</a>`;
  const keep = (rows) => rows.filter(([, v]) => v);
  const social = [["linkedin", "LinkedIn"], ["x", "X (Twitter)"], ["facebook", "Facebook"], ["instagram", "Instagram"], ["youtube", "YouTube"]]
    .map(([k, l]) => [l, e["social_" + k] ? `<a href="${PE_ESC(e["social_" + k])}" target="_blank" rel="noopener">${PE_ESC(e["social_" + k].split("//").pop().replace("www.", ""))}</a>` : ""]);
  return {
    contact: keep([["Email", e.email ? link("mailto:" + e.email, e.email) : ""], ["Phone", e.phone ? link("tel:" + e.phone, e.phone) : ""], ["Mobile phone", e.mobile ? link("tel:" + e.mobile, e.mobile) : ""], ["Time zone", PE_ESC(ZONE_LABELS[e.timezone])], ["Extension", PE_ESC(e.ext)], ["Zoom meeting ID", PE_ESC(e.zoom)], ...social]),
    additional: keep([["Employee number", PE_ESC(e.employeeNumber)], ["User type", PE_ESC(e.userType)], ["Language", PE_ESC(LANGUAGE_LABELS[e.language])], ["Office Days", PE_ESC(e.cf_officeDays)], ["Management", PE_ESC(e.cf_management)], ["Entity", PE_ESC(e.cf_entity)], ["Department/Business Line", PE_ESC(e.cf_businessLine)]]),
  };
};
// Required fields: first name, last name, job title and email. Missing ones show a banner on the profile.
const PROFILE_MISSING = (p) => {
  const [first, ...rest] = String(p.name || "").trim().split(" ");
  return [["First name", first], ["Last name", rest.join(" ")], ["Job title", p.title], ["Email", p.edit && p.edit.email]].filter(([, v]) => !String(v || "").trim()).map(([l]) => l);
};
const PROFILE_BANNER = (p) => {
  const m = PROFILE_MISSING(p);
  return m.length ? `<div class="pe-banner" role="status"><span>Complete your profile: add <b>${m.join(", ")}</b>.</span><button type="button" data-edit>Complete profile</button></div>` : "";
};

// Design-only starter values, saved in the same shape as the Edit profile form. Anything saved in the form replaces them.
const PROFILE_SEED = (p) => {
  const n = String(p.id).padStart(2, "0");
  const slug = String(p.name).toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.+|\.+$/g, "");
  return {
    email: `${slug}@example.com`, phone: `(212) 555-01${n}`, mobile: `(917) 555-02${n}`, timezone: "America/New_York",
    ext: `${3000 + p.id}`, zoom: `${810 + (p.id % 9)} ${550 + p.id} ${1000 + p.id}`,
    social_linkedin: `https://www.linkedin.com/in/${slug}`, social_x: `https://x.com/${slug.replace(/./g, "_")}`, social_facebook: `https://www.facebook.com/${slug}`, social_instagram: `https://www.instagram.com/${slug.replace(/./g, "_")}`, social_youtube: `https://www.youtube.com/@${slug.replace(/./g, "")}`,
    company: FACETS.company(p), department: FACETS.department(p), entity: FACETS.entity(p),
    employeeNumber: `E-${1000 + p.id}`, userType: "Employee", language: "en-US",
    cf_officeDays: ["Mon, Wed, Thu", "Tue, Wed, Thu", "Mon, Tue, Fri", "Wed, Thu"][p.id % 4],
    cf_management: FACETS.management(p), cf_entity: FACETS.entity(p), cf_businessLine: FACETS.department(p),
  };
};
