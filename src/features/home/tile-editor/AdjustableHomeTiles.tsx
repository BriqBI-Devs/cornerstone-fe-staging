import type { ReactNode } from "react";
import { useState } from "react";
import { Settings } from "lucide-react";
import { Responsive, WidthProvider, type Layout } from "react-grid-layout/legacy";
import "react-grid-layout/css/styles.css";
import { Button } from "../../../components/ui/Button";
import { cn } from "../../../lib/cn";
import { useLocalStorage } from "../../../lib/useLocalStorage";
import { FeedbackAndIdeas } from "../FeedbackAndIdeas";
import { LinkedInFeed } from "../LinkedInFeed";
import { PulsePoll } from "../SocialRow";
import { DEFAULT_STATE, HOME_TILES_STORAGE_KEY, type TileContent, type TileId } from "./adjustableTiles";
import { TileSettingsSidebar } from "./TileSettingsSidebar";

const ResponsiveGridLayout = WidthProvider(Responsive);

const TILE_ORDER: TileId[] = ["poll", "feedback", "linkedin"];

// Mobile always stacks full-width in a fixed order — only the desktop (lg) layout is user-editable.
const MOBILE_LAYOUT: Layout = [
  { i: "poll", x: 0, y: 0, w: 1, h: 1, minW: 1 },
  { i: "feedback", x: 0, y: 1, w: 1, h: 1, minW: 1 },
  { i: "linkedin", x: 0, y: 2, w: 1, h: 1, minW: 1 },
];

export function AdjustableHomeTiles() {
  const [state, setState] = useLocalStorage(HOME_TILES_STORAGE_KEY, DEFAULT_STATE);
  const [editMode, setEditMode] = useState(false);
  const [openSettingsFor, setOpenSettingsFor] = useState<TileId | null>(null);

  function updateTile(id: TileId, patch: Partial<TileContent>) {
    setState((s) => ({
      ...s,
      content: { ...s.content, [id]: { ...s.content[id], ...patch } },
    }));
  }

  const TILE_RENDER: Record<TileId, () => ReactNode> = {
    poll: () => <PulsePoll title={state.content.poll.title} />,
    feedback: () => <FeedbackAndIdeas title={state.content.feedback.title} />,
    linkedin: () => <LinkedInFeed title={state.content.linkedin.title} />,
  };

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => setEditMode((v) => !v)}
        className="fixed bottom-6 right-6 z-50 shadow-card"
      >
        {editMode ? "Done editing" : "Edit layout"}
      </Button>

      {/* Only the right-edge handle is enabled (width-only resize) — a corner/height
          handle would let tiles in the same row drift to different heights, which
          leaves an unfillable gap under the shorter one (the row below can't rise
          past the taller neighbor). Locking height keeps every row's vertical
          compaction gap-free. The default handle is also invisible until hover and
          just a 5px mark even then, so replace it with a visible brand-colored grip. */}
      {editMode && (
        <style>{`
          .home-tiles-grid > .react-grid-item > .react-resizable-handle.react-resizable-handle-e {
            right: -3px;
            width: 14px;
            height: 48px;
            transform: none;
            opacity: 1;
          }
          .home-tiles-grid > .react-grid-item > .react-resizable-handle.react-resizable-handle-e::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 28px;
            border: none;
            border-radius: 2px;
            background: var(--color-brand-link);
            transform: translate(-50%, -50%);
          }
        `}</style>
      )}

      <ResponsiveGridLayout
        className="layout home-tiles-grid"
        layouts={{ lg: state.layout, sm: MOBILE_LAYOUT }}
        breakpoints={{ lg: 768, sm: 0 }}
        cols={{ lg: 6, sm: 1 }}
        rowHeight={360}
        margin={[24, 24]}
        isDraggable={editMode}
        isResizable={editMode}
        resizeHandles={["e"]}
        draggableCancel=".rgl-no-drag"
        onLayoutChange={(_layout, layouts) => {
          if (layouts.lg) setState((s) => ({ ...s, layout: layouts.lg as Layout }));
        }}
      >
        {TILE_ORDER.map((id) => (
          <div
            key={id}
            className={cn("relative", editMode && "rounded-card ring-2 ring-dashed ring-brand-link/40")}
          >
            {TILE_RENDER[id]()}

            {editMode && (
              <button
                type="button"
                aria-label="Edit tile"
                onClick={() => setOpenSettingsFor(id)}
                className="rgl-no-drag absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-brand-navy shadow-card hover:bg-surface-subtle"
              >
                <Settings className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </ResponsiveGridLayout>

      {openSettingsFor && (
        <TileSettingsSidebar
          tileId={openSettingsFor}
          content={state.content[openSettingsFor]}
          onChange={(patch) => updateTile(openSettingsFor, patch)}
          onClose={() => setOpenSettingsFor(null)}
        />
      )}
    </div>
  );
}
