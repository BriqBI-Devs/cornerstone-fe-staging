import { PageHeaderSettings } from "../../features/application/components/PageHeaderSettings";

/** Admin > Application > Pages tab. */
export default function PageHeadersPage() {
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-base font-semibold">Page headers</h2>
        <p className="mt-0.5 text-sm text-admin-muted">
          Manage the introductory text shown in the banner at the top of each page. Changes apply to the page named on each card.
        </p>
      </div>
      <PageHeaderSettings />
    </div>
  );
}
