import { ChevronRight, Folder, FolderPlus, Upload } from "lucide-react";
import { CreateDialog, type CreateGroup } from "@/admin/components/ui/CreateDialog";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { SearchInput } from "@/components/ui/SearchInput";
import { AUDIENCE_CATEGORIES } from "../data";

// Every row uses the same columns, so they line up under the header. Updated is hidden on phones.
const ROW = "grid grid-cols-[minmax(0,1fr)_64px_36px] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_80px_120px_36px]";

const CREATE_OPTIONS: CreateGroup[] = [
  {
    options: [
      { id: "audience", label: "Audience from CSV", hint: "Upload a CSV file of users to make a new audience.", icon: Upload },
      { id: "category", label: "Category", hint: "A folder to group related audiences.", icon: FolderPlus },
    ],
  },
];

/** Admin > Users + groups > Audiences: a static list of categories that fold into audiences. */
export function AudienceList() {
  return (
    <div>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-admin-muted">
        Create an audience by uploading a CSV file of the users you want. The users we can match are added to the audience, and you can then use it as a group for polls and
        alerts, for example a managers-only alert.
      </p>

      <div className="mb-4 flex items-center justify-between gap-3">
        <SearchInput value="" onChange={() => {}} placeholder="Search audiences" className="w-full max-w-sm border border-admin-line bg-white" />
        <CreateDialog label="Create" question="What would you like to create?" groups={CREATE_OPTIONS} />
      </div>

      <div className="rounded-xl border border-admin-line bg-white">
        <div className={`${ROW} border-b border-admin-line px-5 py-3 text-xs font-semibold text-admin-muted`}>
          <span>Audiences</span>
          <span>Users</span>
          <span className="hidden sm:block">Updated</span>
          <span />
        </div>

        {AUDIENCE_CATEGORIES.map((category) => (
          // <details> folds and unfolds on its own.
          <details key={category.name} open className="group border-b border-admin-line last:border-b-0">
            <summary className={`${ROW} cursor-pointer list-none px-5 py-3.5 [&::-webkit-details-marker]:hidden`}>
              <span className="flex items-center gap-3">
                <ChevronRight className="size-4 shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" />
                <Folder className="size-[18px] shrink-0 text-admin-muted" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{category.name}</span>
                  <span className="block truncate text-xs text-admin-muted">{category.description}</span>
                </span>
              </span>
              <span />
              <span className="hidden sm:block" />
              {/* Clicking the menu must not fold the category. */}
              <div onClick={(event) => event.preventDefault()}>
                <RowMenu label={category.name} items={[{ label: "Add audience" }, { label: "Rename category" }, { label: "Delete category", danger: true }]} />
              </div>
            </summary>

            {category.audiences.map((audience) => (
              <div key={audience.name} className={`${ROW} border-t border-admin-line py-3 pl-[4.5rem] pr-5 hover:bg-admin-soft`}>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{audience.name}</p>
                  <p className="truncate text-xs text-admin-muted">{audience.description}</p>
                </div>
                <span className="text-sm tabular-nums">{audience.users}</span>
                <span className="hidden text-sm text-admin-muted sm:block">{audience.updated}</span>
                <RowMenu label={audience.name} items={[{ label: "Edit audience" }, { label: "Delete audience", danger: true }]} />
              </div>
            ))}
          </details>
        ))}
      </div>
    </div>
  );
}
