/*
 * THE COMMON ADMIN CONSOLE DATA for every design in this folder (design1 ...).
 * Edit the sitemap here once and all the designs change together.
 *
 * What to edit
 *   nav        the sidebar: sections -> groups -> pages. A page can have `tabs` (they show as tabs on that one page,
 *              not as extra sidebar rows) and a `note` (shown after its name, e.g. "Application · 11 reports").
 *
 * The sitemap follows "Option D - full Admin Console page": every item that survived the client's review.
 * Load it before the page's own script:  <script src="../data.js"></script>
 */
window.ADMIN_DATA = {
  title: "Admin Console",
  defaultPage: "branding",

  nav: [
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
              badge: "8 sections", // shown at the right of its sidebar row
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
        { title: "App configuration", items: [{ id: "application", label: "Application", description: "General settings for this Cornerstone site." }] },
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
  ],
};
