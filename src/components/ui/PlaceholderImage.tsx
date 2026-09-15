import { cn } from "../../lib/cn";

export function PlaceholderImage({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden rounded-card", className)}
      style={{
        backgroundColor: "#e4edf7",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(27,42,58,0.08) 0, rgba(27,42,58,0.08) 1px, transparent 1px, transparent 14px)",
      }}
    >
      <span className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium text-brand-navy/60 shadow-card">
        {label}
      </span>
    </div>
  );
}
