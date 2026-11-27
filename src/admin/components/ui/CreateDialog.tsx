import { ChevronRight, Plus, X, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export interface CreateGroup {
  /** Heading above the choices; leave it out when there is only one group. */
  title?: string;
  options: { id: string; label: string; hint: string; icon: LucideIcon }[];
}

interface CreateDialogProps {
  /** The button's text, also the popup's heading. */
  label: string;
  /** The question under the heading. */
  question: string;
  groups: CreateGroup[];
  onCreate?: (id: string) => void;
}

/** A "Create ..." button; its popup lists what can be created. */
export function CreateDialog({ label, question, groups, onCreate }: CreateDialogProps) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)} aria-haspopup="dialog" className="inline-flex h-10 shrink-0 items-center gap-2 px-4">
        <Plus className="size-4" aria-hidden="true" />
        {label}
      </Button>

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        // A click on the dimmed area around the box lands on the dialog itself.
        onClick={(event) => event.target === event.currentTarget && setOpen(false)}
        className="m-auto w-[min(600px,calc(100vw-32px))] rounded-xl bg-white p-0 text-brand-navy shadow-2xl backdrop:bg-brand-navy/50"
      >
        <div className="flex items-start justify-between gap-4 border-b border-admin-line px-5 py-5 sm:px-7">
          <div>
            <h2 id={titleId} className="text-xl font-bold">
              {label}
            </h2>
            <p className="mt-1 text-sm text-admin-muted">{question}</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="-mr-2 grid size-9 place-items-center rounded-lg text-admin-muted hover:bg-admin-hover hover:text-brand-navy">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-6">
          {groups.map(({ title, options }) => (
            <section key={title ?? "all"}>
              {title && <h3 className="mb-2.5 text-sm font-bold">{title}</h3>}
              <ul className="space-y-3">
                {options.map(({ id, label, hint, icon: Icon }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onCreate?.(id);
                      }}
                      className="group flex w-full items-center gap-4 rounded-lg border border-admin-line p-4 text-left transition-colors hover:border-brand-navy hover:bg-admin-soft sm:p-5"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-admin-hover group-hover:bg-brand-navy group-hover:text-white">
                        <Icon className="size-6 stroke-[1.5]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-bold">{label}</span>
                        <span className="mt-0.5 block text-sm text-admin-muted">{hint}</span>
                      </span>
                      <ChevronRight className="size-5 shrink-0 text-admin-faint group-hover:text-brand-navy" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </dialog>
    </>
  );
}
