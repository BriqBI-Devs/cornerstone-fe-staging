import type { ComponentType } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { DEFAULT_ADMIN_PAGE } from "../layouts/sidebar/data";
import { AdminPage } from "../layouts/AdminPage";

/** A page loaded on demand. */
const page = (load: () => Promise<{ default: ComponentType }>) => ({
  lazy: async () => ({ Component: (await load()).default }),
});

/** Everything under /admin: built pages are listed here, any other sitemap page falls through to the placeholder. */
export const adminRoutes: RouteObject = {
  path: "admin",
  lazy: async () => ({ Component: (await import("../layouts/AdminLayout")).AdminLayout }),
  children: [
    { index: true, element: <Navigate to={`/admin/${DEFAULT_ADMIN_PAGE}`} replace /> },

    {
      path: "company-culture",
      element: <AdminPage />,
      children: [
        { path: "content", ...page(() => import("../pages/company-culture/ContentPage")) },
        { path: "categories", ...page(() => import("../pages/company-culture/CategoriesPage")) },
      ],
    },
    {
      path: "news",
      element: <AdminPage />,
      children: [
        { path: "content", ...page(() => import("../pages/news/ContentPage")) },
        { path: "categories", ...page(() => import("../pages/news/CategoriesPage")) },
      ],
    },
    {
      path: "events",
      element: <AdminPage />,
      children: [{ index: true, ...page(() => import("../pages/events/EventsPage")) }],
    },
    {
      path: "alerts",
      element: <AdminPage />,
      children: [{ index: true, ...page(() => import("../pages/alerts/AlertsPage")) }],
    },
    {
      path: "policies-resources",
      element: <AdminPage />,
      children: [
        { path: "categories", ...page(() => import("../pages/policies-resources/CategoriesPage")) },
        { path: "links", ...page(() => import("../pages/policies-resources/LinksPage")) },
      ],
    },
    {
      path: "audiences",
      element: <AdminPage />,
      children: [{ index: true, ...page(() => import("../pages/audiences/AudiencesPage")) }],
    },
    {
      path: "polls",
      element: <AdminPage />,
      children: [{ index: true, ...page(() => import("../pages/polls/PollsPage")) }],
    },
    {
      path: "branding",
      element: <AdminPage />,
      children: [
        { path: "logo", ...page(() => import("../pages/branding/LogoPage")) },
        { path: "name-and-tagline", ...page(() => import("../pages/branding/NamePage")) },
        { path: "footer", ...page(() => import("../pages/branding/FooterPage")) },
        { path: "font", ...page(() => import("../pages/branding/FontPage")) },
        { path: "primary-and-link-colors", ...page(() => import("../pages/branding/PrimaryColorsPage")) },
      ],
    },
    {
      path: "home-layout",
      element: <AdminPage />,
      children: [{ index: true, ...page(() => import("../pages/home-layout/HomeLayoutPage")) }],
    },
    {
      path: "apps-and-links",
      element: <AdminPage />,
      children: [
        { path: "apps", ...page(() => import("../pages/apps-and-links/AppsPage")) },
        { path: "links", ...page(() => import("../pages/apps-and-links/LinksPage")) },
      ],
    },
    {
      path: "users",
      element: <AdminPage />,
      children: [
        { path: "users", ...page(() => import("../pages/users/UsersPage")) },
        { path: "sessions", ...page(() => import("../pages/users/SessionsPage")) },
        { path: "export-history", ...page(() => import("../pages/users/ExportHistoryPage")) },
      ],
    },
    {
      path: "application",
      element: <AdminPage />,
      children: [
        { path: "profile-fields", ...page(() => import("../pages/application/ProfileFieldsPage")) },
        { path: "page-headers", ...page(() => import("../pages/application/PageHeadersPage")) },
      ],
    },

    // Everything else in the sitemap: header plus the "awaiting backend requirements" placeholder.
    { path: ":id", element: <AdminPage /> },
    { path: ":id/:tab", element: <AdminPage /> },
  ],
};
