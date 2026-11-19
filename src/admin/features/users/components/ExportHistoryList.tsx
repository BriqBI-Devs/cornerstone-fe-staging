import { Download } from "lucide-react";
import { cn } from "@/lib/cn";
import { EXPORTS, EXPORT_STYLE } from "../data";

const HEADERS = ["File", "Requested by", "Date", "Status", ""];

/** Admin > Users > Export history: a static, read-only list of past user exports. */
export function ExportHistoryList() {
  return (
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
          {EXPORTS.map((item) => (
            <tr key={item.file}>
              <td className="whitespace-nowrap px-3 py-4 font-medium first:pl-0">{item.file}</td>
              <td className="whitespace-nowrap px-3 py-4">{item.by}</td>
              <td className="whitespace-nowrap px-3 py-4">{item.date}</td>
              <td className="px-3 py-4">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", EXPORT_STYLE[item.status])}>{item.status}</span>
              </td>
              <td className="py-4 pl-3 text-right">
                <button
                  type="button"
                  aria-label={`Download ${item.file}`}
                  className="inline-grid size-8 place-items-center rounded-md text-admin-muted hover:bg-admin-hover hover:text-brand-navy"
                >
                  <Download className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
