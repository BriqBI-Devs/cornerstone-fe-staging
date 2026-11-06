import { Info, X } from "lucide-react";
import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type Side = "top" | "bottom" | "left" | "right";

interface TempNoteProps {
  /** Text under the heading; leave it out for a heading-only note. */
  children?: ReactNode;
  /** Heading of the note. */
  title?: string;
  /** Which edge of the note the arrow sits on; it points away from the note. */
  arrow?: Side;
  /** Distance of the arrow from the start of its edge, in px. */
  arrowOffset?: number;
  /** Place the note yourself, e.g. "absolute z-10 w-[300px]". */
  className?: string;
  style?: CSSProperties;
  /** Once the note is closed it stays closed in this browser: remembered in localStorage under this key. */
  storageKey?: string;
}

// The arrow is a rotated square; only the two edges that stick out get a border.
const ARROW: Record<Side, { position: (offset: number) => CSSProperties; border: string }> = {
  top: { position: (o) => ({ top: -7, left: o }), border: "border-l border-t" },
  bottom: { position: (o) => ({ bottom: -7, left: o }), border: "border-b border-r" },
  left: { position: (o) => ({ left: -7, top: o }), border: "border-b border-l" },
  right: { position: (o) => ({ right: -7, top: o }), border: "border-r border-t" },
};

/**
 * TEMP: a dismissible review note with an arrow, for pointing at something while a design is being agreed.
 * Position it with className/style and delete the usages once the question is settled.
 */
export function TempNote({ children, title = "Note", arrow = "top", arrowOffset = 24, className, style, storageKey }: TempNoteProps) {
  const [open, setOpen] = useState(() => !storageKey || localStorage.getItem(storageKey) !== "true");
  // Closing the note (the x or "Got it") is what gets remembered.
  const dismiss = () => {
    if (storageKey) localStorage.setItem(storageKey, "true");
    setOpen(false);
  };
  if (!open) return null;

  return (
    <div
      role="note"
      style={style}
      className={cn(
        "rounded-xl border border-border bg-white text-brand-navy shadow-[0_16px_40px_-12px_rgba(27,42,58,0.35),0_2px_6px_rgba(27,42,58,0.08)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        style={ARROW[arrow].position(arrowOffset)}
        className={cn("absolute size-3.5 rotate-45 border-border bg-white", ARROW[arrow].border)}
      />
      {/* Accent edge */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-brand-accent" />

      <div className="px-5 pb-3.5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-accent/25 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em]">
              <Info className="size-3" aria-hidden="true" />
              Note
            </span>
            <h3 className="mt-1.5 text-sm font-bold leading-snug">{title}</h3>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss note"
            className="-mr-1.5 -mt-1 grid size-6 shrink-0 place-items-center rounded-md text-brand-navy/45 hover:bg-surface-subtle hover:text-brand-navy"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {children && (
          <div className="mt-2 grid gap-2.5 text-[13px] leading-relaxed text-brand-navy/75 [&_strong]:font-semibold [&_strong]:text-brand-navy">
            {children}
          </div>
        )}

        <div className="mt-3 flex justify-end border-t border-border pt-2.5">
          <button
            type="button"
            onClick={dismiss}
            className="rounded-md bg-brand-navy px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-brand-navy/90"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
