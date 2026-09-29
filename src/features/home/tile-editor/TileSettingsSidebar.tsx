import { X } from "lucide-react";
import { TILE_META, type TileContent, type TileId } from "./adjustableTiles";

interface TileSettingsSidebarProps {
  tileId: TileId;
  content: TileContent;
  onChange: (patch: Partial<TileContent>) => void;
  onClose: () => void;
}

export function TileSettingsSidebar({ tileId, content, onChange, onClose }: TileSettingsSidebarProps) {
  const { type, icon: Icon } = TILE_META[tileId];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-brand-navy/30" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-border bg-surface shadow-card">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-link/10 text-brand-link">
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-navy/50">
              Editing tile
            </p>
            <p className="truncate text-sm font-semibold text-brand-navy">{type}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-brand-navy/40 hover:bg-surface-subtle hover:text-brand-navy"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <label htmlFor="tile-title" className="block text-xs font-medium text-brand-navy/70">
            Title
          </label>
          <p className="mt-0.5 text-xs text-brand-navy/45">Shown as the heading on the tile.</p>
          <input
            id="tile-title"
            type="text"
            value={content.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm text-brand-navy outline-none focus:border-brand-link focus:ring-2 focus:ring-brand-link/20"
          />
        </div>

        <div className="border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md bg-brand-navy px-3 py-2 text-sm font-medium text-white hover:bg-brand-navy/90"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
