import { Link } from "react-router-dom";
import { Avatar } from "../../../../components/ui/Avatar";
import { cn } from "../../../../lib/cn";
import { getReports } from "../../data";
import type { Person } from "../../types";

/** idle: another person in the row; open: on the path to the focused person; focused: the selected person. */
export type CardState = "idle" | "open" | "focused";

/** One person in the chart. The whole card selects them; "View profile" opens their profile. */
export function OrgCard({ person, state, onPick }: { person: Person; state: CardState; onPick: () => void }) {
  const reports = getReports(person.id).length;
  const label = `${person.name}, ${person.title}, ${person.team}${reports ? `, ${reports} direct report${reports > 1 ? "s" : ""}` : ""}`;

  return (
    <div role="listitem" data-state={state} className="flex w-[221px] flex-none flex-col items-center">
      <div
        className={cn(
          "relative flex h-[268px] w-[221px] flex-col items-center rounded-xl border-[1.25px] px-3 py-5 text-center",
          state === "idle" && "border-transparent bg-[#fafafa] shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
          state === "open" && "border-[#d4d4d4] bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12)]",
          state === "focused" && "border-[#0079db] bg-white shadow-[0_0_0_1px_#0079db,0_8px_20px_-8px_rgba(0,121,219,0.35)]",
        )}
      >
        <Avatar name={person.name} src={person.photo} className="size-[88px] animate-[org-fade_0.3s_ease_both] border border-[#e5e5e5] bg-[#f0f0f0] text-3xl text-[#737373]" />
        <div className="mt-3 w-full truncate text-base font-bold text-[#0a0a0a]" title={person.name}>{person.name}</div>
        <div className="w-full truncate text-xs text-[#737373]" title={person.title}>{person.title}</div>
        <div className="w-full truncate text-xs text-[#737373]" title={person.team}>{person.team}</div>
        {state !== "idle" && (
          <Link
            to={`/people/${person.id}`}
            className="relative z-[2] mt-auto grid h-8 w-[100px] place-items-center rounded-full border-[1.25px] border-[#737373] bg-white text-sm font-bold hover:border-[#0a0a0a]"
          >
            View profile
          </Link>
        )}
        <button
          type="button"
          onClick={onPick}
          aria-label={label}
          aria-current={state === "focused" ? "true" : undefined}
          className="absolute inset-0 rounded-xl focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0079db]"
        />
      </div>
      {reports > 0 && (
        <>
          <span className="h-3 w-px bg-[#d4d4d4]" />
          <button type="button" onClick={onPick} tabIndex={-1} className="h-6 min-w-[33px] rounded-md bg-[#f5f5f5] px-2 text-xs">
            {state === "idle" ? reports : `${reports} direct report${reports > 1 ? "s" : ""}`}
          </button>
        </>
      )}
    </div>
  );
}
