import { FolderPlus, Link2, Upload } from "lucide-react";
import { useEffect, useRef } from "react";

const OPTIONS = [
  { label: "Create folder", hint: "Add a new folder here", icon: FolderPlus },
  { label: "Upload file", hint: "Upload a document", icon: Upload },
  { label: "Add link", hint: "Link to a page or form", icon: Link2 },
];

export function AddContentDialog({ open, location, onClose }: { open: boolean; location: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto w-[min(400px,92vw)] rounded-card border border-border p-0 backdrop:bg-brand-navy/50"
    >
      <div className="p-5">
        <h2 className="text-base font-bold text-brand-navy">Add to {location}</h2>
        <ul className="mt-4 space-y-2">
          {OPTIONS.map(({ label, hint, icon: Icon }) => (
            <li key={label}>
              <button
                type="button"
                onClick={onClose}
                className="flex w-full items-center gap-3 rounded-md border border-border px-4 py-3 text-left transition-colors hover:border-brand-link hover:bg-brand-link/[0.08]"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand-link" />
                <span>
                  <span className="block text-sm font-semibold text-brand-navy">{label}</span>
                  <span className="block text-xs text-brand-navy/60">{hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
