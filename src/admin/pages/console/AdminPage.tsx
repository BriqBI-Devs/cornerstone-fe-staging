import { Navigate, useLocation, useOutlet } from "react-router-dom";
import { DEFAULT_ADMIN_PAGE, getAdminPage } from "../../features/navigation/data";
import { PageHeader } from "../../features/navigation/components/PageHeader";
import { PlaceholderPage } from "../../components/ui/PlaceholderPage";

/** One admin page: the header band (breadcrumb, title, tabs) and the page's content, or the placeholder if it is not built yet. */
export function AdminPage() {
  // The page and tab come from the URL (/admin/<page>/<tab>), since built pages are static routes without params.
  const [, , id, tab] = useLocation().pathname.split("/");
  const outlet = useOutlet();
  const page = getAdminPage(id);

  // An unknown page opens the default one.
  if (!page) return <Navigate to={`/admin/${DEFAULT_ADMIN_PAGE}`} replace />;

  // A page with tabs always has one open; an unknown tab opens the first.
  const activeTab = page.tabs?.find((t) => t.id === tab)?.id;
  if (page.tabs && !activeTab) return <Navigate to={`/admin/${page.id}/${page.tabs[0].id}`} replace />;

  // A built page is a child route (see app/routes.tsx); without one, the placeholder shows.
  const builtContent = outlet;
  const heading = page.tabs?.find((t) => t.id === activeTab)?.label ?? page.label;

  return (
    <>
      <PageHeader page={page} activeTab={activeTab} />
      <div className="px-6 py-8 md:px-12 md:py-10">
        <div className="mx-auto max-w-[880px]">{builtContent ?? <PlaceholderPage heading={heading} pageLabel={page.label} />}</div>
      </div>
    </>
  );
}
