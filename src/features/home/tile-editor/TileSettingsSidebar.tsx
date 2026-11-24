import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import type { TileContent, TileLink } from "./TileGrid";

const input =
  "w-full rounded-md border border-border px-3 py-2 text-sm text-brand-navy outline-none focus:border-brand-link focus:ring-2 focus:ring-brand-link/20";

/** Edits a tile's title and links. Nothing changes until Save; closing discards the edits. */
export function TileSettingsSidebar({
  content,
  onSave,
  onClose,
}: {
  content: TileContent;
  onSave: (content: TileContent) => void;
  onClose: () => void;
}) {
  const [{ title, links }, setDraft] = useState(content);
  const setLinks = (next: TileLink[]) => setDraft({ title, links: next });
  const setLink = (i: number, patch: Partial<TileLink>) =>
    setLinks(links.map((link, j) => (j === i ? { ...link, ...patch } : link)));

  return (
    <>
      <div className="fixed inset-0 z-40 bg-brand-navy/30" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 z-50 flex w-96 max-w-[90vw] flex-col border-l border-border bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-brand-navy">Edit card</p>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-md p-1 text-brand-navy/40 hover:text-brand-navy">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <label className="block text-xs font-medium text-brand-navy/70">
            Title
            <input value={title} onChange={(e) => setDraft({ title: e.target.value, links })} className={`mt-2 ${input}`} />
          </label>

          <div>
            <p className="text-xs font-medium text-brand-navy/70">Links</p>
            <ul className="mt-2 space-y-3">
              {links.map((link, i) => (
                <li key={i} className="flex items-start gap-2 rounded-md border border-border p-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <input aria-label="Label" placeholder="Label" value={link.label} onChange={(e) => setLink(i, { label: e.target.value })} className={input} />
                    <input aria-label="URL" placeholder="URL" value={link.href} onChange={(e) => setLink(i, { href: e.target.value })} className={input} />
                  </div>
                  <button
                    type="button"
                    aria-label="Remove link"
                    onClick={() => setLinks(links.filter((_, j) => j !== i))}
                    className="p-1.5 text-brand-navy/40 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setLinks([...links, { label: "", href: "#" }])}
              className="mt-3 flex items-center gap-1.5 text-sm font-medium text-brand-link hover:underline"
            >
              <Plus className="h-4 w-4" />
              Add link
            </button>
          </div>
        </div>

        <div className="border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={() => onSave({ title, links: links.filter((link) => link.label.trim()) })}
            className="w-full rounded-md bg-brand-navy px-3 py-2 text-sm font-medium text-white hover:bg-brand-navy/90"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
