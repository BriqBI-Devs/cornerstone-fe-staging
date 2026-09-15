import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export function AlertBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-3 rounded-card border border-border border-l-4 border-l-brand-accent bg-surface px-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <AlertTriangle className="h-4 w-4 shrink-0 text-brand-accent" />
        <p className="text-sm text-brand-navy">
          Safety stand-down at all sites this Friday, 7:00 AM.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="shrink-0 rounded p-1 text-brand-navy/50 hover:bg-surface-subtle hover:text-brand-navy"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
