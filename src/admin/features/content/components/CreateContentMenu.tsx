import { BookOpen, CalendarDays, ChevronRight, Newspaper, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ContentType } from "../data";

/** The choices, grouped by kind as in the filter panel: a page (News or Company + Culture) or an event. */
const GROUPS: { title: string; options: { type: ContentType; label: string; hint: string; icon: typeof Plus }[] }[] = [
  {
    title: "Page",
    options: [
      { type: "news", label: "News", hint: "An announcement or business update for employees.", icon: Newspaper },
      { type: "company_culture", label: "Company + Culture", hint: "A story about people, teams and milestones.", icon: BookOpen },
    ],
  },
  {
    title: "Event",
    options: [{ type: "event", label: "Event", hint: "Something with a date, time and place that people can attend.", icon: CalendarDays }],
  },
];

/** The "Create content" button; its popup lists what can be created. */
export function CreateContentMenu({ onCreate }: { onCreate?: (type: ContentType) => void }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)} aria-haspopup="dialog" className="inline-flex h-10 shrink-0 items-center gap-2 px-4">
        <Plus className="size-4" aria-hidden="true" />
        Create content
      </Button>

      <dialog
        ref={dialog}
        aria-labelledby="create-content-title"
        onClose={() => setOpen(false)}
        // A click on the dimmed area around the box lands on the dialog itself.
        onClick={(event) => event.target === event.currentTarget && setOpen(false)}
        className="m-auto w-[min(600px,calc(100vw-32px))] rounded-xl bg-white p-0 text-brand-navy shadow-2xl backdrop:bg-brand-navy/50"
      >
        <div className="flex items-start justify-between gap-4 border-b border-admin-line px-5 py-5 sm:px-7">
          <div>
            <h2 id="create-content-title" className="text-xl font-bold">
              Create content
            </h2>
            <p className="mt-1 text-sm text-admin-muted">What would you like to publish?</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="-mr-2 grid size-9 place-items-center rounded-lg text-admin-muted hover:bg-admin-hover hover:text-brand-navy">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-6">
          {GROUPS.map(({ title, options }) => (
            <section key={title}>
              <h3 className="mb-2.5 text-sm font-bold">{title}</h3>
              <ul className="space-y-3">
                {options.map(({ type, label, hint, icon: Icon }) => (
                    <li key={type}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          onCreate?.(type);
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
