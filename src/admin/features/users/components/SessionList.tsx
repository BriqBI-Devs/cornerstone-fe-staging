import { Avatar } from "@/components/ui/Avatar";
import { SearchInput } from "@/components/ui/SearchInput";
import { getPersonById } from "@/features/people/data";
import { SESSIONS } from "../data";

const HEADERS = ["User", "IP address", "Device", "Location", "Signed in"];

/** Admin > Users > Sessions: a static, read-only list of recent sign-ins. */
export function SessionList() {
  return (
    <div>
      <div className="mb-5 flex items-center">
        <SearchInput value="" onChange={() => {}} placeholder="Search by name" className="w-full border border-admin-line bg-white sm:w-72" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-admin-line text-admin-muted">
              {HEADERS.map((header) => (
                <th key={header} className="px-3 py-3 font-medium first:pl-0">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-line">
            {SESSIONS.map((session) => (
              <tr key={`${session.userId}-${session.signedIn}`}>
                <td className="px-3 py-4 first:pl-0">
                  <span className="flex items-center gap-3 whitespace-nowrap font-medium">
                    <Avatar name={session.user} src={getPersonById(session.userId)?.photo} size="sm" />
                    {session.user}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4">{session.ip}</td>
                <td className="whitespace-nowrap px-3 py-4">{session.device}</td>
                <td className="whitespace-nowrap px-3 py-4">{session.location}</td>
                <td className="whitespace-nowrap px-3 py-4">{session.signedIn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
