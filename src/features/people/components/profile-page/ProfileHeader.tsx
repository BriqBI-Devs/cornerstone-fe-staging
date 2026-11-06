import { Building2, Clock, Hash, Mail, Pencil, Phone, Smartphone, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "../../../../components/ui/Avatar";
import { TempNote } from "../../../../components/ui/TempNote";
import { ZONE_LABELS } from "../../data";
import type { Person, ProfileDetails } from "../../types";
import { TeamsIcon } from "../../../../components/ui/TeamsIcon";

const action =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-brand-navy px-[18px] py-[9px] text-sm font-semibold hover:bg-surface-subtle max-sm:flex-1";
const icon = "size-[15px] shrink-0";
const link = "hover:text-brand-link hover:underline hover:underline-offset-[3px]";

/** Photo, name, role, the company, department and contact details as light tag rows, and the profile actions. */
export function ProfileHeader({ person, details, onEdit }: { person: Person; details: ProfileDetails; onEdit: () => void }) {
  // Everything shown as a tag, in order: company and department, then the contact details. Empty ones are left out.
  const tags: { label: string; icon: ReactNode; value: ReactNode }[] = [
    { label: "Company", icon: <Building2 className={icon} />, value: details.company },
    { label: "Department", icon: <Users className={icon} />, value: details.department },
    { label: "Phone", icon: <Phone className={icon} />, value: details.phone && <a href={`tel:${details.phone}`} className={link}>{details.phone}</a> },
    { label: "Extension", icon: <Hash className={icon} />, value: details.ext && `Ext. ${details.ext}` },
    { label: "Mobile", icon: <Smartphone className={icon} />, value: details.mobile && <a href={`tel:${details.mobile}`} className={link}>{details.mobile}</a> },
    { label: "Email", icon: <Mail className={icon} />, value: details.email && <a href={`mailto:${details.email}`} className={link}>{details.email}</a> },
    {
      label: "Microsoft Teams",
      icon: <TeamsIcon className="size-[17px] shrink-0" />,
      value: details.email && (
        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${details.email}`} target="_blank" rel="noopener noreferrer" className={link}>
          MS Teams
        </a>
      ),
    },
    { label: "Time zone", icon: <Clock className={icon} />, value: details.timezone && ZONE_LABELS[details.timezone]?.replace(/^\(GMT[^)]*\)\s*/, "") },
  ];

  // One row of light tags; the contact details get their own row below company and department.
  const tagRow = (items: typeof tags) => (
    <ul className="mt-3 flex flex-wrap gap-x-[18px] gap-y-1.5 text-sm text-brand-navy/60 [&+ul]:mt-2">
      {items
        .filter(({ value }) => value)
        .map(({ label, icon, value }) => (
          <li key={label} title={label} className="inline-flex items-center gap-1.5">
            {icon}
            {value}
          </li>
        ))}
    </ul>
  );

  return (
    <section aria-label="Profile header" className="mb-5 rounded-xl border border-border bg-white shadow-[0_1px_2px_rgba(27,42,58,0.05),0_12px_32px_-18px_rgba(27,42,58,0.25)]">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-5 px-5 py-5 sm:px-8 sm:py-7">
        <Avatar
          name={person.name}
          src={person.photo}
          className="size-[92px] border-[5px] border-white bg-brand-navy text-3xl shadow-[0_0_0_1px_#e5e5e0,0_10px_24px_-10px_rgba(27,42,58,0.45)] sm:size-[112px]"
        />
        <div className="min-w-[240px] flex-1">
          <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xl font-extrabold leading-tight tracking-[-0.02em] sm:text-3xl">
            {person.name}
            {details.pronouns && <span className="text-sm font-medium tracking-normal text-brand-navy/60">{details.pronouns}</span>}
          </h1>
          <p className="mt-1 text-base">{person.title}</p>
          {tagRow(tags.slice(0, 2))}
          {tagRow(tags.slice(2))}
        </div>
        <div className="relative self-start max-sm:w-full">
          <button type="button" onClick={onEdit} className={action}>
            <Pencil className="size-[15px]" /> Edit profile
          </button>
          {/* TEMP: review note. Remove once the admin check exists. */}
          <TempNote title="Admins only" arrow="top" arrowOffset={200} className="absolute right-0 top-full z-20 mt-3 w-[280px]">
            <p>
              <strong>Edit profile</strong> will only be available to admins. Everyone else won&apos;t see this button.
            </p>
          </TempNote>
        </div>
      </div>
    </section>
  );
}
