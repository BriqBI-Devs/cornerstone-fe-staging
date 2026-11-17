import { Navigate, useLocation, useOutlet } from "react-router-dom";
import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderPage } from "../components/ui/PlaceholderPage";
import { ADMIN_TITLE, DEFAULT_ADMIN_PAGE, getAdminPage } from "./sidebar/data";
import { NavIcon } from "./sidebar/NavIcon";

/** One admin page: the header band (breadcrumb, title, tabs) and the page's content, or the placeholder if it is not built yet. */
export function AdminPage() {
  // The page and tab come from the URL (/admin/<page>/<tab>), since built pages are static routes without params.
  const [, , id, tab] = useLocation().pathname.split("/");
  const outlet = useOutlet();
  const page = getAdminPage(id);

  // An unknown page opens the default one.
  if (!page) return <Navigate to={`/admin/${DEFAULT_ADMIN_PAGE}`} replace />;

  // A page with tabs always has one open; an unknown tab opens the first.
  const activeTab = page.tabs?.find((t) => t.id === tab);
  if (page.tabs && !activeTab) return <Navigate to={`/admin/${page.id}/${page.tabs[0].id}`} replace />;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: ADMIN_TITLE, to: `/admin/${DEFAULT_ADMIN_PAGE}` },
          { label: page.section },
          ...(page.group ? [{ label: page.group }] : []),
          { label: page.label },
        ]}
        icon={<NavIcon id={page.id} className="size-5" />}
        title={page.label}
        tabs={page.tabs?.map((t) => ({ label: t.label, to: `/admin/${page.id}/${t.id}`, selected: t.id === activeTab?.id }))}
      />
      <div className="px-6 pb-8 pt-6 md:px-12 md:pb-10 md:pt-8">
        {/* A built page is a child route (see app/routes.tsx); without one, the placeholder shows. */}
        <div className="mx-auto max-w-[1080px]">{outlet ?? <PlaceholderPage heading={activeTab?.label ?? page.label} pageLabel={page.label} />}</div>
      </div>
    </>
  );
}
