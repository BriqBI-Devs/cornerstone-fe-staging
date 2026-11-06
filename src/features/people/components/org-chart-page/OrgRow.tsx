import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPersonById } from "../../data";
import { OrgCard } from "./OrgCard";

export const CELL = 229; // a card (221 wide) plus the 8px gap
const CARD = 221;
export const GAP = 8;

const arrow =
  "absolute top-[114px] z-[5] grid size-10 place-items-center rounded-lg border-[1.25px] border-[#737373] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]";

interface OrgRowProps {
  ids: number[];
  /** The person selected in this row; that row shows only them in the middle, with arrows to their neighbours. */
  selectedId?: number;
  /** True when the selected person is the one the chart is focused on. */
  focused: boolean;
  /** Width of the whole chart, and how many cards fit across it. */
  width: number;
  perView: number;
  /** First visible card, for a row without a selected person (the last row). */
  offset: number;
  onPick: (id: number) => void;
  onPage: (direction: 1 | -1) => void;
}

/**
 * One level of the chart.
 * - A row with a selected person slides so that person sits in the middle; the arrows beside them step to the next or previous person.
 * - The last row (the focused person's reports) is a carousel: the arrows slide it a page at a time.
 */
export function OrgRow({ ids, selectedId, focused, width, perView, offset, onPick, onPage }: OrgRowProps) {
  const at = ids.indexOf(selectedId ?? -1);
  const picked = at >= 0;
  const first = Math.max(0, Math.min(offset, ids.length - perView));

  const x = picked ? width / 2 - (at * CELL + CARD / 2) : -first * CELL;
  const stageWidth = picked ? width : Math.min(ids.length, perView) * CELL - GAP;

  return (
    // New rows drop in; rows that stay slide to their new position.
    <section className="mb-6 animate-[org-drop_0.2s_ease-out]">
      <div className="relative mx-auto" style={{ width: stageWidth }}>
        {picked ? (
          <>
            {at > 0 && (
              <button type="button" aria-label="Previous person" onClick={() => onPick(ids[at - 1])} className={`${arrow} left-[calc(50%-159px)]`}>
                <ChevronLeft className="size-5" />
              </button>
            )}
            {at < ids.length - 1 && (
              <button type="button" aria-label="Next person" onClick={() => onPick(ids[at + 1])} className={`${arrow} left-[calc(50%+119px)]`}>
                <ChevronRight className="size-5" />
              </button>
            )}
          </>
        ) : (
          <>
            {first > 0 && (
              <button type="button" aria-label="Previous" onClick={() => onPage(-1)} className={`${arrow} -left-5`}>
                <ChevronLeft className="size-5" />
              </button>
            )}
            {first + perView < ids.length && (
              <button type="button" aria-label="Next" onClick={() => onPage(1)} className={`${arrow} -right-5`}>
                <ChevronRight className="size-5" />
              </button>
            )}
          </>
        )}

        <div className="-mx-1 -mt-1 -mb-2 overflow-hidden px-1 pb-2 pt-1">
          <div role="list" className="flex gap-2 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform motion-reduce:transition-none" style={{ transform: `translateX(${x}px)` }}>
            {ids.map((id) => (
              <OrgCard
                key={id}
                person={getPersonById(id)!}
                state={id === selectedId ? (focused ? "focused" : "open") : "idle"}
                onPick={() => onPick(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

