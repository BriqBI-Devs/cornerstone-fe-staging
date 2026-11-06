import { Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "../../../../components/ui/Avatar";
import { cn } from "../../../../lib/cn";
import { getPersonById, getReports } from "../../data";
import type { Person } from "../../types";

const MAX_REPORTS_SHOWN = 3;
const label = "mb-1 ml-3 mt-3.5 text-xs font-bold uppercase tracking-[0.06em] text-brand-navy/60 first:mt-0";
const join = <span aria-hidden="true" className="ml-8 h-3 w-px bg-border" />;

function Mini({ person, me }: { person: Person; me?: boolean }) {
  return (
    <Link
      to={`/people/${person.id}`}
      className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-surface-subtle", me && "border-[1.5px] border-brand-link bg-[#f3f6fc]")}
    >
      <Avatar name={person.name} src={person.photo} className="size-10 bg-brand-navy text-xs" />
      <span>
        {person.name}
        <small className="block text-xs font-normal text-brand-navy/60">{person.title}</small>
      </span>
    </Link>
  );
}

/** Who the person reports to and who reports to them, with a link to the full org chart. */
export function OrgSummaryCard({ person }: { person: Person }) {
  const boss = getPersonById(person.manager ?? undefined);
  const reports = getReports(person.id);

  return (
    <section aria-labelledby="h-org" className="rounded-xl border border-border bg-white p-5 sm:p-6">
      <h2 id="h-org" className="mb-4 flex items-center gap-2 text-sm font-bold before:h-3.5 before:w-1 before:rounded-sm before:bg-brand-accent">
        Org chart
      </h2>
      <div className="flex flex-col">
        {boss && (
          <>
            <div className={label}>Reports to</div>
            <Mini person={boss} />
            {join}
          </>
        )}
        <Mini person={person} me />
        {reports.length > 0 && (
          <>
            {join}
            <div className={label}>Direct reports ({reports.length})</div>
            {reports.slice(0, MAX_REPORTS_SHOWN).map((report) => (
              <Mini key={report.id} person={report} />
            ))}
            {reports.length > MAX_REPORTS_SHOWN && (
              <Link to={`/people/${person.id}/org-chart`} className="mx-3 mt-1.5 text-sm font-semibold text-brand-link hover:underline">
                + {reports.length - MAX_REPORTS_SHOWN} more
              </Link>
            )}
          </>
        )}
      </div>
      <Link
        to={`/people/${person.id}/org-chart`}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#d3d9e1] px-[18px] py-[9px] text-sm font-semibold hover:bg-surface-subtle"
      >
        <Network className="size-[15px]" /> Open full org chart
      </Link>
    </section>
  );
}
