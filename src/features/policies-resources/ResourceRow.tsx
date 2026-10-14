import { ChevronRight, Download, ExternalLink, Folder } from "lucide-react";
import type { ResourceItem } from "./data";

const FILE_BADGE_CLASSES: Record<Exclude<ResourceItem["kind"], "link" | "folder">, string> = {
  pdf: "bg-brand-navy",
  xls: "bg-[#92670a]",
  doc: "bg-brand-link",
  zip: "bg-gray-600",
};

export function ResourceRow({ item, onOpen }: { item: ResourceItem; onOpen?: () => void }) {
  const isLink = item.kind === "link";
  const isFolder = item.kind === "folder";

  return (
    <div className="flex items-center gap-[18px] border-b border-border py-4 last:border-b-0">
      {item.kind === "link" || item.kind === "folder" ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-link/[0.08] text-brand-link">
          {isFolder ? <Folder className="h-[15px] w-[15px]" /> : <ExternalLink className="h-[15px] w-[15px]" />}
        </span>
      ) : (
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[8.5px] font-extrabold tracking-[0.02em] text-white ${FILE_BADGE_CLASSES[item.kind]}`}
        >
          {item.kind.toUpperCase()}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <h2 className="mb-[3px] truncate text-[14.5px] font-semibold leading-[1.4] text-brand-link">
          {item.title}
        </h2>
        {item.updated && <p className="text-xs text-brand-navy/45">{item.updated}</p>}
      </div>

      {item.size && (
        <span className="min-w-[56px] shrink-0 text-right text-[12.5px] font-medium text-brand-navy/45">
          {item.size}
        </span>
      )}

      <a
        href={item.href}
        onClick={
          onOpen &&
          ((event) => {
            event.preventDefault();
            onOpen();
          })
        }
        aria-label={isLink || isFolder ? `Open ${item.title}` : `Download ${item.title}`}
        className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md border border-border bg-surface text-brand-link transition-colors hover:border-brand-link hover:bg-brand-link/[0.08]"
      >
        {isFolder ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : isLink ? (
          <ExternalLink className="h-3.5 w-3.5" />
        ) : (
          <Download className="h-3.5 w-3.5" />
        )}
      </a>
    </div>
  );
}
