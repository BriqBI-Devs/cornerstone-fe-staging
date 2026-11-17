/** Sample alerts: the dates are [day, time]. */
export const ALERTS = [
  { message: "Scheduled maintenance this Saturday", link: "https://cornerstone.example.com/alerts/maintenance", author: "Keemya Manley", createdAt: ["Nov 21, 2026", "6:00 PM"], expiresAt: ["Nov 22, 2026", "2:00 AM"], status: "Scheduled" },
  { message: "Benefits open enrollment ends Nov 30", link: "https://cornerstone.example.com/alerts/open-enrollment", author: "Sarah Byrne", createdAt: ["Nov 2, 2026", "9:00 AM"], expiresAt: ["Nov 30, 2026", "5:00 PM"], status: "Active" },
  { message: "Parking garage closed today", link: "https://cornerstone.example.com/alerts/parking-garage", author: "Sarah Byrne", createdAt: ["Oct 20, 2026", "7:00 AM"], expiresAt: ["Oct 21, 2026", "7:00 AM"], status: "Expired" },
  { message: "Safety stand-down this Friday at 7:00 AM", link: "https://cornerstone.example.com/alerts/safety-stand-down", author: "Keemya Manley", createdAt: ["Sep 12, 2026", "9:00 AM"], expiresAt: ["Sep 15, 2026", "9:00 AM"], status: "Expired" },
  { message: "MFA rollout completes this month", link: "https://cornerstone.example.com/alerts/mfa-rollout", author: "Amy Cordone", createdAt: ["Sep 10, 2026", "2:19 PM"], expiresAt: ["Sep 30, 2026", "12:00 AM"], status: "Expired" },
] as const;
