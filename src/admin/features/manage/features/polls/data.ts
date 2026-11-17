export const STATUSES = ["Active", "Draft", "Expired"] as const;

/** Sample polls: each option is [label, percent of votes]. */
export const POLLS = [
  { question: "Which Saturday works best for the fall volunteer day?", status: "Active", votes: 128, when: "Closes Oct 20, 2026", options: [["Oct 11", 58], ["Oct 18", 42]] },
  { question: "How do you prefer to get company updates?", status: "Active", votes: 342, when: "Closes Oct 31, 2026", options: [["Email digest", 36], ["Cornerstone home page", 64]] },
  { question: "Pick the theme for the holiday party", status: "Draft", votes: 0, when: "Not published", options: [["Winter lights", 0], ["Retro night", 0]] },
  { question: "Rate the new Cornerstone intranet", status: "Draft", votes: 0, when: "Not published", options: [["Love it", 0], ["Needs work", 0]] },
  { question: "Should Cornerstone Weekly Connect move to Tuesdays?", status: "Expired", votes: 410, when: "Closed Sep 30, 2026", options: [["Yes", 71], ["No", 29]] },
  { question: "Which benefits topic should the next Q+A cover?", status: "Expired", votes: 265, when: "Closed Sep 12, 2026", options: [["Health plans", 47], ["Retirement", 53]] },
] as const;
