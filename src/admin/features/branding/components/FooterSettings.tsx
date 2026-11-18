import { Button } from "@/components/ui/Button";

const inputClass = "rounded-lg border border-admin-line bg-white px-3 text-sm font-normal outline-none focus:border-brand-link";

export function FooterSettings() {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="grid gap-5">
      <div className="grid gap-4 rounded-xl border border-admin-line bg-white p-5">
        <label className="grid gap-1.5 text-sm font-semibold">
          Description
          <span className="text-xs font-normal text-admin-muted">Shown under the site name in the footer.</span>
          <textarea
            rows={2}
            defaultValue="The home for everything L+M — news, people, tools, and the work we build together."
            className={`${inputClass} py-2`}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Copyright text
          <span className="text-xs font-normal text-admin-muted">Shown at the bottom left of the footer.</span>
          <input defaultValue="© 2026 L+M Development Partners · Cornerstone intranet" className={`${inputClass} h-10`} />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Terms of service link
          <span className="text-xs font-normal text-admin-muted">Opens when someone clicks Terms of service in the footer.</span>
          <input type="url" placeholder="https://" className={`${inputClass} h-10`} />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Privacy policy link
          <span className="text-xs font-normal text-admin-muted">Opens when someone clicks Privacy policy in the footer.</span>
          <input type="url" placeholder="https://" className={`${inputClass} h-10`} />
        </label>
      </div>
      <Button type="submit" className="justify-self-end">
        Save
      </Button>
    </form>
  );
}
