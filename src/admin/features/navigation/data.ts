/** The admin sitemap (sections -> groups -> pages); the sidebar, breadcrumbs and tabs all follow it. */

import type { AdminNavSection, AdminPageInfo } from "./types";

export const ADMIN_TITLE = "Admin Console";
export const DEFAULT_ADMIN_PAGE = "branding";

export const ADMIN_NAV: AdminNavSection[] = [
  {
    section: "Manage",
    groups: [
      {
        title: "Sites + content",
        items: [
          { id: "content", label: "Content", description: "Manage the pages, news and files published on Cornerstone." },
          { id: "onboarding-content", label: "Onboarding content", description: "Guides and checklists shown to new team members." },
          {
            id: "sites",
            label: "Sites",
            description: "Create and manage sites, their categories and their subscriptions.",
            tabs: [
              { id: "site-categories", label: "Site categories" },
              { id: "subscriptions", label: "Subscriptions" },
            ],
          },
        ],
      },
      {
        title: "Features",
        items: [
          { id: "alerts", label: "Alerts", description: "Banners and notices shown across Cornerstone." },
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
          { id: "custom-app-tiles", label: "Custom app tiles", description: "Add your own tiles to the apps menu and the home page." },
          { id: "landing-pages", label: "Landing pages", description: "Build and publish landing pages." },
          { id: "navigation", label: "Navigation", description: "The main menu and the order of its items." },
          { id: "newsletters", label: "Newsletters", description: "Create, schedule and review newsletters." },
          { id: "polls", label: "Polls", description: "Create polls and see the results." },
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
          { id: "apps-and-links", label: "Apps + links", description: "The apps and links shown in the apps menu." },
          { id: "company-values", label: "Company values", description: "The company values shown across Cornerstone." },
          { id: "topics", label: "Topics", description: "The topics used to tag content." },
        ],
      },
      {
        title: "Users + groups",
        items: [
          { id: "access-control", label: "Access control", description: "Roles and what each role can do." },
          { id: "audiences", label: "Audiences", description: "Groups of people used to target content." },
          { id: "users", label: "Users", description: "Add, edit and deactivate users." },
          { id: "export-history", label: "Export history", description: "Past data exports and their downloads." },
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
