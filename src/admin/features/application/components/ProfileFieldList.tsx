import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { loadProfileFields, saveProfileFields } from "../api";
import type { ProfileFieldSetting } from "../types";

/** Profile fields: switch each one on or off for employees. Values from Dayforce and Microsoft stay read-only. */
export function ProfileFieldList() {
  const [fields, setFields] = useState<ProfileFieldSetting[] | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    loadProfileFields().then((loaded) => active && setFields(loaded));
    return () => {
      active = false;
    };
  }, []);

  if (!fields) return <p className="text-sm text-admin-muted">Loading…</p>;

  const toggle = (id: string) => {
    const next = fields.map((field) =>
      field.id === id && !field.locked
        ? { ...field, visible: !field.visible }
        : field,
    );
    setFields(next);
    setSaved(false);
  };

  const save = () => saveProfileFields(fields).then(() => setSaved(true));

  return (
    <div>
      <div className="rounded-xl border border-admin-line bg-white">
        <ul>
          {fields.map((field) => (
            <li
              key={field.id}
              className="flex items-center gap-4 border-b border-admin-line px-5 py-3.5 last:border-b-0"
            >
              <label
                className={cn(
                  "flex min-w-0 flex-1 items-start gap-3",
                  field.locked ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <input
                  type="checkbox"
                  checked={field.visible}
                  disabled={field.locked}
                  onChange={() => toggle(field.id)}
                  className="mt-0.5 size-4 shrink-0 accent-admin-navy"
                />
                <span className="text-sm font-semibold">{field.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex items-center justify-end gap-3">
        <span
          aria-live="polite"
          className={cn(
            "text-xs font-semibold text-admin-gold transition-opacity",
            !saved && "opacity-0",
          )}
        >
          Saved
        </span>
        <Button type="button" onClick={save}>
          Save
        </Button>
      </div>
    </div>
  );
}
