import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { cn } from "../../lib/cn";

const POLL = {
  question: "Where should the fall volunteer day be?",
  options: [
    { label: "Morningside Park", pct: 68 },
    { label: "Saratoga Community Garden", pct: 32 },
  ],
  votes: 412,
  closesIn: "7 days",
};

export function PulsePoll() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card className="flex h-full flex-col border-t-2 border-t-brand-link">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-brand-link/10 text-brand-link">
          <MessageSquare className="h-3.5 w-3.5" />
        </span>
        <p className="text-[15px] font-semibold text-brand-navy">Pulse poll</p>
      </div>
      <p className="text-sm text-brand-navy">{POLL.question}</p>
      <div className="mt-3 space-y-2">
        {selected === null
          ? POLL.options.map((option) => (
              <button
                key={option.label}
                onClick={() => setSelected(option.label)}
                className="w-full rounded-md border border-border px-3 py-2 text-left text-sm font-medium text-brand-navy transition-colors hover:border-brand-link/40 hover:bg-surface-subtle"
              >
                {option.label}
              </button>
            ))
          : POLL.options.map((option) => (
              <div
                key={option.label}
                className={cn(
                  "relative overflow-hidden rounded-md border px-3 py-2 text-sm font-medium",
                  option.label === selected ? "border-brand-link" : "border-border",
                )}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-brand-link/15"
                  style={{ width: `${option.pct}%` }}
                />
                <div className="relative flex items-center justify-between text-brand-navy">
                  <span>{option.label}</span>
                  <span>{option.pct}%</span>
                </div>
              </div>
            ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-3">
        <p className="text-xs text-brand-navy/55">
          {POLL.votes} votes so far · closes in {POLL.closesIn}
        </p>
        <a href="#" className="shrink-0 text-sm font-semibold text-brand-navy hover:underline">
          View more →
        </a>
      </div>
    </Card>
  );
}
