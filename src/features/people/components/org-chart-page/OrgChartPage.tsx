import { ChevronUp } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPersonById, getReports } from "../../data";
import { CELL, GAP, OrgRow } from "./OrgRow";
import { OrgSearch } from "./OrgSearch";

const ROOT = 1; // the person at the top of the chart
const LEVELS_ABOVE = 1; // how many levels above the selected person show when the page opens; change this to show more

/** Ids from the top of the chart down to this person. */
const chainTo = (id: number) => {
  const chain: number[] = [];
  for (let p = getPersonById(id); p; p = getPersonById(p.manager ?? undefined)) chain.unshift(p.id);
  return chain;
};

/** The row to start from: the selected person's row, minus the levels above that we want showing. */
const startRow = (path: number[]) => Math.max(0, path.length - 1 - LEVELS_ABOVE);

/** Width of the chart area. It decides how many cards fit and where the selected person sits. */
function useChartWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => setWidth(ref.current?.clientWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { ref, width };
}

/**
 * The /people/:id/org-chart page: one row per level, the selected person centred in their row.
 *
 * How it works:
 * - `path` is the chain of selected people from the top person down to the focused one.
 * - Row 0 is the top person alone; every next row lists the reports of the person selected in the row above.
 * - `topRow` is the first row shown. It only moves up when the user presses the up arrow (or searches),
 *   so a row the user has opened is never closed again by clicking somewhere else.
 */
export function OrgChartPage({ startId }: { startId: number }) {
  const navigate = useNavigate();
  const { ref: chart, width } = useChartWidth();
  const ready = width > 0; // rows only appear once the chart has a width

  const [path, setPath] = useState(() => chainTo(startId));
  const [topRow, setTopRow] = useState(() => startRow(path));
  const [offsets, setOffsets] = useState<Record<number, number>>({}); // carousel position of the last row, by its manager

  // On landing and after choosing someone, bring the focused card to the middle of the screen.
  // The first scroll is instant; later ones glide (unless the user prefers reduced motion).
  const landed = useRef(false);
  useEffect(() => {
    if (!ready) return;
    const glide = landed.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    chart.current?.querySelector('[data-state="focused"]')?.scrollIntoView({ block: "center", behavior: glide ? "smooth" : "auto" });
    landed.current = true;
  }, [path, ready, chart]);

  const perView = window.innerWidth <= 480 ? 1 : Math.min(5, Math.max(1, Math.floor((width + GAP) / CELL)));
  const rows = [[ROOT], ...path.map((id) => getReports(id).map((p) => p.id))].filter((ids) => ids.length);

  /** Pick someone in a row. Rows that are already open stay open; the focused row must always be visible. */
  const pick = (depth: number, id: number) => {
    const next = [...path.slice(0, depth), id];
    setPath(next);
    setTopRow(Math.min(topRow, next.length - 1));
  };

  /** Choose someone from the search box: show them with the usual number of levels above. */
  const choose = (id: number) => {
    const next = chainTo(id);
    setPath(next);
    setTopRow(startRow(next));
  };

  const page = (manager: number, direction: 1 | -1) =>
    setOffsets({ ...offsets, [manager]: (offsets[manager] ?? 0) + direction * perView });

  return (
    <div className="pb-8">
      <button type="button" onClick={() => navigate(-1)} className="mb-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy/60 hover:text-brand-link">
        ← Back
      </button>
      <h1 className="mb-3.5 border-b border-border pb-3.5 text-xl font-bold">Org chart</h1>
      <OrgSearch onChoose={choose} />

      <div ref={chart} className="w-full">
        {ready && topRow > 0 && (
          <div className="mb-3 flex justify-center">
            <button
              type="button"
              onClick={() => setTopRow(topRow - 1)}
              aria-label="Show the level above"
              title="Show the level above"
              className="grid size-[38px] place-items-center rounded-full border border-border bg-white text-brand-navy shadow-[0_2px_6px_-2px_rgba(27,42,58,0.25)] hover:border-brand-link hover:bg-brand-link/5 hover:text-brand-link"
            >
              <ChevronUp className="size-5" />
            </button>
          </div>
        )}

        {ready &&
          rows.map((ids, depth) => {
            if (depth < topRow) return null;
            const manager = depth === 0 ? 0 : path[depth - 1]; // identifies the row, so it keeps its place between renders
            return (
              <div key={manager}>
                <OrgRow
                  ids={ids}
                  selectedId={path[depth]}
                  focused={depth === path.length - 1}
                  width={width}
                  perView={perView}
                  offset={offsets[manager] ?? 0}
                  onPick={(id) => pick(depth, id)}
                  onPage={(direction) => page(manager, direction)}
                />
                {depth < rows.length - 1 && <div className="-mt-1 mb-6 border-t border-dashed border-[#d4d4d4]" />}
              </div>
            );
          })}
      </div>
    </div>
  );
}
