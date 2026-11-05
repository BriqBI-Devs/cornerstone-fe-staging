import { Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "../../../../components/ui/Avatar";
import { getProfileDetails } from "../../data";
import type { Person } from "../../types";
import { TeamsIcon } from "../../../../components/ui/TeamsIcon";

// Phone and email only fit on wide screens; below that the list keeps person, team and the buttons.
const columns =
  "grid grid-cols-[1fr_auto] items-center gap-3 px-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)_96px] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.5fr)_96px]";
const iconButton =
  "grid size-9 place-items-center rounded-md border border-border text-brand-link hover:border-brand-link hover:bg-brand-link/10";


/** The list of people on the current page: avatar with job title, team, phone, email, and Teams and org chart icons. */
export function PeopleTable({ people, total }: { people: Person[]; total: number }) {
  return (
    <div>
      <div className={`${columns} h-[34px] border-b border-border text-xs font-bold uppercase tracking-[0.1em] text-brand-navy/60 max-md:hidden`}>
        <span>
          {total} {total === 1 ? "person" : "people"}
        </span>
        <span>Team</span>
        <span className="max-lg:hidden">Phone</span>
        <span className="max-lg:hidden">Email</span>
        <span />
      </div>

      {people.length === 0 && (
        <p className="px-3 py-6 text-sm text-brand-navy/60">No people match your search or filters.</p>
      )}

      {people.map((person) => {
        const { phone, email } = getProfileDetails(person);
        return (
          <div key={person.id} className={`${columns} min-h-[72px] border-b border-border py-2 transition-colors hover:bg-surface-subtle motion-reduce:transition-none`}>
            <span className="flex min-w-0 items-center gap-3.5">
              <Avatar name={person.name} src={person.photo} className="size-[42px] bg-brand-navy text-base ring-2 ring-border" />
              <span className="min-w-0">
                <strong className="block text-base font-semibold">
                  <Link to={`/people/${person.id}`} className="hover:text-brand-accent">
                    {person.name}
                  </Link>
                </strong>
                <small className="block truncate text-xs text-brand-navy/60">{person.title}</small>
              </span>
            </span>
            <span className="truncate text-sm text-brand-navy/90 max-md:hidden">{person.team}</span>
            <a href={`tel:${phone}`} className="truncate text-sm text-brand-navy/90 hover:text-brand-link max-lg:hidden">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="truncate text-sm text-brand-navy/90 hover:text-brand-link max-lg:hidden">
              {email}
            </a>
            <span className="flex justify-self-end gap-2">
              <a
                href={`https://teams.microsoft.com/l/chat/0/0?users=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${person.name} on Microsoft Teams`}
                title="Microsoft Teams"
                className={iconButton}
              >
                <TeamsIcon />
              </a>
              <Link to={`/people/${person.id}/org-chart`} aria-label={`View org chart for ${person.name}`} title="Org chart" className={iconButton}>
                <Network className="size-[18px]" />
              </Link>
            </span>
          </div>
        );
      })}
    </div>
  );
}
