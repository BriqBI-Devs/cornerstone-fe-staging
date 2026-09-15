import { Activity, MessageCircle, MessageSquare, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { cn } from "../../lib/cn";

const FEED = [
  {
    name: "Margaret Carestia",
    action: "posted in Builders",
    text: "Topping-out ceremony photos from the Bronx site. Every name on that beam earned it.",
    likes: 87,
    comments: 14,
    date: "Jul 8",
  },
  {
    name: "Frank Oyelaran",
    action: "posted in Meet the IT Team",
    text: "Reminder: the MFA rollout completes this month. Walk-up help Tuesdays and Thursdays, 12–2, 4th-floor kitchen.",
    likes: 23,
    comments: 6,
    date: "Jul 7",
  },
];

const POLL = {
  question: "Where should the fall volunteer day be?",
  options: ["Morningside Park", "Saratoga Community Garden"],
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
    label: "2 workaversarys this month",
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
        {POLL.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={cn(
              "w-full rounded-md border px-3 py-2 text-left text-sm font-medium transition-colors",
              selected === option
                ? "border-brand-link bg-blue-50 text-brand-link"
                : "border-border text-brand-navy hover:bg-surface-subtle",
            )}
          >
            {option}
          </button>
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

function LatestFeed() {
  return (
    <Card className="border-t-2 border-t-brand-navy">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
          <Activity className="h-3.5 w-3.5" />
        </span>
        <p className="text-[15px] font-bold text-brand-navy">Latest from the feed</p>
      </div>
      <div className="space-y-4">
        {FEED.map((post, i) => (
          <div key={post.name + post.date} className={cn(i > 0 && "border-t border-border pt-4")}>
            <div className="flex items-center gap-2">
              <Avatar name={post.name} size="sm" />
              <p className="min-w-0 truncate text-sm">
                <span className="font-semibold text-brand-navy">{post.name}</span>{" "}
                <span className="text-brand-navy/55">{post.action}</span>
              </p>
            </div>
            <p className="mt-2 text-sm text-brand-navy/85">{post.text}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-brand-navy/55">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3.5 w-3.5" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                {post.comments}
              </span>
              <span>· {post.date}</span>
            </div>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="mt-3 block text-right text-sm font-semibold text-brand-navy hover:underline"
      >
        View more →
      </a>
    </Card>
  );
}

export function SocialRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Celebrations />
      <PulsePoll />
      <LatestFeed />
    </div>
  );
}
