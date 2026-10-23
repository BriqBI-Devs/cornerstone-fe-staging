import { EllipsisVertical, ExternalLink, Folder, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFavorites, type FavItem } from "../../lib/useFavorites";
import type { ResourceItem } from "./data";

const FILE_BADGE_CLASSES: Record<Exclude<ResourceItem["kind"], "link" | "folder">, string> = {
  pdf: "bg-brand-navy",
  xls: "bg-[#92670a]",
  doc: "bg-brand-link",
  zip: "bg-gray-600",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function FilePreview({ item, onClose }: { item: ResourceItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => dialogRef.current?.showModal(), []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
      className="m-auto w-[min(1100px,94vw)] rounded-card border border-border bg-surface p-0 backdrop:bg-brand-navy/50"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
        <h3 className="truncate text-[15px] font-bold text-brand-navy">{item.title}</h3>
        <button type="button" aria-label="Close preview" onClick={() => dialogRef.current?.close()} className="rounded-md p-1 text-brand-navy/60 hover:bg-brand-link/[0.08] hover:text-brand-link">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex h-[min(75vh,720px)] items-center justify-center bg-surface-subtle text-sm text-brand-navy/60">
        Example file preview
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-3 text-[13px] text-brand-navy/75">
        <span>{[item.owner, item.created && formatDate(item.created), item.size].filter(Boolean).join(" · ")}</span>
        <a href={item.href} download className="font-semibold text-brand-link hover:underline">
          Download
        </a>
      </div>
    </dialog>
  );
}

export function ResourceRow({ item, onOpen }: { item: ResourceItem; onOpen?: () => void }) {
  const isLink = item.kind === "link";
  const isFolder = item.kind === "folder";
  const isFile = !isLink && !isFolder;
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const { has, toggle } = useFavorites();
  // Links to the section until files have real URLs.
  const fav: FavItem = { id: `file-${item.title}`, tab: "files", title: item.title, to: "/policies-resources", meta: [item.kind.toUpperCase(), item.size, item.created && `Updated ${formatDate(item.created)}`].filter(Boolean).join(" · ") };

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      const outside = event instanceof KeyboardEvent ? event.key === "Escape" : !menuRef.current?.contains(event.target as Node);
      if (outside) menuRef.current?.removeAttribute("open");
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menuOpen]);
  const menuItemClass = "block w-full px-4 py-2 text-left text-[13px] font-medium hover:bg-brand-link/[0.08]";
  const closeMenu = (event: { currentTarget: HTMLElement }) => event.currentTarget.closest("details")?.removeAttribute("open");

  return (
    <div
      onClick={onOpen}
      className={`flex items-center gap-[18px] border-b border-border py-4 last:border-b-0 ${onOpen ? "cursor-pointer" : ""}`}
    >
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
          <a
            href={item.href}
            target={isLink ? "_blank" : undefined}
            rel={isLink ? "noopener noreferrer" : undefined}
            onClick={(event) => {
              if (onOpen) {
                event.preventDefault();
                onOpen();
              } else if (!isLink) {
                event.preventDefault();
                setPreviewOpen(true);
              }
            }}
            className="hover:underline"
          >
            {item.title}
          </a>
        </h2>
        {item.created && (
          <p className="text-xs text-brand-navy/75 md:hidden">
            {isFile ? "Uploaded" : "Created"} {formatDate(item.created)}
          </p>
        )}
      </div>

      {item.owner && (
        <span className="hidden w-[140px] shrink-0 items-center justify-end gap-1.5 text-[13px] font-medium text-brand-link md:flex">
          <User aria-hidden className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{item.owner}</span>
        </span>
      )}

      <span className="hidden w-[112px] shrink-0 text-right text-[13px] text-brand-navy/80 md:block">
        {item.created && formatDate(item.created)}
      </span>

      <span className="min-w-[56px] shrink-0 text-right text-[12.5px] font-medium text-brand-navy/75">{item.size}</span>

      <details
        ref={menuRef}
        onToggle={(event) => setMenuOpen(event.currentTarget.open)}
        onMouseEnter={(event) => (event.currentTarget.open = true)}
        onMouseLeave={(event) => (event.currentTarget.open = false)}
        onClick={(event) => event.stopPropagation()}
        className="relative shrink-0"
      >
        <summary
          aria-label={`Actions for ${item.title}`}
          onClick={(event) => {
            event.preventDefault();
            menuRef.current?.setAttribute("open", "");
          }}
          className="flex h-[34px] w-[34px] cursor-pointer list-none items-center justify-center rounded-md border border-border bg-surface text-brand-navy/70 transition-colors hover:border-brand-link hover:bg-brand-link/[0.08] hover:text-brand-link [&::-webkit-details-marker]:hidden"
        >
          <EllipsisVertical className="h-4 w-4" />
        </summary>
        <div className="absolute right-0 top-full z-10 w-40 rounded-md border border-border bg-surface py-1 shadow-lg">
          {isFile ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  closeMenu(event);
                  setPreviewOpen(true);
                }}
                className={menuItemClass}
              >
                Preview
              </button>
              <a href={item.href} download onClick={closeMenu} className={menuItemClass}>
                Download
              </a>
            </>
          ) : (
            <a
              href={item.href}
              target={isLink ? "_blank" : undefined}
              rel={isLink ? "noopener noreferrer" : undefined}
              onClick={(event) => {
                closeMenu(event);
                if (onOpen) {
                  event.preventDefault();
                  onOpen();
                }
              }}
              className={menuItemClass}
            >
              Open
            </a>
          )}
          {isFile && (
            <button type="button" onClick={(event) => { toggle(fav); closeMenu(event); }} className={menuItemClass}>
              {has(fav.id) ? "Unfavourite" : "Favourite"}
            </button>
          )}
        </div>
      </details>

      {previewOpen && <FilePreview item={item} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}
