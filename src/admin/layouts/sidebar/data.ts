/** The admin sitemap (sections -> groups -> pages); the sidebar, breadcrumbs and tabs all follow it. */

import type { AdminNavSection, AdminPageInfo } from "./types";

export const ADMIN_TITLE = "Admin Console";
export const DEFAULT_ADMIN_PAGE = "branding";

export const ADMIN_NAV: AdminNavSection[] = [
  {
    section: "Manage",
    groups: [
      {
        title: "Content",
        items: [
          {
            id: "company-culture",
            label: "Company + Culture",
            description: "Stories, categories and the featured carousel.",
            tabs: [
              { id: "content", label: "Content", action: "Create story" },
              { id: "categories", label: "Categories", action: "Create category" },
            ],
          },
          {
            id: "news",
            label: "News",
            description: "News articles shown on the home page and the news page.",
            tabs: [
              { id: "content", label: "Content", action: "Create article" },
              { id: "categories", label: "Categories", action: "Create category" },
            ],
          },
          { id: "events", label: "Events", description: "Events, locations and RSVPs, including multi-day events.", action: "Create event" },
        ],
      },
      {
        title: "Features",
        items: [
          { id: "departments", label: "Departments", description: "Each team's description and lead." },
          { id: "polls", label: "Polls", description: "Create polls and see the results.", action: "Create poll" },
          { id: "alerts", label: "Alerts", description: "Banners and notices shown across Cornerstone.", action: "Create alert" },
        ],
      },
    ],
  },
  {
    section: "Application settings",
    groups: [
      {
        title: "App configuration",
        items: [
          {
            id: "application",
            label: "Application",
            description: "General settings for this Cornerstone site, and which profile fields employees can see.",
            tabs: [
              { id: "profile-fields", label: "Profile fields" },
              { id: "general", label: "General" },
            ],
          },
        ],
      },
      {
        title: "Feature control",
        items: [
          {
            id: "branding",
            label: "Branding",
            badge: "8 sections",
            description: "Control how Cornerstone looks: the logo, colors, fonts, header and navigation.",
            tabs: [
              { id: "logo", label: "Logo" },
              { id: "color-palette", label: "Color palette" },
              { id: "font", label: "Font" },
              { id: "primary-and-link-colors", label: "Primary + link colors" },
              { id: "page", label: "Page" },
              { id: "header", label: "Header" },
              { id: "navigation", label: "Navigation" },
              { id: "analytics", label: "Analytics" },
            ],
          },
          { id: "apps-and-links", label: "Apps + links", description: "The apps and links shown in the apps menu." },
        ],
      },
      {
        title: "Users + groups",
        items: [
          { id: "access-control", label: "Access control", description: "Roles and what each role can do." },
          { id: "audiences", label: "Audiences", description: "Groups of people used to target content." },
          { id: "users", label: "Users", description: "Add, edit and deactivate users." },
        ],
      },
    ],
  },
  {
    section: "Analytics",
    groups: [
      {
        title: null,
        items: [{ id: "analytics-application", label: "Application", note: "11 reports", description: "Usage reports for Cornerstone." }],
      },
    ],
  },
];

/** Every page by id, with its section and group. */
export const ADMIN_PAGES: Record<string, AdminPageInfo> = Object.fromEntries(
  ADMIN_NAV.flatMap((section) =>
    section.groups.flatMap((group) =>
      group.items.map((item): [string, AdminPageInfo] => [item.id, { ...item, section: section.section, group: group.title }]),
    ),
  ),
);

export const ADMIN_PAGE_LIST: AdminPageInfo[] = Object.values(ADMIN_PAGES);

export const getAdminPage = (id: string | undefined) => (id ? ADMIN_PAGES[id] : undefined);
