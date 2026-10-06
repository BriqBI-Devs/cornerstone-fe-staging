import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { ComingSoonPage } from "../pages/coming-soon/ComingSoonPage";
import { HomePage } from "../pages/home/HomePage";
import { PoliciesResourcesPage } from "../pages/policies-resources/PoliciesResourcesPage";
import { PolicyCategoryPage } from "../pages/policies-resources/PolicyCategoryPage";

const COMING_SOON_ROUTES: { path: string; title: string }[] = [
  { path: "news", title: "News" },
  { path: "company-culture", title: "Company + Culture" },
  { path: "events", title: "Events" },
  { path: "people", title: "People" },
  { path: "departments", title: "Departments" },
  { path: "documents", title: "Documents" },
];

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "policies-resources", element: <PoliciesResourcesPage /> },
      { path: "policies-resources/:categorySlug", element: <PolicyCategoryPage /> },
      ...COMING_SOON_ROUTES.map((route) => ({
        path: `/${route.path}`,
        element: <ComingSoonPage title={route.title} />,
      })),
    ],
  },
]);
