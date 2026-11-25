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
            id: "content",
            label: "Content",
            tabs: [
              { id: "content", label: "Content" },
              { id: "categories", label: "Categories" },
            ],
          },
          // The same page as Content, opened on Pending approval (like Simpplr's /manage/content?status=...).
          { id: "onboarding-content", label: "Onboarding content", to: "/admin/content/content?status=pending-approval" },
        ],
      },
      {
        title: "Features",
        items: [
          { id: "departments", label: "Departments" },
          { id: "policies-resources", label: "Policies + Resources" },
          {
            id: "newsletters",
            label: "Newsletters",
            tabs: [
              { id: "newsletters", label: "Newsletters" },
              { id: "categories", label: "Categories" },
              { id: "templates", label: "Templates" },
            ],
          },
          { id: "polls", label: "Polls" },
          { id: "alerts", label: "Alerts" },
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
            tabs: [
              { id: "people", label: "People" },
              { id: "pages", label: "Pages" },
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
            badge: "5 sections",
            tabs: [
              { id: "logo", label: "Logo" },
              { id: "name-and-tagline", label: "Name + tagline" },
              { id: "footer", label: "Footer" },
              { id: "font", label: "Font" },
              { id: "primary-and-link-colors", label: "Primary + link colors" },
            ],
          },
          { id: "home-layout", label: "Home layout", badge: "Live editor" },
          {
            id: "apps-and-links",
            label: "Apps + links",
            tabs: [
              { id: "apps", label: "Apps" },
              { id: "links", label: "Links" },
            ],
          },
        ],
      },
      {
        title: "Users + groups",
        items: [
          { id: "audiences", label: "Audiences" },
          {
            id: "users",
            label: "Users",
            tabs: [
              { id: "users", label: "Users" },
              { id: "sessions", label: "Sessions" },
              { id: "export-history", label: "Export history" },
            ],
          },
        ],
      },
    ],
  },
  {
    section: "Analytics",
    groups: [
      {
        title: null,
        items: [{ id: "analytics-application", label: "Application", note: "11 reports" }],
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
