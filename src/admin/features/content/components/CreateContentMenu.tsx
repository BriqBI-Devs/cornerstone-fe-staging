import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useClickOutside } from "@/lib/useClickOutside";
import type { ContentType } from "../data";

const OPTIONS: { type: ContentType; label: string; hint: string }[] = [
  { type: "company_culture", label: "Story", hint: "Company + Culture" },
  { type: "news", label: "News article", hint: "Announcements and updates" },
  { type: "event", label: "Event", hint: "Has a date, time and place" },
];

/** The "Create content" button; the menu lists what can be created. */
export function CreateContentMenu({ onCreate }: { onCreate?: (type: ContentType) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative shrink-0">
      <Button onClick={() => setOpen(!open)} aria-expanded={open} className="inline-flex h-10 items-center gap-2 px-4">
        Create content
        <ChevronDown className="size-4" aria-hidden="true" />
      </Button>

      {open && (
        <div className="absolute right-0 z-10 mt-1 w-56 rounded-lg border border-admin-line bg-white py-1 text-sm shadow-lg">
          {OPTIONS.map(({ type, label, hint }) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setOpen(false);
                onCreate?.(type);
              }}
              className="block w-full px-4 py-2 text-left hover:bg-admin-hover"
            >
              {label}
              <span className="block text-xs text-admin-muted">{hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
