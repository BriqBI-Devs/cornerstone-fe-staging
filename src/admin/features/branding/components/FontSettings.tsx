import { useState } from "react";
import { Button } from "@/components/ui/Button";

const OPTIONS = [
  { value: "default", label: "Default font", hint: "Use the fonts the site comes with." },
  { value: "custom", label: "Custom font", hint: "Add your own font with CSS." },
];

export function FontSettings() {
  const [font, setFont] = useState("default");

  return (
    <form onSubmit={(event) => event.preventDefault()} className="grid gap-5">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        {OPTIONS.map(({ value, label, hint }) => (
          <label key={value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-admin-line bg-white p-5 has-[:checked]:border-admin-navy has-[:checked]:bg-admin-soft">
            <input type="radio" name="font" checked={font === value} onChange={() => setFont(value)} className="mt-1 accent-admin-navy" />
            <span>
              <span className="block text-base font-bold">{label}</span>
              <span className="mt-0.5 block text-sm text-admin-muted">{hint}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {font === "custom" && (
        <div className="grid gap-3 rounded-xl border border-admin-line bg-white p-5">
          <p className="text-sm text-admin-muted">Paste the CSS for your custom font.</p>
          <label className="grid gap-1.5 text-sm font-semibold">
            Font CSS
            <textarea rows={8} className="rounded-lg border border-admin-line bg-white p-3 font-mono text-sm font-normal outline-none focus:border-brand-link" />
          </label>
        </div>
      )}

      <Button type="submit" className="justify-self-end">
        Save
      </Button>
    </form>
  );
}
