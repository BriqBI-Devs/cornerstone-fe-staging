import { Search } from "lucide-react";
import { HOME_TILES, HOME_TILES_STORAGE_KEY } from "../../features/home/tile-editor/homeTiles";
import { TileGrid, type TileGridData } from "../../features/home/tile-editor/TileGrid";
import { useLocalStorage } from "../../lib/useLocalStorage";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HomePage() {
  // Browser storage for now; swap this for loading and saving through the API.
  const [saved, setSaved] = useLocalStorage<TileGridData>(HOME_TILES_STORAGE_KEY, { layout: [], content: {} });

  return (
    <div className="flex flex-col gap-6">
      {/* top-[14rem] clears the pinned header in PublicLayout (utility bar + masthead + nav).
          In rem, so it follows the app's text size. */}
      <div className="flex flex-col gap-3 border-b border-border bg-surface pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:sticky md:top-[14rem] md:z-20 md:-mt-6 md:pt-6">
        <h1 className="shrink-0 text-lg font-semibold text-brand-navy">
          {getGreeting()}, Jordan
        </h1>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-surface-subtle px-4 py-2">
          <Search className="h-4 w-4 shrink-0 text-brand-navy/50" />
          <input
            type="text"
            placeholder="Search Cornerstone — people, files, news..."
            className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-brand-navy/50"
          />
        </div>
      </div>

      <TileGrid tiles={HOME_TILES} initial={saved} onSave={setSaved} />
    </div>
  );
}
