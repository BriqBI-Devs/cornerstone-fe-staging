import type { ActivityItem, FilterKey, Person, ProfileDetails, SortKey } from "./types";

// Static front-end data. Swap these for the backend responses once they exist;
// the components only rely on the shapes in types.ts.
// Photos are sample portraits from randomuser.me; replace them with real photos later.

export const PEOPLE: Person[] = [
  { id: 1, photo: "https://randomuser.me/api/portraits/men/11.jpg", name: "Morgan Hale", title: "Chief Executive Officer", team: "Executive Team", location: "New York", manager: null, joined: "2014-03-03", expertise: ["Strategy", "Leadership"] },
  { id: 2, photo: "https://randomuser.me/api/portraits/men/12.jpg", name: "Jordan Ellis", title: "Chief Technology Officer", team: "Technology", location: "New York", manager: 1, joined: "2018-06-11", expertise: ["IT Strategy", "Security"] },
  { id: 3, photo: "https://randomuser.me/api/portraits/women/13.jpg", name: "Priya Osei", title: "Chief Operating Officer", team: "Operations", location: "Boston", manager: 1, joined: "2015-01-19", expertise: ["Operations", "Process Improvement"] },
  { id: 4, photo: "https://randomuser.me/api/portraits/men/14.jpg", name: "Marcus Field", title: "Chief Investment Officer", team: "Investments", location: "Boston", manager: 1, joined: "2016-09-05", expertise: ["Asset Management", "Finance"] },
  { id: 5, photo: "https://randomuser.me/api/portraits/women/15.jpg", name: "Margaret Carestia", title: "Controller", team: "Accounting + Finance", location: "New York", manager: 4, joined: "2014-10-20", expertise: ["Accounting", "Budgeting"] },
  { id: 6, photo: "https://randomuser.me/api/portraits/women/16.jpg", name: "Denise Ramirez", title: "Senior Property Manager", team: "Property Operations", location: "New York", manager: 3, joined: "2016-09-12", expertise: ["Property Management", "Vendors"] },
  { id: 7, photo: "https://randomuser.me/api/portraits/men/17.jpg", name: "Tomás Rivera", title: "Project Coordinator", team: "Property Operations", location: "Saratoga", manager: 6, joined: "2026-09-08", expertise: ["Scheduling"] },
  { id: 8, photo: "https://randomuser.me/api/portraits/men/18.jpg", name: "Alex Kim", title: "Financial Analyst", team: "Accounting + Finance", location: "New York", manager: 5, joined: "2026-09-08", expertise: ["Forecasting"] },
  { id: 9, photo: "https://randomuser.me/api/portraits/women/19.jpg", name: "Priya Shah", title: "Marketing Specialist", team: "Communications + Marketing", location: "New York", manager: 28, joined: "2026-09-08", expertise: ["Content", "Social Media"] },
  { id: 10, photo: "https://randomuser.me/api/portraits/women/20.jpg", name: "Sarah Hunt", title: "HR Generalist", team: "People Team", location: "New York", manager: 13, joined: "2026-09-08", expertise: ["Onboarding", "Benefits"] },
  { id: 11, photo: "https://randomuser.me/api/portraits/women/21.jpg", name: "Laura Reyes", title: "Risk Manager", team: "Risk + Insurance", location: "Saratoga", manager: 4, joined: "2019-04-22", expertise: ["Insurance", "Compliance"] },
  { id: 12, photo: "https://randomuser.me/api/portraits/men/22.jpg", name: "Connor Marsh", title: "Building Envelope Engineer", team: "Building Envelope + Sustainability", location: "Boston", manager: 3, joined: "2021-02-15", expertise: ["Roof Surveys", "Sustainability"] },
  { id: 13, photo: "https://randomuser.me/api/portraits/women/23.jpg", name: "Riley Bennett", title: "Chief People Officer", team: "People Team", location: "New York", manager: 1, joined: "2017-05-08", expertise: ["Culture", "Talent"] },
  { id: 14, photo: "https://randomuser.me/api/portraits/men/24.jpg", name: "Taylor Brooks", title: "General Counsel", team: "Legal", location: "New York", manager: 1, joined: "2016-02-01", expertise: ["Contracts", "Real Estate Law"] },
  { id: 15, photo: "https://randomuser.me/api/portraits/women/25.jpg", name: "Casey Parker", title: "Senior Counsel", team: "Legal", location: "New York", manager: 14, joined: "2019-08-26", expertise: ["Leasing", "Compliance"] },
  { id: 16, photo: "https://randomuser.me/api/portraits/men/26.jpg", name: "Quinn Bailey", title: "Paralegal", team: "Legal", location: "Boston", manager: 15, joined: "2023-03-13", expertise: ["Document Review"] },
  { id: 17, photo: "https://randomuser.me/api/portraits/men/27.jpg", name: "Drew Sullivan", title: "IT Manager", team: "Technology", location: "New York", manager: 2, joined: "2018-11-05", expertise: ["Infrastructure", "Vendors"] },
  { id: 18, photo: "https://randomuser.me/api/portraits/women/28.jpg", name: "Skyler Price", title: "Systems Administrator", team: "Technology", location: "Boston", manager: 17, joined: "2022-01-17", expertise: ["Networks", "Microsoft 365"] },
  { id: 19, photo: "https://randomuser.me/api/portraits/men/29.jpg", name: "Reese Coleman", title: "Help Desk Analyst", team: "Technology", location: "Boston", manager: 17, joined: "2024-06-03", expertise: ["Support", "SysAid"] },
  { id: 20, photo: "https://randomuser.me/api/portraits/men/30.jpg", name: "Rowan Murphy", title: "Director of Construction", team: "Construction", location: "Boston", manager: 3, joined: "2015-07-13", expertise: ["Construction Management"] },
  { id: 21, photo: "https://randomuser.me/api/portraits/women/31.jpg", name: "Emerson Hughes", title: "Senior Project Manager", team: "Construction", location: "Boston", manager: 20, joined: "2018-04-02", expertise: ["Budgets", "Schedules"] },
  { id: 22, photo: "https://randomuser.me/api/portraits/men/32.jpg", name: "Finley Ward", title: "Site Superintendent", team: "Construction", location: "Saratoga", manager: 21, joined: "2020-09-14", expertise: ["Site Safety", "Subcontractors"] },
  { id: 23, photo: "https://randomuser.me/api/portraits/women/33.jpg", name: "Dakota James", title: "Director of Development", team: "Development", location: "Harlem", manager: 4, joined: "2017-10-23", expertise: ["Entitlements", "Partnerships"] },
  { id: 24, photo: "https://randomuser.me/api/portraits/men/34.jpg", name: "Peyton Russell", title: "Development Associate", team: "Development", location: "Harlem", manager: 23, joined: "2023-07-10", expertise: ["Underwriting"] },
  { id: 25, photo: "https://randomuser.me/api/portraits/women/35.jpg", name: "Kendall Griffin", title: "Community Investment Lead", team: "Community Investment", location: "Harlem", manager: 3, joined: "2019-01-28", expertise: ["Volunteering", "Partnerships"] },
  { id: 26, photo: "https://randomuser.me/api/portraits/men/36.jpg", name: "Charlie Barnes", title: "Accounting Manager", team: "Accounting + Finance", location: "New York", manager: 5, joined: "2018-02-12", expertise: ["Reporting", "Audit"] },
  { id: 27, photo: "https://randomuser.me/api/portraits/women/37.jpg", name: "Jamie Foster", title: "Accounts Payable Specialist", team: "Accounting + Finance", location: "New York", manager: 26, joined: "2025-02-24", expertise: ["Payments"] },
  { id: 28, photo: "https://randomuser.me/api/portraits/men/38.jpg", name: "Cameron Hayes", title: "Communications Manager", team: "Communications + Marketing", location: "New York", manager: 3, joined: "2020-03-02", expertise: ["Internal Comms", "Events"] },
  { id: 29, photo: "https://randomuser.me/api/portraits/men/39.jpg", name: "Blake Cooper", title: "Recruiter", team: "People Team", location: "New York", manager: 13, joined: "2022-10-03", expertise: ["Hiring", "Interviewing"] },
  { id: 30, photo: "https://randomuser.me/api/portraits/women/40.jpg", name: "Alexandra Ross", title: "HR Business Partner", team: "People Team", location: "Boston", manager: 13, joined: "2021-05-17", expertise: ["Employee Relations"] },
  { id: 31, photo: "https://randomuser.me/api/portraits/women/41.jpg", name: "Avery Morgan", title: "Chief Financial Officer", team: "Accounting + Finance", location: "New York", manager: 1, joined: "2016-04-11", expertise: ["Finance", "Capital Planning"] },
  { id: 32, photo: "https://randomuser.me/api/portraits/women/42.jpg", name: "Sage Peterson", title: "Chief Marketing Officer", team: "Communications + Marketing", location: "New York", manager: 1, joined: "2018-01-22", expertise: ["Brand", "Marketing"] },
  { id: 33, photo: "https://randomuser.me/api/portraits/men/43.jpg", name: "Elliot Richardson", title: "Marketing Manager", team: "Communications + Marketing", location: "New York", manager: 28, joined: "2021-06-07", expertise: ["Campaigns"] },
  { id: 34, photo: "https://randomuser.me/api/portraits/women/44.jpg", name: "Remy Cox", title: "Graphic Designer", team: "Communications + Marketing", location: "Boston", manager: 28, joined: "2022-09-12", expertise: ["Design", "Brand"] },
  { id: 35, photo: "https://randomuser.me/api/portraits/women/45.jpg", name: "Harper Howard", title: "Social Media Coordinator", team: "Communications + Marketing", location: "New York", manager: 28, joined: "2024-02-05", expertise: ["Social Media"] },
  { id: 36, photo: "https://randomuser.me/api/portraits/men/46.jpg", name: "Noah Flores", title: "Network Engineer", team: "Technology", location: "Boston", manager: 17, joined: "2021-08-23", expertise: ["Networks", "Wi-Fi"] },
  { id: 37, photo: "https://randomuser.me/api/portraits/men/47.jpg", name: "Milan Rogers", title: "Security Analyst", team: "Technology", location: "New York", manager: 2, joined: "2023-01-09", expertise: ["Security", "Compliance"] },
  { id: 38, photo: "https://randomuser.me/api/portraits/men/48.jpg", name: "Ari Simmons", title: "Project Engineer", team: "Construction", location: "Boston", manager: 21, joined: "2022-04-18", expertise: ["Drawings", "Submittals"] },
  { id: 39, photo: "https://randomuser.me/api/portraits/women/49.jpg", name: "Robin Bell", title: "Assistant Project Manager", team: "Construction", location: "Saratoga", manager: 21, joined: "2023-10-02", expertise: ["Schedules"] },
  { id: 40, photo: "https://randomuser.me/api/portraits/men/50.jpg", name: "Micah Cook", title: "Safety Coordinator", team: "Construction", location: "Saratoga", manager: 20, joined: "2020-05-26", expertise: ["Site Safety"] },
  { id: 41, photo: "https://randomuser.me/api/portraits/women/51.jpg", name: "Shiloh Kelly", title: "Learning + Development Specialist", team: "People Team", location: "New York", manager: 13, joined: "2022-03-14", expertise: ["Training", "Onboarding"] },
  { id: 42, photo: "https://randomuser.me/api/portraits/men/52.jpg", name: "Logan Sanders", title: "Benefits Administrator", team: "People Team", location: "Boston", manager: 13, joined: "2020-11-30", expertise: ["Benefits"] },
  { id: 43, photo: "https://randomuser.me/api/portraits/men/53.jpg", name: "Cory Bennett", title: "Senior Accountant", team: "Accounting + Finance", location: "New York", manager: 5, joined: "2019-09-16", expertise: ["Reporting", "Audit"] },
  { id: 44, photo: "https://randomuser.me/api/portraits/women/54.jpg", name: "Samira Brooks", title: "Tax Analyst", team: "Accounting + Finance", location: "New York", manager: 5, joined: "2022-07-11", expertise: ["Tax"] },
  { id: 45, photo: "https://randomuser.me/api/portraits/men/55.jpg", name: "Devon Murphy", title: "Staff Accountant", team: "Accounting + Finance", location: "New York", manager: 26, joined: "2024-01-22", expertise: ["Reconciliations"] },
  { id: 46, photo: "https://randomuser.me/api/portraits/men/56.jpg", name: "Lee Parker", title: "Payroll Specialist", team: "Accounting + Finance", location: "Boston", manager: 26, joined: "2023-05-08", expertise: ["Payroll"] },
  { id: 47, photo: "https://randomuser.me/api/portraits/men/57.jpg", name: "Amari Watson", title: "Property Manager", team: "Property Operations", location: "Harlem", manager: 6, joined: "2019-03-04", expertise: ["Tenants", "Vendors"] },
  { id: 48, photo: "https://randomuser.me/api/portraits/women/58.jpg", name: "Ellis Turner", title: "Facilities Coordinator", team: "Property Operations", location: "New York", manager: 6, joined: "2023-08-21", expertise: ["Work Orders"] },
  { id: 49, photo: "https://randomuser.me/api/portraits/women/59.jpg", name: "Dana Mitchell", title: "Building Engineer", team: "Property Operations", location: "Saratoga", manager: 6, joined: "2018-12-03", expertise: ["HVAC", "Building Systems"] },
  { id: 50, photo: "https://randomuser.me/api/portraits/women/60.jpg", name: "Jules Ramirez", title: "Development Analyst", team: "Development", location: "Harlem", manager: 23, joined: "2024-09-16", expertise: ["Underwriting"] },
  { id: 51, photo: "https://randomuser.me/api/portraits/men/61.jpg", name: "Frankie Bailey", title: "Contracts Manager", team: "Legal", location: "New York", manager: 14, joined: "2020-02-10", expertise: ["Contracts", "Leasing"] },
  { id: 52, photo: "https://randomuser.me/api/portraits/men/62.jpg", name: "Terry Morgan", title: "Compliance Analyst", team: "Legal", location: "Boston", manager: 14, joined: "2022-06-27", expertise: ["Compliance"] },
];

