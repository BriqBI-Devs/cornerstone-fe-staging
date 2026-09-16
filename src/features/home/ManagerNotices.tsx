import { Megaphone, X } from "lucide-react";
import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export function ManagerNotices() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <Card className="flex items-center gap-3 border-l-4 border-l-brand-accent bg-brand-accent/10">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
        <Megaphone className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-brand-navy">Manager Monday</h2>
          <Badge variant="accent">Managers only</Badge>
        </div>
        <p className="mt-1 text-sm text-brand-navy/75">
          Q3 headcount review starts next week — check your inbox for the prep deck.
        </p>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="shrink-0 rounded p-1 text-brand-navy/50 hover:bg-white/60 hover:text-brand-navy"
      >
        <X className="h-4 w-4" />
      </button>
    </Card>
  );
}
