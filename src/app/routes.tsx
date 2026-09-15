import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { ComingSoonPage } from "../pages/coming-soon/ComingSoonPage";
import { HomePage } from "../pages/home/HomePage";

const COMING_SOON_ROUTES: { path: string; title: string }[] = [
  { path: "news", title: "News" },
  { path: "company-culture", title: "Company + Culture" },
  { path: "events", title: "Events" },
  { path: "people", title: "People" },
  { path: "departments", title: "Departments" },
  { path: "documents", title: "Documents" },
  { path: "policies-resources", title: "Policies + Resources" },
];

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      ...COMING_SOON_ROUTES.map((route) => ({
        path: `/${route.path}`,
        element: <ComingSoonPage title={route.title} />,
      })),
    ],
  },
]);
