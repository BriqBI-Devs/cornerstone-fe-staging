import { Link2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { Avatar } from "@/components/ui/Avatar";
import { SearchInput } from "@/components/ui/SearchInput";
import { cn } from "@/lib/cn";
import { ALERTS } from "../data";

const STATUS_STYLE = {
  Active: "bg-admin-tint text-admin-tint-ink",
  Scheduled: "bg-brand-link/10 text-brand-link",
  Expired: "bg-admin-danger/10 text-admin-danger",
};

const HEADERS = ["Message", "Author", "Created at", "Expires at", "Status", ""];

export function AlertList() {
  const [query, setQuery] = useState("");
  const alerts = ALERTS.filter((alert) => `${alert.message} ${alert.author}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Search alerts" className="w-full max-w-sm border border-admin-line bg-white" />
        <Button className="h-10 shrink-0 px-4">Create alert</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-admin-line text-admin-muted">
              {HEADERS.map((header, index) => (
                <th key={index} className="px-3 py-3 font-medium first:pl-0">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-line">
            {alerts.map((alert) => (
              <tr key={alert.message}>
                <td className="max-w-[260px] px-3 py-4 first:pl-0">
                  <p className="truncate font-medium">{alert.message}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-link">
                    <Link2 className="size-3.5 shrink-0" />
                    <span className="truncate">{alert.link}</span>
                  </p>
                </td>
                <td className="px-3 py-4">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <Avatar name={alert.author} size="sm" className="size-6 bg-gray-200 text-[10px] text-gray-600" />
                    {alert.author}
                  </span>
                </td>
                {[alert.createdAt, alert.expiresAt].map(([day, time], index) => (
                  <td key={index} className="whitespace-nowrap px-3 py-4">
                    {day}
                    <span className="block text-xs text-admin-muted">at {time}</span>
                  </td>
                ))}
                <td className="px-3 py-4">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", STATUS_STYLE[alert.status])}>{alert.status}</span>
                </td>
                <td className="py-4 pl-3 text-right">
                  <RowMenu label={alert.message} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {alerts.length === 0 && <p className="py-8 text-center text-sm text-admin-muted">No alerts match your search.</p>}
    </div>
  );
}
