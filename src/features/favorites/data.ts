export type FavTab = "content" | "apps" | "files";
export type FavSub = "pages" | "events";
export interface FavItem { id: string; tab: FavTab; sub?: FavSub; title: string; to?: string; meta?: string; image?: string; category?: string; date?: [string, string] }

/** Static sample favorites, shown on the Favorites page, the home workspace and the app launcher. */
export const FAVORITES: FavItem[] = [
  { id: "workiversaries-sep", tab: "content", sub: "pages", title: "This month’s Workiversaries: Denise Ramirez (10 years) and Margaret Carestia (12 years)", to: "/company-culture/workiversaries-sep", meta: "Sep 9, 2026", category: "workiversaries" },
  { id: "welcome-september-new-hires", tab: "content", sub: "pages", title: "Welcome Alex Kim, Priya Shah, Tomás Rivera, and Sarah Hunt — our September new hires", to: "/company-culture/welcome-september-new-hires", meta: "Sep 2026" },
  { id: "event-september-town-hall", tab: "content", sub: "events", title: "September Town Hall", to: "/events/september-town-hall", date: ["Sep", "29"] },
  { id: "event-weekly-connect", tab: "content", sub: "events", title: "Cornerstone Weekly Connect", to: "/events/weekly-connect", date: ["Oct", "13"] },
  { id: "app-Canva", tab: "apps", title: "Canva", image: "/cornerstone-assets/apps/Canva-logo-img.png" },
  { id: "app-Monday.com", tab: "apps", title: "Monday.com", image: "/cornerstone-assets/apps/monday-com-img.png" },
  { id: "app-Salesforce", tab: "apps", title: "Salesforce", image: "/cornerstone-assets/apps/Salesforce-img.png" },
  { id: "file-policies", tab: "files", title: "Policies + Resources", to: "/policies-resources", meta: "All company policies" },
];
