// TEMP: static sample users until the backend exists.
export const USERS = [
  { id: 8, name: "Alex Kim", role: "User", status: "Active", firstLogin: "Pending", created: "Sep 8, 2026", modified: "Jul 21, 2027" },
  { id: 30, name: "Alexandra Ross", role: "User", status: "Active", firstLogin: "Completed", created: "May 17, 2021", modified: "Jun 2, 2026" },
  { id: 12, name: "Connor Marsh", role: "User", status: "Active", firstLogin: "Completed", created: "Feb 15, 2021", modified: "Sep 18, 2026" },
  { id: 13, name: "Riley Bennett", role: "Admin", status: "Active", firstLogin: "Completed", created: "May 8, 2017", modified: "Oct 13, 2026" },
  { id: 17, name: "Drew Sullivan", role: "Admin", status: "Active", firstLogin: "Completed", created: "Nov 5, 2018", modified: "Jul 23, 2026" },
  { id: 27, name: "Jamie Foster", role: "User", status: "Inactive", firstLogin: "Completed", created: "Feb 24, 2025", modified: "Aug 4, 2026" },
  { id: 28, name: "Cameron Hayes", role: "User", status: "Active", firstLogin: "Completed", created: "Mar 2, 2020", modified: "Jun 2, 2026" },
  { id: 33, name: "Elliot Richardson", role: "User", status: "Active", firstLogin: "Pending", created: "Jun 7, 2021", modified: "Apr 20, 2026" },
];

export const FIRST_LOGIN_STYLE: Record<string, string> = {
  Pending: "bg-brand-link/10 text-brand-link",
  Completed: "bg-admin-hover text-admin-muted",
};

export const SESSIONS = [
  { userId: 8, user: "Alex Kim", ip: "10.20.4.17", device: "Windows laptop", location: "New York office", signedIn: "Nov 20, 2026, 8:42 AM" },
  { userId: 13, user: "Riley Bennett", ip: "10.20.4.52", device: "Windows laptop", location: "New York office", signedIn: "Nov 20, 2026, 8:15 AM" },
  { userId: 17, user: "Drew Sullivan", ip: "10.31.1.9", device: "Windows laptop", location: "Boston office", signedIn: "Nov 20, 2026, 7:58 AM" },
  { userId: 22, user: "Finley Ward", ip: "172.58.201.14", device: "iPhone", location: "Saratoga site", signedIn: "Nov 19, 2026, 4:10 PM" },
  { userId: 28, user: "Cameron Hayes", ip: "73.114.60.201", device: "MacBook", location: "Home", signedIn: "Nov 19, 2026, 1:27 PM" },
  { userId: 33, user: "Elliot Richardson", ip: "10.20.4.88", device: "Windows laptop", location: "New York office", signedIn: "Nov 19, 2026, 9:03 AM" },
];

export const EXPORTS = [
  { file: "users-2026-11-20.csv", by: "Riley Bennett", date: "Nov 20, 2026", status: "Success" },
  { file: "users-2026-11-12.csv", by: "Drew Sullivan", date: "Nov 12, 2026", status: "Success" },
  { file: "users-2026-10-29.csv", by: "Riley Bennett", date: "Oct 29, 2026", status: "Success" },
  { file: "users-2026-10-03.csv", by: "Drew Sullivan", date: "Oct 3, 2026", status: "Success" },
];

export const EXPORT_STYLE: Record<string, string> = {
  Success: "bg-green-100 text-green-800",
};

export const STATUS_STYLE: Record<string, string> = {
  Active: "bg-admin-tint text-admin-tint-ink",
  Inactive: "bg-admin-danger/10 text-admin-danger",
};
