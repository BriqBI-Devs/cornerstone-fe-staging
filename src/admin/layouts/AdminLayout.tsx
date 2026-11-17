import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminGuard } from "./AdminGuard";
import { Sidebar } from "./sidebar/Sidebar";
import { TopNav } from "./TopNav";

/** The shell of every /admin page: top navbar, sticky sidebar and the page in the middle. No employee header or footer. */
export function AdminLayout() {
  const { pathname } = useLocation();
  // Only phones use the drawer; on wider screens the sidebar is always there, so this flag changes nothing.
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Every page change starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-white text-brand-navy">
        <TopNav drawerOpen={drawerOpen} onToggleDrawer={() => setDrawerOpen(!drawerOpen)} />
        <div className="grid min-[961px]:grid-cols-[272px_minmax(0,1fr)] min-[961px]:items-start">
          <Sidebar open={drawerOpen} onNavigate={() => setDrawerOpen(false)} />
          <main className="min-h-[calc(100vh-4rem)] min-w-0">
            <Outlet />
          </main>
        </div>
        {drawerOpen && (
          <div onClick={() => setDrawerOpen(false)} aria-hidden="true" className="fixed inset-0 z-[39] bg-admin-navy/45 min-[961px]:hidden" />
        )}
      </div>
    </AdminGuard>
  );
}
