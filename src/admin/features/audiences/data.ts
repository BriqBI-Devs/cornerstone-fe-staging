/** Sample audiences in categories. Each audience is a list of people uploaded from a CSV file. */
export const AUDIENCE_CATEGORIES = [
  {
    name: "Managers",
    description: "Used for manager-only alerts and polls",
    audiences: [
      { name: "All managers", description: "Receive manager alerts and polls", users: 84, updated: "Nov 14, 2026" },
    ],
  },
  {
    name: "Events + volunteering",
    description: "Invitation lists for events and volunteer days",
    audiences: [
      { name: "Fall volunteer day", description: "Invitees for the fall volunteer day", users: 128, updated: "Oct 6, 2026" },
      { name: "Holiday party committee", description: "People planning the holiday party", users: 18, updated: "Oct 22, 2026" },
    ],
  },
  {
    name: "Uncategorized",
    description: "Audiences that are not in a category yet",
    audiences: [{ name: "Intranet pilot group", description: "People testing the new Cornerstone", users: 9, updated: "Sep 29, 2026" }],
  },
];
