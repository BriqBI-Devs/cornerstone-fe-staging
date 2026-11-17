import type { ComponentType } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { DEFAULT_ADMIN_PAGE } from "../layouts/sidebar/data";
import { AdminPage } from "../pages/console/AdminPage";

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
        { path: "content", ...page(() => import("../pages/manage/content/company-culture/ContentPage")) },
        { path: "categories", ...page(() => import("../pages/manage/content/company-culture/CategoriesPage")) },
      ],
    },
    {
      path: "news",
      element: <AdminPage />,
      children: [
        { path: "content", ...page(() => import("../pages/manage/content/news/ContentPage")) },
        { path: "categories", ...page(() => import("../pages/manage/content/news/CategoriesPage")) },
      ],
    },
    {
      path: "events",
      element: <AdminPage />,
      children: [{ index: true, ...page(() => import("../pages/manage/content/events/EventsPage")) }],
    },
    {
      path: "alerts",
      element: <AdminPage />,
      children: [{ index: true, ...page(() => import("../pages/manage/features/alerts/AlertsPage")) }],
    },
    {
      path: "policies-resources",
      element: <AdminPage />,
      children: [
        { path: "categories", ...page(() => import("../pages/manage/features/policies-resources/CategoriesPage")) },
        { path: "links", ...page(() => import("../pages/manage/features/policies-resources/LinksPage")) },
      ],
    },
    {
      path: "polls",
      element: <AdminPage />,
      children: [{ index: true, ...page(() => import("../pages/manage/features/polls/PollsPage")) }],
    },
    {
      path: "application",
      element: <AdminPage />,
      children: [{ path: "profile-fields", ...page(() => import("../pages/application-settings/app-configuration/application/ProfileFieldsPage")) }],
    },

    // Everything else in the sitemap: header plus the "awaiting backend requirements" placeholder.
    { path: ":id", element: <AdminPage /> },
    { path: ":id/:tab", element: <AdminPage /> },
  ],
};
