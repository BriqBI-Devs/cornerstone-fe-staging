import { X } from "lucide-react";
import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export function ManagerNotices() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <Card className="flex items-center justify-between gap-3 border-l-4 border-l-brand-accent">
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-brand-navy">Manager Monday</h2>
        <p className="mt-1 text-sm text-brand-navy/75">
          Q3 headcount review starts next week — check your inbox for the prep deck.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Badge variant="accent">Managers only</Badge>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="rounded p-1 text-brand-navy/50 hover:bg-surface-subtle hover:text-brand-navy"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}