export const getPersonById = (id: number | string | undefined) => PEOPLE.find((person) => person.id === Number(id));
export const getReports = (id: number) => PEOPLE.filter((person) => person.manager === id);

// ---- Directory filters and sorting ----

// Entity codes for the sample teams (adjust the mapping when the real codes are known).
const ENTITY_CODE: Record<string, string> = {
  "Executive Team": "LMBG", Investments: "LMBG", "Accounting + Finance": "LMBG", Legal: "LMBG", "Risk + Insurance": "LMBG",
  Development: "LMDP", Construction: "LMDP", "Building Envelope + Sustainability": "LMDP", "Community Investment": "LMDP",
  "Property Operations": "LMFM", Operations: "LMFM",
  Technology: "LMXD", "Communications + Marketing": "LMXD", "People Team": "LMXD",
};

/** The value a person has for each directory filter. */
export const FACETS: Record<FilterKey, (person: Person) => string> = {
  company: (p) => (["Executive Team", "Investments", "Accounting + Finance"].includes(p.team) ? "Cornerstone Capital" : "Cornerstone Property Group"),
  department: (p) => p.team,
  title: (p) => p.title,
  timezone: () => "Eastern (ET)",
  management: (p) => (getReports(p.id).length ? "Yes" : "No"),
  entity: (p) => ENTITY_CODE[p.team] ?? "LMBG",
};

