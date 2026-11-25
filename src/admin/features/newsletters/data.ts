export const NEWSLETTER_STATUSES = ["Draft", "Scheduled", "Sent", "Failed to send"] as const;
export type NewsletterStatus = (typeof NEWSLETTER_STATUSES)[number];

export interface Newsletter {
  name: string;
  author: string;
  status: NewsletterStatus;
  audience: string;
  from: string;
  modified: string;
}

const base = { author: "Blerina Kashi", audience: "Everyone in organization", from: "Cornerstone Updates" };

/** Sample newsletters; the dates are already worded for display. */
export const NEWSLETTERS: Newsletter[] = [
  { ...base, name: "Cornerstone Newsletter 303", status: "Draft", modified: "Today" },
  { ...base, name: "Cornerstone Newsletter 302", status: "Scheduled", modified: "Yesterday" },
  { ...base, name: "Cornerstone Newsletter 301", status: "Sent", modified: "4 days ago" },
  { ...base, name: "Cornerstone Newsletter 300", status: "Sent", modified: "11 days ago" },
  { ...base, name: "Cornerstone Newsletter 299", status: "Sent", modified: "18 days ago" },
  { ...base, name: "Cornerstone Newsletter 298", status: "Sent", modified: "25 days ago" },
  { ...base, name: "Builders Safety Briefing", audience: "Builders", status: "Failed to send", modified: "1 month ago" },
  { ...base, name: "Cornerstone Newsletter 297", status: "Sent", modified: "1 month ago" },
];

export const NEWSLETTER_CATEGORIES = ["Company updates", "Safety", "HR + benefits", "Events", "Department news"];

/** Sample templates a newsletter can start from. */
export const NEWSLETTER_TEMPLATES = [
  { name: "Cornerstone Newsletter", description: "The standard issue: featured story, news, upcoming events.", modified: "2 weeks ago" },
  { name: "Safety Briefing", description: "A short, single-topic notice for site teams.", modified: "1 month ago" },
  { name: "Announcement", description: "One headline message with a call to action.", modified: "2 months ago" },
];
