import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPersonById, getReports } from "../../data";
import { CELL, GAP, OrgRow } from "./OrgRow";
import { OrgSearch } from "./OrgSearch";

const ROOT = 1; // the person at the top of the chart

/** Ids from the top of the chart down to this person. */
const chainTo = (id: number) => {
  const chain: number[] = [];
  for (let p = getPersonById(id); p; p = getPersonById(p.manager ?? undefined)) chain.unshift(p.id);
  return chain;
};

/** The /people/:id/org-chart page: one row per level, the selected person centred in their row. */
export function OrgChartPage({ startId }: { startId: number }) {
  const [path, setPath] = useState(() => chainTo(startId)); // from the top person down to the selected one
  const [offsets, setOffsets] = useState<Record<number, number>>({}); // carousel position of the last row, by its manager
  const [width, setWidth] = useState(0);
  const chart = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // How wide the chart is decides how many cards fit and where the selected person sits.
  useLayoutEffect(() => {
    const measure = () => setWidth(chart.current?.clientWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // On landing, on reload, and after choosing someone, bring the selected card to the middle of the screen.
  // The rows only appear once the chart has a width, so this waits for that too.
  const ready = width > 0;
  useEffect(() => {
    if (ready) chart.current?.querySelector('[data-state="focused"]')?.scrollIntoView({ block: "center" });
  }, [path, ready]);

  const perView = window.innerWidth <= 480 ? 1 : Math.min(5, Math.max(1, Math.floor((width + GAP) / CELL)));

  // Row 0 is the top person alone; each next row lists the reports of the person selected in the row above.
  const rows = [[ROOT], ...path.map((id) => getReports(id).map((p) => p.id))].filter((ids) => ids.length);

  return (
    <div className="pb-8">
      <button type="button" onClick={() => navigate(-1)} className="mb-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy/60 hover:text-brand-link">
        ← Back
      </button>
      <h1 className="mb-3.5 border-b border-border pb-3.5 text-xl font-bold">Org chart</h1>
      <OrgSearch onChoose={(id) => setPath(chainTo(id))} />

      <div ref={chart} className="w-full">
        {width > 0 &&
          rows.map((ids, depth) => {
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
                  onPick={(id) => setPath([...path.slice(0, depth), id])}
                  onPage={(direction) => setOffsets({ ...offsets, [manager]: (offsets[manager] ?? 0) + direction * perView })}
                />
                {depth < rows.length - 1 && <div className="-mt-1 mb-6 border-t border-dashed border-[#d4d4d4]" />}
              </div>
            );
          })}
      </div>
    </div>
  );
}
