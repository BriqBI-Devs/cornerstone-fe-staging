import { ChevronDown, ChevronRight, Folder, FolderPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { SearchInput } from "@/components/ui/SearchInput";
import { AUDIENCE_CATEGORIES } from "../data";

// Every row uses the same columns, so they line up under the header. Updated is hidden on phones.
const ROW = "grid grid-cols-[minmax(0,1fr)_64px_36px] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_80px_120px_36px]";

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
        {/* The menu stays open while the button or an item has focus, so it needs no state. */}
        <div className="group relative shrink-0">
          <Button className="inline-flex h-10 items-center gap-2 px-4">
            Create
            <ChevronDown className="size-4" aria-hidden="true" />
          </Button>
          <div className="absolute right-0 top-full z-10 hidden w-64 pt-1 group-focus-within:block">
            <div className="rounded-lg border border-admin-line bg-white py-1 text-sm shadow-lg">
              <button type="button" className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-admin-hover">
                <Upload className="size-4 text-admin-muted" aria-hidden="true" />
                Create audience using CSV
              </button>
              <button type="button" className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-admin-hover">
                <FolderPlus className="size-4 text-admin-muted" aria-hidden="true" />
                Create category
              </button>
            </div>
          </div>
        </div>
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
