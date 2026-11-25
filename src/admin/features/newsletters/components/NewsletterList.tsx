import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { SearchInput } from "@/components/ui/SearchInput";
import { cn } from "@/lib/cn";
import { NEWSLETTERS, NEWSLETTER_STATUSES, type NewsletterStatus } from "../data";

const STATUS_STYLE: Record<NewsletterStatus, string> = {
  Draft: "bg-admin-soft text-admin-muted",
  Scheduled: "bg-brand-link/10 text-brand-link",
  Sent: "bg-admin-tint text-admin-tint-ink",
  "Failed to send": "bg-admin-danger/10 text-admin-danger",
};

const HEADERS = ["Name", "Status", "Target audience", "From address", "Date modified", ""];

export function NewsletterList() {
  const [status, setStatus] = useState<NewsletterStatus | "All">("All");
  const [query, setQuery] = useState("");

  const newsletters = NEWSLETTERS.filter(
    (n) => (status === "All" || n.status === status) && `${n.name} ${n.author}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Newsletter status" className="flex max-w-full gap-0.5 overflow-x-auto rounded-[10px] bg-admin-soft p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(["All", ...NEWSLETTER_STATUSES] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={status === tab}
              onClick={() => setStatus(tab)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors",
                status === tab ? "bg-white text-brand-navy shadow-[0_1px_2px_rgba(27,42,58,0.12)]" : "text-admin-muted hover:text-brand-navy",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <SearchInput value={query} onChange={setQuery} placeholder="Search newsletters" className="ml-auto w-full max-w-xs border border-admin-line bg-white sm:w-64" />
        <Button className="h-10 shrink-0 px-4">Create newsletter</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-admin-line text-admin-muted">
              {HEADERS.map((header, index) => (
                <th key={index} className="px-3 py-3 font-medium first:pl-0">
                  {header === "Name" ? `Name (${newsletters.length})` : header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-line">
            {newsletters.map((n) => (
              <tr key={n.name}>
                <td className="px-3 py-4 first:pl-0">
                  <p className="font-medium">{n.name}</p>
                  <p className="mt-0.5 text-xs text-admin-muted">{n.author}</p>
                </td>
                <td className="px-3 py-4">
                  <span className={cn("whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold", STATUS_STYLE[n.status])}>{n.status}</span>
                </td>
                <td className="px-3 py-4">{n.audience}</td>
                <td className="px-3 py-4">{n.from}</td>
                <td className="whitespace-nowrap px-3 py-4">{n.modified}</td>
                <td className="py-4 pl-3 text-right">
                  <RowMenu label={n.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {newsletters.length === 0 && <p className="py-8 text-center text-sm text-admin-muted">No newsletters match.</p>}
    </div>
  );
}