export const FILTERS: [FilterKey, string][] = [
  ["department", "Department"],
  ["title", "Job title"],
  ["timezone", "Time zone"],
];

export const SORT_OPTIONS: [SortKey, string][] = [
  ["name", "Name"],
  ["company", "Company"],
  ["title", "Job title"],
  ["department", "Department"],
];

// ---- Profile ----

export const ZONE_LABELS: Record<string, string> = {
  "America/New_York": "(GMT-04:00) Eastern Time - New York",
  "America/Chicago": "(GMT-05:00) Central Time - Chicago",
  "America/Denver": "(GMT-06:00) Mountain Time - Denver",
  "America/Los_Angeles": "(GMT-07:00) Pacific Time - Los Angeles",
  "Europe/London": "(GMT+01:00) British Time - London",
  "Europe/Paris": "(GMT+02:00) Central European Time - Paris",
  "Asia/Kolkata": "(GMT+05:30) India Standard Time - Kolkata",
  "Asia/Tokyo": "(GMT+09:00) Japan Standard Time - Tokyo",
  "Australia/Sydney": "(GMT+10:00) Australian Eastern Time - Sydney",
};

export const LANGUAGE_LABELS: Record<string, string> = {
  "en-US": "English (US) - English (US)",
  "en-GB": "English (UK) - English (UK)",
  es: "Español - Spanish",
  fr: "Français - French",
  de: "Deutsch - German",
  "pt-BR": "Português (Brasil) - Portuguese (Brazil)",
  hi: "हिन्दी - Hindi",
};

