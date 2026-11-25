export type ContentType = "company_culture" | "news" | "event";

export const CONTENT_TYPES: { id: ContentType; label: string; noun: string }[] = [
  { id: "company_culture", label: "Company + Culture", noun: "story" },
  { id: "news", label: "News", noun: "article" },
  { id: "event", label: "Event", noun: "event" },
];

export const CONTENT_STATUSES = ["Draft", "Pending approval", "Published", "Unpublished", "Rejected"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

/** Which department a piece belongs to; empty means everyone. */
export const DEPARTMENTS = ["Corporate Functions", "People Team", "Construction", "Safety", "Learning + Development"];

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  /** Category name; each type has its own list. */
  category: string;
  author: string;
  department: string;
  status: ContentStatus;
  date: string;
  rejectionReason?: string;
  /** Only events. */
  event?: { time: string; location: string; organizer: string };
}

/** Categories for each type. */
export const CATEGORIES: Record<ContentType, string[]> = {
  company_culture: ["Workiversaries", "New Hires + Welcomes", "Community + Connection", "Cultural Observances", "Company Guide"],
  news: ["Announcements", "Workiversaries", "New Hires", "Your News and Photos", "Company + Culture"],
  event: ["Company-wide", "Learning", "Site events", "People + Benefits"],};

type Seed = Omit<ContentItem, "id" | "type">;
const withType = (type: ContentType, items: Seed[]): ContentItem[] => items.map((item, index) => ({ ...item, type, id: `${type}-${index + 1}` }));

/** Sample content for all three types. */
export const CONTENT: ContentItem[] = [
  ...withType("company_culture", [
    { title: "This month’s Workiversaries: Denise Ramirez (10 years) and Margaret Carestia (12 years)", category: "Workiversaries", author: "Jamie Ortiz", department: "", status: "Published", date: "Sep 9, 2026" },
    { title: "Celebrating 5 Years: Priya Osei + Marcus Field", category: "Workiversaries", author: "Jamie Ortiz", department: "", status: "Published", date: "Sep 2, 2026" },
    { title: "Welcome Alex Kim, Priya Shah, Tomás Rivera, and Sarah Hunt — our September new hires", category: "New Hires + Welcomes", author: "Jamie Ortiz", department: "People Team", status: "Pending approval", date: "Sep 8, 2026" },
    { title: "Laura Reyes Welcomes Baby Lily, Making a Family of Four", category: "New Hires + Welcomes", author: "Laura Reyes", department: "", status: "Rejected", date: "Sep 28, 2026", rejectionReason: "Needs the family’s permission before it goes out." },
    { title: "September Community Digest is out", category: "Community + Connection", author: "Jamie Ortiz", department: "", status: "Draft", date: "Sep 7, 2026" },
    { title: "Fun, Food, and Family at River Crossing", category: "Community + Connection", author: "Jamie Ortiz", department: "Construction", status: "Unpublished", date: "Sep 6, 2026" },
  ]),
  ...withType("news", [
    { title: "September is Suicide Prevention Awareness Month", category: "Announcements", author: "Priya Shah", department: "", status: "Published", date: "Sep 2, 2026" },
    { title: "Q3 Town Hall: what to expect this Friday", category: "Announcements", author: "Elena Torres", department: "Corporate Functions", status: "Pending approval", date: "Sep 15, 2026" },
    { title: "Safety Stand-Down: What Every Site Needs to Know", category: "Announcements", author: "David Kim", department: "Safety", status: "Published", date: "Sep 15, 2026" },
    { title: "Welcome Alex Kim, Priya Shah, Tomás Rivera, and Sarah Hunt — our September new hires", category: "New Hires", author: "Priya Shah", department: "People Team", status: "Draft", date: "Sep 8, 2026" },
    { title: "The 12-foot snowman that stole the show after last winter's storm", category: "Your News and Photos", author: "Jamie Ortiz", department: "", status: "Published", date: "Sep 5, 2026" },
    { title: "Fun, Food, and Family at River Crossing", category: "Company + Culture", author: "Jamie Ortiz", department: "Construction", status: "Rejected", date: "Sep 6, 2026", rejectionReason: "Duplicate of the story already published." },
  ]),
  ...withType("event", [
    { title: "September Town Hall", category: "Company-wide", author: "Elena Torres", department: "Corporate Functions", status: "Published", date: "Sep 29, 2026", event: { time: "4:30 – 5:00 PM", location: "Online", organizer: "Corporate Functions" } },
    { title: "Welcome Back Breakfast", category: "Company-wide", author: "Jamie Ortiz", department: "", status: "Published", date: "Oct 1, 2026", event: { time: "8:00 – 9:30 AM", location: "Main Office, 12th Floor Lounge", organizer: "Cornerstone Events" } },
    { title: "Employee Inclusion Survey | All Employees – Respond by Oct 14", category: "People + Benefits", author: "Priya Shah", department: "People Team", status: "Pending approval", date: "Oct 5 – 14, 2026", event: { time: "All day", location: "Online", organizer: "People Team" } },
    { title: "Benefits Open Enrollment Q+A", category: "People + Benefits", author: "Priya Shah", department: "People Team", status: "Draft", date: "Oct 13, 2026", event: { time: "10:00 – 10:45 AM", location: "Online", organizer: "People Team" } },
    { title: "Lunch + Learn: Building Better Habits", category: "Learning", author: "Elena Torres", department: "Learning + Development", status: "Published", date: "Oct 13, 2026", event: { time: "12:00 – 1:00 PM", location: "Main Office", organizer: "Learning + Development" } },
    { title: "New Hire Welcome and Orientation", category: "People + Benefits", author: "Priya Shah", department: "People Team", status: "Unpublished", date: "Oct 16, 2026", event: { time: "11:00 AM – 12:00 PM", location: "Main Office", organizer: "People Team" } },
    { title: "Saturday Site Family Day", category: "Site events", author: "David Kim", department: "Construction", status: "Published", date: "Oct 17, 2026", event: { time: "10:30 AM – 12:30 PM", location: "River Crossing", organizer: "Site Team" } },
  ]),
];

/** A status as it appears in the address: "Pending approval" is "pending-approval". */
export const statusSlug = (status: string) => status.toLowerCase().replace(/\s+/g, "-");
