import { EllipsisVertical } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "../../../lib/useClickOutside";

export interface RowMenuItem {
  label: string;
  onClick?: () => void;
  /** Makes the item a link. */
  to?: string;
  danger?: boolean;
}

const DEFAULT_ITEMS: RowMenuItem[] = [{ label: "Edit" }, { label: "Delete", danger: true }];

/** The three-dot menu at the end of a list row. Edit and Delete unless other items are given. */
export function RowMenu({ label, items = DEFAULT_ITEMS }: { label: string; items?: RowMenuItem[] }) {
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
        <div className="absolute right-0 z-10 mt-1 w-36 rounded-lg border border-admin-line bg-white py-1 text-sm shadow-lg">
          {items.map((item) => {
            const className = `block w-full px-4 py-2 text-left hover:bg-admin-hover ${item.danger ? "text-admin-danger" : ""}`;
            const close = () => {
              setOpen(false);
              item.onClick?.();
            };
            return item.to ? (
              <Link key={item.label} to={item.to} onClick={close} className={className}>
                {item.label}
              </Link>
            ) : (
              <button key={item.label} type="button" onClick={close} className={className}>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
