import type { LucideIcon } from "lucide-react";
import { Lightbulb, Link2, MessageSquare } from "lucide-react";
import type { Layout } from "react-grid-layout/legacy";

export type TileId = "poll" | "feedback" | "linkedin";

// Fixed per tile-type (icon, display name) — independent of the user-editable
// title in TileContent below. Used by both the grid overlay and the sidebar.
export const TILE_META: Record<TileId, { type: string; icon: LucideIcon }> = {
  poll: { type: "Pulse poll", icon: MessageSquare },
  feedback: { type: "Feedback and ideas", icon: Lightbulb },
  linkedin: { type: "LinkedIn feed", icon: Link2 },
};

export type TileContent = { title: string };

export type StoredState = {
  layout: Layout;
  content: Record<TileId, TileContent>;
};

// v3: dropped per-tile accent color editing — each tile's border color is fixed
// in its own component again, not stored/edited data. Bump resets old v2 data
// that still carries the now-unused `accent` field.
export const HOME_TILES_STORAGE_KEY = "cornerstone.home.tiles.v3";

// 6-column grid so width can be dragged incrementally (not just a half/full snap).
export const DEFAULT_STATE: StoredState = {
  layout: [
    { i: "poll", x: 0, y: 0, w: 3, h: 1, minW: 2 },
    { i: "feedback", x: 3, y: 0, w: 3, h: 1, minW: 2 },
    { i: "linkedin", x: 0, y: 1, w: 6, h: 1, minW: 2 },
  ],
  content: {
    poll: { title: "Pulse poll" },
    feedback: { title: "Feedback and ideas" },
    linkedin: { title: "Latest from LinkedIn" },
  },
};
