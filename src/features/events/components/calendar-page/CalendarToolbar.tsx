import type { CalendarMode } from "../../types";

interface CalendarToolbarProps {
  title: string;
  mode: CalendarMode;
  onModeChange: (mode: CalendarMode) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const arrow =
  "grid size-[38px] place-items-center rounded-lg border border-ev-line bg-white text-xl leading-none hover:border-ev-navy";

export function CalendarToolbar({ title, mode, onModeChange, onPrevious, onNext, onToday }: CalendarToolbarProps) {
  const unit = mode === "week" ? "week" : "month";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 pb-3 pt-1 md:px-5 md:pb-3.5">
      <div className="flex items-center gap-2">
        <button type="button" aria-label={`Previous ${unit}`} onClick={onPrevious} className={arrow}>‹</button>
        <h2 className="mx-1 min-w-0 text-lg font-bold md:min-w-[170px] md:text-xl">{title}</h2>
        <button type="button" aria-label={`Next ${unit}`} onClick={onNext} className={arrow}>›</button>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onToday} className="px-1.5 py-1 text-sm font-bold text-ev-link hover:underline">
          Today
        </button>
        <select
          value={mode}
          aria-label="Calendar view"
          onChange={(e) => onModeChange(e.target.value as CalendarMode)}
          className="h-[38px] rounded-lg border border-ev-line bg-white pl-3.5 pr-7 text-sm font-semibold"
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
        </select>
      </div>
    </div>
  );
}
