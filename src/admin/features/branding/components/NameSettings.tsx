import { Button } from "@/components/ui/Button";

const inputClass = "h-10 rounded-lg border border-admin-line bg-white px-3 text-sm font-normal outline-none focus:border-brand-link";

export function NameSettings() {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="grid gap-5">
      <div className="grid gap-4 rounded-xl border border-admin-line bg-white p-5">
        <label className="grid gap-1.5 text-sm font-semibold">
          Site name
          <span className="text-xs font-normal text-admin-muted">The large title at the top of every page.</span>
          <input defaultValue="CORNERSTONE" className={inputClass} />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Tagline
          <span className="text-xs font-normal text-admin-muted">The short line shown under the site name.</span>
          <input defaultValue="The L+M Daily" className={inputClass} />
        </label>
      </div>
      <Button type="submit" className="justify-self-end">
        Save
      </Button>
    </form>
  );
}
