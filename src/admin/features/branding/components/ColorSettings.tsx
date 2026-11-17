import { useState } from "react";
import { Button } from "@/components/ui/Button";

const COLORS = [
  { key: "primary", label: "Primary color", use: "Text, banners, footer and primary buttons", value: "#1b2a3a" },
  { key: "link", label: "Link color", use: "Links, secondary buttons and focus rings", value: "#1d4ed8" },
  { key: "accent", label: "Accent color", use: "Banner border, active menu underline and small labels", value: "#f5c518" },
];

export function ColorSettings() {
  const [values, setValues] = useState(Object.fromEntries(COLORS.map((color) => [color.key, color.value])));

  return (
    <form onSubmit={(event) => event.preventDefault()} className="grid gap-5">
      <div className="divide-y divide-admin-line rounded-xl border border-admin-line bg-white">
        {COLORS.map(({ key, label, use }) => (
          <label key={key} className="flex cursor-pointer items-center gap-5 p-5">
            {/* The swatch is the color picker: the real input sits invisibly on top of it. */}
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-admin-line" style={{ background: values[key] }}>
              <input
                type="color"
                value={values[key]}
                onChange={(event) => setValues({ ...values, [key]: event.target.value })}
                aria-label={label}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold">{label}</span>
              <span className="mt-0.5 block text-sm text-admin-muted">{use}</span>
            </span>
            <span className="rounded-lg bg-admin-soft px-3 py-1.5 font-mono text-sm uppercase">{values[key]}</span>
          </label>
        ))}
      </div>
      <Button type="submit" className="justify-self-end">
        Save
      </Button>
    </form>
  );
}
