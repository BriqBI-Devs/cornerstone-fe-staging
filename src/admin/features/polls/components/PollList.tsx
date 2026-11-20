import { CalendarClock, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { SearchInput } from "@/components/ui/SearchInput";
import { cn } from "@/lib/cn";
import { POLLS, STATUSES } from "../data";

// Each status has a soft badge and a matching dot.
const STATUS_STYLE = {
  Active: { badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  Draft: { badge: "bg-admin-hover text-admin-muted", dot: "bg-admin-faint" },
  Expired: { badge: "bg-red-50 text-admin-danger", dot: "bg-admin-danger" },
};

export function PollList() {
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const polls = POLLS.filter((poll) => (!status || poll.status === status) && poll.question.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search polls" className="mr-auto w-full max-w-sm border border-admin-line bg-white" />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter by status"
          className="h-10 rounded-lg border border-admin-line bg-white px-3 text-sm outline-none focus:border-brand-link"
        >
          <option value="">All polls</option>
          {STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Button className="h-10 shrink-0 px-4">Create poll</Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {polls.map((poll) => {
          const style = STATUS_STYLE[poll.status];
          const highest = Math.max(...poll.options.map(([, percent]) => percent));
          return (
            <article
              key={poll.question}
              className="flex flex-col rounded-xl border border-admin-line bg-white p-6 transition-[box-shadow,border-color] hover:border-[#d3d8e4] hover:shadow-[0_12px_28px_-18px_rgba(23,35,59,0.35)]"
            >
              <div className="flex items-center justify-between">
                <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide", style.badge)}>
                  <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden="true" />
                  {poll.status}
                </span>
                <RowMenu label={poll.question} />
              </div>

              <h3 className="mt-4 line-clamp-2 min-h-[2.9rem] text-[17px] font-bold leading-snug tracking-[-0.01em]">{poll.question}</h3>

              <ul className="mt-5 grid gap-4">
                {poll.options.map(([label, percent]) => {
                  // The option ahead of the others is the one that stands out; a poll with no votes has none.
                  const leading = poll.votes > 0 && percent === highest;
                  return (
                    <li key={label}>
                      <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className={leading ? "font-semibold text-brand-navy" : "text-admin-muted"}>{label}</span>
                        <span className={cn("tabular-nums", leading ? "font-bold text-brand-navy" : "font-semibold text-admin-muted")}>{percent}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-admin-hover">
                        <div className={cn("h-full rounded-full", leading ? "bg-brand-accent" : "bg-[#c9d0de]")} style={{ width: `${percent}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between gap-3 border-t border-admin-line pt-4 text-xs text-admin-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-brand-navy">{poll.votes}</span> votes
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="size-3.5" aria-hidden="true" />
                    {poll.when}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {polls.length === 0 && <p className="py-8 text-center text-sm text-admin-muted">No polls match.</p>}
    </div>
  );
}
