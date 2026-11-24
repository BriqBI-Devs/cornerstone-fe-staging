import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SettingsNav } from "./SettingsNav";

const OPTIONS = [
  { id: "feedback", label: "Feedback" },
  { id: "ticket", label: "Ticket link" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "email", label: "Email" },
];

const inputClass = "h-10 w-full rounded-lg border border-admin-line bg-white px-3 text-sm font-normal outline-none focus:border-brand-link";

/** The raise-a-ticket button shown on the featured Policies + Resources card and the home page. */
const TICKET = { label: "Raise a ticket", url: "https://lmdevpartners.sysaidit.com/sysai/ui/#/ui/" };

export function GeneralSettings() {
  const [active, setActive] = useState("feedback");

  return (
    <div className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)]">
      <SettingsNav options={OPTIONS} active={active} onSelect={setActive} />

      {active === "feedback" ? (
        <form onSubmit={(event) => event.preventDefault()} className="grid content-start gap-5">
          <section className="rounded-xl border border-admin-line bg-white p-5">
            <h2 className="text-sm font-semibold">Home feedback section</h2>
            <p className="mt-0.5 text-xs text-admin-muted">The feedback card on the home page, where employees send feedback, story ideas and news. Set its heading, message and contact email here.</p>
            <label className="mt-5 grid gap-1.5 text-sm font-semibold">
              Title
              <input defaultValue="Feedback and ideas" className={inputClass} />
            </label>
            <label className="mt-5 grid gap-1.5 text-sm font-semibold">
              Description
              <textarea
                rows={4}
                defaultValue="We welcome your feedback about the intranet, as well as any story ideas you might have or news you'd like to share. Need help with something else? Raise a ticket."
                className="w-full rounded-lg border border-admin-line bg-white px-3 py-2 text-sm font-normal outline-none focus:border-brand-link"
              />
            </label>
            <label className="mt-5 grid gap-1.5 text-sm font-semibold">
              Intranet team email
              <span className="text-xs font-normal text-admin-muted">
                Where feedback and story ideas are sent. The "Email the intranet team" button opens a new email to this address.
              </span>
              <span className="relative mt-1 block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" aria-hidden="true" />
                <input
                  type="email"
                  defaultValue="intranet@lmdevelopmentpartners.com"
                  className="h-10 w-full rounded-lg border border-admin-line bg-white pl-9 pr-3 text-sm font-normal outline-none focus:border-brand-link"
                />
              </span>
            </label>
          </section>
          <Button type="submit" className="justify-self-end">
            Save
          </Button>
        </form>
      ) : active === "ticket" ? (
        <form onSubmit={(event) => event.preventDefault()} className="grid content-start gap-5">
          <section className="rounded-xl border border-admin-line bg-white p-5">
            <h2 className="text-sm font-semibold">Ticket button</h2>
            <p className="mt-0.5 text-xs text-admin-muted">The "Raise a ticket" button employees use to reach the IT help desk. It appears on the featured card in Policies + Resources and in the feedback section on the home page.</p>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-1.5 text-sm font-semibold">
                Button label
                <input defaultValue={TICKET.label} className={inputClass} />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                Link
                <input type="url" defaultValue={TICKET.url} className={inputClass} />
              </label>
            </div>
          </section>
          <Button type="submit" className="justify-self-end">
            Save
          </Button>
        </form>
      ) : active === "linkedin" ? (
        <section className="content-start rounded-xl border border-admin-line bg-white p-5">
          <h2 className="text-sm font-semibold">LinkedIn</h2>
          <p className="mt-0.5 text-xs text-admin-muted">LinkedIn feed settings for the home page.</p>
          <p className="mt-5 rounded-lg border border-dashed border-admin-line px-4 py-3 text-sm text-admin-muted">
            <span className="font-semibold text-brand-navy">Pending configuration.</span> The LinkedIn feed is not set up yet.
            The page connection and feed settings will be configured here.
          </p>
        </section>
      ) : (
        <section className="content-start rounded-xl border border-admin-line bg-white p-5">
          <h2 className="text-sm font-semibold">Email</h2>
          <p className="mt-0.5 text-xs text-admin-muted">Sender and email settings for the intranet.</p>
          <p className="mt-5 rounded-lg border border-dashed border-admin-line px-4 py-3 text-sm text-admin-muted">
            <span className="font-semibold text-brand-navy">Pending configuration.</span> The mail service is not set up yet.
            Once the mail features are built, the sender address and delivery settings will be configured here.
          </p>
        </section>
      )}
    </div>
  );
}
