import { Button } from "@/components/ui/Button";
import { TICKET } from "../data";

const inputClass = "h-10 w-full rounded-lg border border-admin-line bg-white px-3 text-sm outline-none focus:border-brand-link";

export function TicketLinkForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="grid max-w-xl gap-4">
      <p className="text-sm text-admin-muted">The button shown on the featured card and on the home page.</p>
      <label className="grid gap-1.5 text-sm font-semibold">
        Button label
        <input defaultValue={TICKET.label} className={inputClass} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold">
        Link
        <input type="url" defaultValue={TICKET.url} className={inputClass} />
      </label>
      <Button type="submit" className="w-fit">
        Save
      </Button>
    </form>
  );
}
