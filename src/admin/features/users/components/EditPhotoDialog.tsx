import { useEffect, useRef } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

interface EditPhotoDialogProps {
  open: boolean;
  name: string;
  /** TEMP: the sample portrait URL the people directory uses. */
  photo?: string;
  onClose: () => void;
}

/** Static Edit profile photo dialog: UI only, the buttons do nothing yet. */
export function EditPhotoDialog({ open, name, photo, onClose }: EditPhotoDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label="Edit profile photo"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      className="m-auto w-[min(420px,calc(100vw-32px))] rounded-xl bg-white p-0 text-brand-navy shadow-[0_30px_80px_-20px_rgba(27,42,58,0.55)] backdrop:bg-brand-navy/55"
    >
      <div className="border-b border-admin-line px-6 py-4">
        <h2 className="text-lg font-bold">Edit profile photo</h2>
        <p className="mt-0.5 text-sm text-admin-muted">{name}</p>
      </div>

      <div className="flex flex-col items-center gap-4 px-6 py-6">
        <Avatar name={name} src={photo} className="size-28 text-3xl" />
        <div className="flex gap-2">
          <button type="button" className="h-9 rounded-md border border-admin-line px-3 text-sm font-semibold hover:bg-admin-hover">
            Replace photo
          </button>
          <button type="button" className="h-9 rounded-md px-3 text-sm font-semibold text-admin-danger hover:bg-admin-hover">
            Remove
          </button>
        </div>
        <p className="text-xs text-admin-muted">JPG or PNG, up to 1 MB. Square photos work best.</p>
      </div>

      <div className="flex justify-end gap-2.5 border-t border-admin-line px-6 py-3.5">
        <Button variant="secondary" type="button" onClick={onClose} className="h-10 px-4">
          Cancel
        </Button>
        <Button type="button" onClick={onClose} className="h-10 px-4">
          Save
        </Button>
      </div>
    </dialog>
  );
}
