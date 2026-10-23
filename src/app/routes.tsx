import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { ComingSoonPage } from "../pages/coming-soon/ComingSoonPage";
import { CompanyCulturePage } from "../pages/company-culture/CompanyCulturePage";
import { StoryDetailPage } from "../pages/company-culture/StoryDetailPage";
import { EventsPage } from "../pages/events/EventsPage";
import { FavoritesPage } from "../pages/favorites/FavoritesPage";
import { HomePage } from "../pages/home/HomePage";
import { PeoplePage } from "../pages/people/PeoplePage";
import { PoliciesResourcesPage } from "../pages/policies-resources/PoliciesResourcesPage";
import { PolicyCategoryPage } from "../pages/policies-resources/PolicyCategoryPage";

const COMING_SOON_ROUTES: { path: string; title: string }[] = [
  { path: "news", title: "News" },
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
      { path: "company-culture", element: <CompanyCulturePage /> },
      { path: "company-culture/:slug", element: <StoryDetailPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "people", element: <PeoplePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      ...COMING_SOON_ROUTES.map((route) => ({
        path: `/${route.path}`,
        element: <ComingSoonPage title={route.title} />,
      })),
    ],
  },
]);
