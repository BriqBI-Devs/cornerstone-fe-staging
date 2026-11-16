import { Navigate, type RouteObject } from "react-router-dom";
import { DEFAULT_ADMIN_PAGE } from "../features/navigation/data";
import { AdminPage } from "../pages/console/AdminPage";

/** Everything under /admin: built pages are listed here, any other sitemap page falls through to the placeholder. */
export const adminRoutes: RouteObject = {
  path: "admin",
  lazy: async () => ({ Component: (await import("../layouts/AdminLayout")).AdminLayout }),
  children: [
    { index: true, element: <Navigate to={`/admin/${DEFAULT_ADMIN_PAGE}`} replace /> },

    // Built pages: AdminPage draws the header and the matching child route is the content.
    {
      path: "application",
      element: <AdminPage />,
      children: [
        { path: "profile-fields", lazy: async () => ({ Component: (await import("../pages/profile-fields/ProfileFieldsPage")).default }) },
      ],
    },

    // Everything else in the sitemap: header plus the "awaiting backend requirements" placeholder.
    { path: ":id", element: <AdminPage /> },
    { path: ":id/:tab", element: <AdminPage /> },
  ],
};
