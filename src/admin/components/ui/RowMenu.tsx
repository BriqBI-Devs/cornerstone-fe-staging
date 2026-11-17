import { EllipsisVertical } from "lucide-react";
import { useRef, useState } from "react";
import { useClickOutside } from "../../../lib/useClickOutside";

/** The three-dot menu at the end of a list row, with Edit and Delete. */
export function RowMenu({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={`Options for ${label}`}
        aria-expanded={open}
        className="grid size-8 place-items-center rounded-md text-admin-muted hover:bg-admin-hover hover:text-brand-navy"
      >
        <EllipsisVertical className="size-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-32 rounded-lg border border-admin-line bg-white py-1 text-sm shadow-lg">
          <button type="button" onClick={() => setOpen(false)} className="block w-full px-4 py-2 text-left hover:bg-admin-hover">
            Edit
          </button>
          <button type="button" onClick={() => setOpen(false)} className="block w-full px-4 py-2 text-left text-admin-danger hover:bg-admin-hover">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