/** Starting profile values for a person (the real values will come from the backend). */
export function getProfileDetails(person: Person): ProfileDetails {
  const n = String(person.id).padStart(2, "0");
  const slug = person.name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.+|\.+$/g, "");
  return {
    email: `${slug}@example.com`,
    phone: `(212) 555-01${n}`,
    mobile: `(917) 555-02${n}`,
    timezone: "America/New_York",
    ext: `${3000 + person.id}`,
    zoom: `${810 + (person.id % 9)} ${550 + person.id} ${1000 + person.id}`,
    social_linkedin: `https://www.linkedin.com/in/${slug}`,
    social_x: `https://x.com/${slug}`,
    social_facebook: `https://www.facebook.com/${slug}`,
    social_instagram: `https://www.instagram.com/${slug}`,
    social_youtube: `https://www.youtube.com/@${slug}`,
    company: FACETS.company(person),
    department: FACETS.department(person),
    entity: FACETS.entity(person),
    employeeNumber: `E-${1000 + person.id}`,
    userType: "Employee",
    language: "en-US",
    cf_officeDays: ["Mon, Wed, Thu", "Tue, Wed, Thu", "Mon, Tue, Fri", "Wed, Thu"][person.id % 4],
    cf_management: FACETS.management(person),
    cf_entity: FACETS.entity(person),
    cf_businessLine: FACETS.department(person),
  };
}

