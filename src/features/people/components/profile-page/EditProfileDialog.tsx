import { useEffect, useRef, useState, type FormEvent } from "react";
import { cn } from "../../../../lib/cn";
import { LANGUAGE_LABELS, PEOPLE, ZONE_LABELS } from "../../data";
import type { Person, ProfileDetails, SavedEdits } from "../../types";

interface FieldDef {
  name: keyof ProfileDetails | "manager";
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  /** Makes it a dropdown: [value, text] pairs. */
  options?: [string, string][];
  /** Takes the full width instead of half. */
  wide?: boolean;
}

const PRONOUNS = ["She/her", "He/him", "They/them", "She/they", "He/they", "Ze/zir", "Prefer not to say"];

/** The tabs of the form and the fields in each. */
const buildPanes = (person: Person): { title: string; fields: FieldDef[] }[] => [
  {
    title: "Personal",
    fields: [
      { name: "first", label: "First name", required: true },
      { name: "last", label: "Last name", required: true },
      { name: "jobTitle", label: "Job title", required: true, wide: true },
      { name: "company", label: "Company name" },
      { name: "entity", label: "Entity" },
      { name: "department", label: "Department" },
      { name: "division", label: "Division" },
      { name: "pronouns", label: "Pronouns", options: PRONOUNS.map((p) => [p, p]), wide: true },
      { name: "address1", label: "Address 1", wide: true },
      { name: "address2", label: "Address 2", wide: true },
      { name: "city", label: "City" },
      { name: "state", label: "State/Province" },
      { name: "zip", label: "ZIP/Postal code" },
      { name: "country", label: "Country" },
    ],
  },
  {
    title: "About",
    fields: [
      { name: "birthday", label: "Birthday", type: "date" },
      { name: "hire", label: "Hire date", type: "date" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { name: "email", label: "Email", type: "email", required: true, wide: true },
      { name: "timezone", label: "Time zone", options: Object.entries(ZONE_LABELS), wide: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "mobile", label: "Mobile phone", type: "tel" },
      { name: "ext", label: "Extension" },
    ],
  },
  {
    title: "Additional",
    fields: [
      { name: "employeeNumber", label: "Employee number" },
      { name: "userType", label: "User type" },
      { name: "language", label: "Language", options: Object.entries(LANGUAGE_LABELS), wide: true },
      { name: "cf_management", label: "Management" },
      { name: "cf_entity", label: "Entity" },
      { name: "cf_businessLine", label: "Department/Business Line", wide: true },
      { name: "cf_officeDays", label: "Office Days", wide: true },
    ],
  },
  {
    title: "Org chart",
    fields: [
      {
        name: "manager",
        label: "Manager",
        wide: true,
        options: PEOPLE.filter((p) => p.id !== person.id)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((p) => [String(p.id), `${p.name} — ${p.title}`]),
      },
    ],
  },
];

const inputClass =
  "h-10 w-full rounded-md border border-[#cfd6df] bg-white px-3 text-sm outline-none focus:border-brand-link focus:shadow-[0_0_0_3px_rgba(29,78,216,0.14)]";

interface EditProfileDialogProps {
  open: boolean;
  person: Person;
  details: ProfileDetails;
  onClose: () => void;
  onSave: (edits: SavedEdits) => void;
}

/** Edit profile form in five tabs. Saved in this browser for now. */
export function EditProfileDialog({ open, person, details, onClose, onSave }: EditProfileDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [pane, setPane] = useState(0);
  const [first, ...rest] = person.name.split(" ");

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  // What each field starts with: name, title and manager come from the person, the rest from the saved details.
  const values: Record<string, string | number> = { ...details, first, last: rest.join(" "), jobTitle: person.title, manager: person.manager ?? "" };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Jump to the tab with the first invalid field.
    const invalid = form.querySelector(":invalid")?.closest<HTMLElement>("[data-pane]");
    if (invalid) setPane(Number(invalid.dataset.pane));
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    onSave({
      name: `${data.first.trim()} ${data.last.trim()}`.trim(),
      title: data.jobTitle.trim(),
      manager: data.manager ? Number(data.manager) : null,
      details: data,
    });
  };

  const panes = buildPanes(person);

  return (
    <dialog
      ref={dialog}
      aria-label="Edit profile"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      className="m-auto max-h-[calc(100vh-48px)] w-[min(760px,calc(100vw-32px))] rounded-xl bg-white p-0 text-brand-navy shadow-[0_30px_80px_-20px_rgba(27,42,58,0.55)] backdrop:bg-brand-navy/55"
    >
      {open && (
        <form onSubmit={submit} className="flex max-h-[calc(100vh-48px)] flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-[18px]">
            <h2 className="text-xl font-bold">Edit profile</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="size-[34px] rounded-md text-2xl leading-none text-brand-navy/60 hover:bg-surface-subtle hover:text-brand-navy">
              ×
            </button>
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-border px-6" role="tablist">
            {panes.map(({ title }, i) => (
              <button
                key={title}
                type="button"
                role="tab"
                aria-selected={pane === i}
                onClick={() => setPane(i)}
                className={cn("relative px-3.5 py-2.5 text-sm font-semibold text-brand-navy/60", pane === i && "text-brand-navy after:absolute after:inset-x-2.5 after:-bottom-px after:h-[3px] after:rounded-t after:bg-brand-accent")}
              >
                {title}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
            {panes.map(({ title, fields }, n) => (
              // Every tab stays in the form (hidden) so one save collects all of them.
              <fieldset key={title} data-pane={n} className={cn("pt-[18px]", pane !== n && "hidden")}>
                <legend className="mb-3.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy/60">{title}</legend>
                <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
                  {fields.map((field) => (
                    <label key={field.name} className={cn("grid min-w-0 gap-1.5", field.wide && "sm:col-span-2")}>
                      <span className="text-sm font-semibold">
                        {field.label}
                        {field.required && <b className="text-red-700"> *</b>}
                      </span>
                      {field.options ? (
                        <select name={field.name} defaultValue={values[field.name] ?? ""} className={inputClass}>
                          <option value="">{field.name === "manager" ? "No manager (top of the organization)" : "Select…"}</option>
                          {field.options.map(([value, text]) => (
                            <option key={value} value={value}>{text}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          name={field.name}
                          type={field.type ?? "text"}
                          required={field.required}
                          placeholder={field.placeholder}
                          defaultValue={values[field.name] ?? ""}
                          maxLength={255}
                          className={inputClass}
                        />
                      )}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="flex justify-end gap-2.5 border-t border-border px-6 py-3.5">
            <button type="button" onClick={onClose} className="h-10 rounded-md border border-[#cfd6df] px-4 text-sm font-semibold hover:border-brand-link hover:text-brand-link">
              Cancel
            </button>
            <button type="submit" className="h-10 rounded-md bg-brand-navy px-4 text-sm font-semibold text-white hover:bg-[#2b3f57]">
              Save changes
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
