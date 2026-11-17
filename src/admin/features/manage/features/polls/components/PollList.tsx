import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { SearchInput } from "@/components/ui/SearchInput";
import { cn } from "@/lib/cn";
import { POLLS, STATUSES } from "../data";

const STATUS_STYLE = {
  Active: "bg-admin-tint text-admin-tint-ink",
  Draft: "bg-admin-soft text-admin-muted",
  Expired: "bg-admin-soft text-admin-danger",
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

      <div className="grid gap-4 sm:grid-cols-2">
        {polls.map((poll) => (
          <article key={poll.question} className="flex flex-col rounded-xl border border-admin-line bg-white p-5">
            <div className="flex items-center justify-between">
              <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide", STATUS_STYLE[poll.status])}>{poll.status}</span>
              <RowMenu label={poll.question} />
            </div>
            <h3 className="mt-3 text-base font-bold leading-snug">{poll.question}</h3>

            <ul className="mt-4 grid gap-3">
              {poll.options.map(([label, percent]) => (
                <li key={label}>
                  <div className="flex justify-between text-xs">
                    <span>{label}</span>
                    <span className="font-semibold">{percent}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-admin-soft">
                    <div className="h-full rounded-full bg-brand-accent" style={{ width: `${percent}%` }} />
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-auto border-t border-admin-line pt-3 text-xs text-admin-muted [&:not(:first-child)]:mt-5">
              <span className="font-semibold text-brand-navy">{poll.votes} votes</span> · {poll.when}
            </p>
          </article>
        ))}
      </div>
      {polls.length === 0 && <p className="py-8 text-center text-sm text-admin-muted">No polls match.</p>}
    </div>
  );
}