// ---- Activity feed (Published / Mentioned) ----

const IMAGES = "/people-page-designs/assets";

/** Content a person published: sample items; the first 7 to 9 are shown, depending on the person. */
const PUBLISHED: ActivityItem[] = [
  { title: "12-Foot Snowman Arrives at HQ", image: `${IMAGES}/12-foot-snowman.jpg`, site: "Company News", date: "2025-12-04" },
  { title: "Hispanic Heritage Month", image: `${IMAGES}/hispanic-heritage-month.jpg`, site: "Community Updates", date: "2025-09-15" },
  { title: "Outdoor Event: Save the Date", image: `${IMAGES}/outdoor-event.jpg`, site: "Company News", date: "2026-03-02" },
  { title: "River Crossing Family Day", image: `${IMAGES}/river-crossing-family-day.jpg`, site: "Community Updates", date: "2025-06-20" },
  { title: "September Community Digest", image: `${IMAGES}/september-community-digest.jpg`, site: "Community Updates", date: "2025-10-01" },
  { title: "Team Celebration Recap", image: `${IMAGES}/team-celebration.avif`, site: "HR Central", date: "2024-11-12" },
  { title: "Workiversaries: Full List", image: `${IMAGES}/workiversaries-full-list.jpg`, site: "HR Central", date: "2024-05-30" },
  { title: "August Community Digest", image: `${IMAGES}/august-community-digest.jpg`, site: "Community Updates", date: "2025-08-29" },
  { title: "Diwali Across Our Offices", image: `${IMAGES}/diwali-across-offices.jpg`, site: "Community Updates", date: "2024-10-31" },
];

/** Content that mentions a person; titles include their name. */
const mentionedItems = (name: string): ActivityItem[] => [
  { title: `Congratulations to ${name}`, image: `${IMAGES}/team-celebration.avif`, site: "HR Central", date: "2026-01-14" },
  { title: `Workiversaries: ${name} + team`, image: `${IMAGES}/workiversaries-full-list.jpg`, site: "HR Central", date: "2025-05-28" },
  { title: `September Community Digest: thanks ${name}`, image: `${IMAGES}/september-community-digest.jpg`, site: "Community Updates", date: "2025-10-02" },
  { title: `River Crossing Family Day volunteers: ${name}`, image: `${IMAGES}/river-crossing-family-day.jpg`, site: "Community Updates", date: "2025-06-23" },
  { title: `Hispanic Heritage Month panel with ${name}`, image: `${IMAGES}/hispanic-heritage-month.jpg`, site: "Managers' Corner", locked: true, date: "2025-09-18" },
  { title: `Outdoor Event hosts: ${name}`, image: `${IMAGES}/outdoor-event.jpg`, site: "Company News", date: "2026-03-05" },
  { title: `Snowman build crew: ${name}`, image: `${IMAGES}/12-foot-snowman.jpg`, site: "Company News", date: "2025-12-06" },
  { title: `August new hires: welcome, and thanks ${name}`, image: `${IMAGES}/august-new-hires.jpg`, site: "HR Central", date: "2025-08-12" },
  { title: `July Workiversaries: ${name}`, image: `${IMAGES}/july-workiversaries.jpg`, site: "HR Central", date: "2025-07-18" },
];

export function getActivity(person: Person): { published: ActivityItem[]; mentioned: ActivityItem[] } {
  const count = 7 + (person.id % 3);
  return { published: PUBLISHED.slice(0, count), mentioned: mentionedItems(person.name).slice(0, count) };
}
