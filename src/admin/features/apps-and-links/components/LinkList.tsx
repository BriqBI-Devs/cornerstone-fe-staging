import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { LINKS, MAX_LINKS } from "../data";

const inputClass = "h-10 w-full rounded-lg border border-admin-line bg-white px-3 text-sm font-normal outline-none focus:border-brand-link";

export function LinkList() {
  const [links, setLinks] = useState(LINKS);

  function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setLinks([...links, { label: String(data.get("label")).trim(), url: String(data.get("url")).trim() }]);
    form.reset();
  }

  return (
    <div className="grid gap-5">
      <form onSubmit={add} className="grid gap-4 rounded-xl border border-admin-line bg-white p-5">
        <p className="text-sm text-admin-muted">Add up to {MAX_LINKS} links to the launchpad. They open in a new browser tab.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-semibold">
            Link label
            <input name="label" required maxLength={255} className={inputClass} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Link URL
            <input name="url" type="url" required maxLength={2048} placeholder="https://" className={inputClass} />
          </label>
        </div>
        <Button type="submit" disabled={links.length >= MAX_LINKS} className="justify-self-end disabled:opacity-50">
          Add
        </Button>
      </form>

      <section className="rounded-xl border border-admin-line bg-white">
        <h2 className="border-b border-admin-line px-5 py-3 text-sm font-semibold">
          Links <span className="font-normal text-admin-muted">· {links.length} of {MAX_LINKS}</span>
        </h2>
        <ul className="divide-y divide-admin-line">
          {links.map((link) => (
            <li key={link.url + link.label} className="flex items-center gap-3 px-5 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{link.label}</p>
                <p className="truncate text-xs text-admin-muted">{link.url}</p>
              </div>
              <RowMenu label={link.label} />
            </li>
          ))}
        </ul>
        {links.length === 0 && <p className="px-5 py-8 text-center text-sm text-admin-muted">No links yet.</p>}
      </section>
    </div>
  );
}
