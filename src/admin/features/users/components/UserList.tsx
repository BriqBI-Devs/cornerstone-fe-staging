import { Download, Upload } from "lucide-react";
import { useState } from "react";
import { getPersonById } from "@/features/people/data";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { cn } from "@/lib/cn";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { FIRST_LOGIN_STYLE, STATUS_STYLE, USERS } from "../data";
import { EditPhotoDialog } from "./EditPhotoDialog";

const HEADERS = ["Name", "Role", "Status", "First login", "Created", "Modified", ""];

const FILTERS = [
  { label: "Role", options: ["All", "Admin", "User"] },
  { label: "Status", options: ["All", "Active", "Inactive"] },
  { label: "First login", options: ["All", "Pending", "Completed"] },
];

const selectClass = "h-10 w-44 rounded-lg border border-admin-line bg-white px-3 text-sm font-normal text-brand-navy outline-none focus:border-brand-link";

/** Admin > Users: a static, read-only list. */
export function UserList() {
  const [photoId, setPhotoId] = useState<number | null>(null);
  const photoPerson = getPersonById(photoId ?? undefined);

  return (
    <div>
      {/* Row 1: search on the left, the two actions on the right. Row 2: the filters, each with a label. */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <SearchInput value="" onChange={() => {}} placeholder="Search by name" className="w-full border border-admin-line bg-white sm:w-80" />
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="secondary" className="inline-flex h-10 items-center gap-2 px-4">
            <Upload className="size-4" aria-hidden="true" />
            Bulk profile edit
          </Button>
          <Button className="inline-flex h-10 items-center gap-2 px-4">
            <Download className="size-4" aria-hidden="true" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-x-4 gap-y-3 border-b border-admin-line pb-5">
        {FILTERS.map(({ label, options }) => (
          <label key={label} className="grid gap-1.5 text-xs font-medium text-admin-muted">
            {label}
            <select className={selectClass}>
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
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
            {USERS.map((user) => (
              <tr key={user.id}>
                <td className="px-3 py-4 first:pl-0">
                  <span className="flex items-center gap-3 whitespace-nowrap font-medium">
                    <Avatar name={user.name} src={getPersonById(user.id)?.photo} size="sm" />
                    {user.name}
                  </span>
                </td>
                <td className="px-3 py-4">{user.role}</td>
                <td className="px-3 py-4">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", STATUS_STYLE[user.status])}>{user.status}</span>
                </td>
                <td className="px-3 py-4">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", FIRST_LOGIN_STYLE[user.firstLogin])}>{user.firstLogin}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4">{user.created}</td>
                <td className="whitespace-nowrap px-3 py-4">{user.modified}</td>
                <td className="py-4 pl-3 text-right">
                  <RowMenu
                    label={user.name}
                    items={[
                      { label: "View profile", to: `/people/${user.id}` },
                      { label: "Edit photo", onClick: () => setPhotoId(user.id) },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditPhotoDialog open={!!photoPerson} name={photoPerson?.name ?? ""} photo={photoPerson?.photo} onClose={() => setPhotoId(null)} />
    </div>
  );
}
