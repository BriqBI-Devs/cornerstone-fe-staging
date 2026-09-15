import { Search, Users } from "lucide-react";
import { Card } from "../../components/ui/Card";

export function PeopleFinder() {
  return (
    <Card className="border-t-2 border-t-brand-navy">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
          <Users className="h-3.5 w-3.5" />
        </span>
        <p className="text-[15px] font-bold text-brand-navy">Directory strip</p>
      </div>

      <label htmlFor="people-finder-search" className="text-xs font-semibold uppercase tracking-wide text-brand-navy/55">
        Search
      </label>
      <div className="mt-1.5 flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-4 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-brand-navy/55" />
        <input
          id="people-finder-search"
          type="text"
          placeholder="Search by name, title, or department..."
          className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-brand-navy/55"
        />
      </div>
    </Card>
  );
}
