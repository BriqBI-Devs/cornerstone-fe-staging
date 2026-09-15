import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { cn } from "../../lib/cn";
import { LinkedInFeed } from "./LinkedInFeed";

const POLL = {
  question: "Where should the fall volunteer day be?",
  options: [
    { label: "Morningside Park", pct: 68 },
    { label: "Saratoga Community Garden", pct: 32 },
  ],
  votes: 412,
  closesIn: "7 days",
};

const CELEBRATIONS = [
  {
    icon: "🎂",
    label: "3 birthdays this month",
    people: [
      { name: "Denise Ramirez", detail: "12 July" },
      { name: "Marcus Lee", detail: "14 July" },
      { name: "Ana Gómez", detail: "16 July" },
    ],
  },
  {
    icon: "🎉",
    label: "2 Workiversaries this month",
    people: [
      { name: "Denise Ramirez", detail: "10 years" },
      { name: "Margaret Carestia", detail: "12 years" },
    ],
  },
];

function Celebrations() {
  return (
    <Card className="flex h-full flex-col border-t-2 border-t-brand-accent">
      <SectionHeading title="Celebrations" />
      <div className="space-y-4">
        {CELEBRATIONS.map((group, i) => (
          <div key={group.label} className={cn(i > 0 && "border-t border-border pt-4")}>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-sm">
                {group.icon}
              </span>
              <p className="text-sm font-semibold text-brand-navy">{group.label}</p>
            </div>
            <ul className="mt-2 space-y-1.5 pl-9">
              {group.people.map((person) => (
                <li
                  key={person.name}
                  className="flex items-center justify-between gap-2 text-sm text-brand-navy/75"
                >
                  <span>{person.name}</span>
                  <span className="shrink-0 text-xs text-brand-navy/55">{person.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="mt-auto block pt-4 text-right text-sm font-semibold text-brand-navy hover:underline"
      >
        View more →
      </a>
    </Card>
  );
}

function PulsePoll() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card className="flex h-full flex-col border-t-2 border-t-brand-link">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-link">
          <MessageSquare className="h-3.5 w-3.5" />
        </span>
        <p className="text-[15px] font-bold text-brand-navy">Pulse poll</p>
      </div>
      <p className="text-sm text-brand-navy">{POLL.question}</p>
      <div className="mt-3 space-y-2">
        {selected === null
          ? POLL.options.map((option) => (
              <button
                key={option.label}
                onClick={() => setSelected(option.label)}
                className="w-full rounded-md border border-border px-3 py-2 text-left text-sm font-medium text-brand-navy transition-colors hover:bg-surface-subtle"
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
        <a
          href="#"
          className="shrink-0 text-sm font-semibold text-brand-navy hover:underline"
        >
          View more →
        </a>
      </div>
    </Card>
  );
}

export function SocialRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Celebrations />
      <PulsePoll />
      <LinkedInFeed />
    </div>
  );
}
