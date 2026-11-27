import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Responsive, WidthProvider, type Layout } from "react-grid-layout/legacy";
import "react-grid-layout/css/styles.css";
import "./tile-grid.css";
import { cn } from "../../../lib/cn";
import { NEW_CARD } from "./StaticCards";
import { TileSettingsSidebar } from "./TileSettingsSidebar";

const Grid = WidthProvider(Responsive);
const CUSTOM = "custom-"; // ids of cards added in edit mode

export type TileLink = { label: string; href: string };
export type TileContent = { title: string; links: TileLink[] };

/** One tile. With `content` it can be edited in the sidebar; `resizable: false` keeps its size. */
export type TileDef = {
  layout: { x: number; y: number; w: number };
  content?: TileContent;
  resizable?: boolean;
  render: (content: TileContent) => ReactNode;
};

export type TileSet = Record<string, TileDef>;

/** Everything the editor saves: where each card sits, and the edited title and links of each card. */
export type TileGridData = { layout: Layout; content: Record<string, TileContent> };

const cardButton =
  "flex h-8 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-semibold text-brand-navy shadow-card hover:bg-surface-subtle";

/** Fills its grid cell and reports its content's own height (px), so the cell never gets shorter. */
function Tile({ id, contentKey, onHeight, className, children }: {
  id: string;
  contentKey: string;
  onHeight: (id: string, height: number) => void;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current!;
    const measure = () => {
      el.style.height = "auto"; // briefly let the content size itself
      onHeight(id, el.offsetHeight);
      el.style.height = "";
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, onHeight, contentKey]);

  return (
    <div ref={ref} className={cn("h-full [&>*]:h-full", className)}>
      {children}
    </div>
  );
}

/** Cards users can drag, resize, edit and add to in edit mode; `onSave` gets the data when they press Save. */
export function TileGrid({ tiles, initial, onSave }: { tiles: TileSet; initial: TileGridData; onSave: (data: TileGridData) => void }) {
  // The admin "Home layout" page links here with ?editLayout=1 to open straight into editing.
  const [searchParams] = useSearchParams();
  const [editMode, setEditMode] = useState(searchParams.get("editLayout") === "1");
  // Edits stay in `draft` until Save, so nothing is stored automatically.
  const [draft, setDraft] = useState(initial);
  const data = editMode ? draft : initial;
  const [settingsFor, setSettingsFor] = useState<string | null>(null);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const onHeight = useCallback((id: string, px: number) => setHeights((h) => (h[id] === px ? h : { ...h, [id]: px })), []);

  const ids = [...Object.keys(tiles), ...data.layout.map((item) => item.i).filter((id) => id.startsWith(CUSTOM))];
  const tileOf = (id: string) => tiles[id] ?? NEW_CARD;
  const contentOf = (id: string) => ({ ...tileOf(id).content, ...data.content[id] }) as TileContent;

  // Only the user dragging or resizing on a desktop-width screen moves cards, never a window resize.
  const saveLayout = (layout: Layout) => matchMedia("(min-width: 768px)").matches && setDraft((d) => ({ ...d, layout }));

  // One grid row is 24px plus a 24px gap, so n rows = 48n - 24px.
  const items = ids.map((id) => {
    const item = data.layout.find((l) => l.i === id) ?? { i: id, ...tiles[id].layout, h: 1 };
    const minH = heights[id] === undefined ? 1 : Math.ceil((heights[id] + 24) / 48);
    return { ...item, minW: 2, minH, h: Math.max(item.h, minH), isResizable: editMode && tileOf(id).resizable !== false };
  });

  return (
    <>
      {editMode ? (
        <aside
          title="Drag cards to move them and pull their edges to resize. Changes are kept only when you save."
          className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-surface py-1.5 pl-4 pr-1.5 text-[13px] font-semibold text-brand-navy shadow-xl"
        >
          <span className="mr-2 flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Editing layout
          </span>
          <button
            type="button"
            onClick={() => setDraft((s) => ({ ...s, layout: [...s.layout, { i: CUSTOM + Date.now(), x: 0, y: 9999, w: 3, h: 1 }] }))}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors hover:bg-surface-subtle"
          >
            <Plus className="h-4 w-4" />
            Add card
          </button>
          <button
            type="button"
            onClick={() =>
              confirm("Reset the home page to its default layout? Added cards and text edits will be removed.") &&
              setDraft({ layout: [], content: {} })
            }
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-surface-subtle"
          >
            Reset
          </button>
          <button type="button" onClick={() => setEditMode(false)} className="rounded-full px-3 py-1.5 transition-colors hover:bg-surface-subtle">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(draft);
              setEditMode(false);
            }}
            className="rounded-full bg-brand-navy px-4 py-1.5 text-white transition-colors hover:bg-brand-navy/90"
          >
            Save
          </button>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => {
            setDraft(initial);
            setEditMode(true);
          }}
          className="group fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-full bg-brand-navy py-1.5 pl-1.5 pr-5 text-[13px] font-semibold text-white shadow-xl transition-colors hover:bg-brand-navy/90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
            <Pencil className="h-4 w-4" />
          </span>
          Edit layout
        </button>
      )}

      <Grid
        className={cn("tile-grid", editMode && "is-editing")}
        layouts={{ lg: items, sm: items.map((item, y) => ({ ...item, x: 0, y, w: 1, minW: 1 })) }}
        breakpoints={{ lg: 768, sm: 0 }}
        cols={{ lg: 6, sm: 1 }}
        rowHeight={24}
        margin={[24, 24]}
        containerPadding={[0, 0]}
        isDraggable={editMode}
        resizeHandles={["e", "s", "se"]}
        draggableCancel=".rgl-no-drag"
        onDragStop={saveLayout}
        onResizeStop={saveLayout}
      >
        {ids.map((id) => (
          <div key={id} className="relative">
            <Tile
              id={id}
              contentKey={JSON.stringify(contentOf(id))}
              onHeight={onHeight}
              className={cn(editMode && "rounded-card ring-2 ring-dashed ring-brand-link/40")}
            >
              {tileOf(id).render(contentOf(id))}
            </Tile>

            {editMode && (
              <div className="rgl-no-drag absolute right-2 top-2 z-10 flex gap-1.5">
                {tileOf(id).content && (
                  <button type="button" onClick={() => setSettingsFor(id)} className={cardButton}>
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                )}
                {id.startsWith(CUSTOM) && (
                  <button
                    type="button"
                    aria-label="Delete card"
                    onClick={() => setDraft((s) => ({ ...s, layout: s.layout.filter((item) => item.i !== id) }))}
                    className={cn(cardButton, "w-8 px-0 hover:text-red-600")}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </Grid>

      {settingsFor && (
        <TileSettingsSidebar
          key={settingsFor}
          content={contentOf(settingsFor)}
          onSave={(content) => {
            setDraft((s) => ({ ...s, content: { ...s.content, [settingsFor]: content } }));
            setSettingsFor(null);
          }}
          onClose={() => setSettingsFor(null)}
        />
      )}
    </>
  );
}
