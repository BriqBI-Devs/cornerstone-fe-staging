import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { APPS_JSON } from "../data";

const SOURCES = [
  { value: "none", label: "None" },
  { value: "entra", label: "Microsoft Entra" },
  { value: "custom", label: "Custom JSON" },
];

export function AppsJson() {
  const [source, setSource] = useState("custom");

  return (
    <form onSubmit={(event) => event.preventDefault()} className="grid gap-5">
      <div className="grid gap-4 rounded-xl border border-admin-line bg-white p-5">
        <p className="text-sm text-admin-muted">Apps appear in the launchpad in the header.</p>
        <label className="grid gap-1.5 text-sm font-semibold">
          Apps integration
          <select
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="h-10 w-full max-w-sm rounded-lg border border-admin-line bg-white px-3 text-sm font-normal outline-none focus:border-brand-link"
          >
            {SOURCES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {source === "entra" && <p className="text-sm text-admin-muted">The apps list is taken from Microsoft Entra and shown in the launchpad.</p>}

        {source === "custom" && (
          <label className="grid gap-1.5 text-sm font-semibold">
            Custom JSON
            <span className="text-xs font-normal text-admin-muted">Each app needs a name, a url and an img (icon image address).</span>
            <textarea
              rows={16}
              defaultValue={APPS_JSON}
              spellCheck={false}
              className="rounded-lg border border-admin-line bg-white p-3 font-mono text-sm font-normal outline-none focus:border-brand-link"
            />
          </label>
        )}
      </div>
      <Button type="submit" className="justify-self-end">
        Save
      </Button>
    </form>
  );
}
