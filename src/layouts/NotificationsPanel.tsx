import { Mail, PictureInPicture2 } from "lucide-react";

const NOTIFICATIONS = [
  { text: 'A new newsletter is ready for you "What\'s New on Cornerstone?"', time: "3 days ago" },
  { text: 'A new newsletter is ready for you "What\'s New on Cornerstone?"', time: "10 days ago" },
  { text: 'A new newsletter is ready for you "What\'s New on Cornerstone?"', time: "17 days ago" },
  { text: 'A new newsletter is ready for you "What\'s New on Cornerstone?"', time: "24 days ago" },
  { text: 'A new newsletter is ready for you "What\'s New on Cornerstone?"', time: "a month ago" },
  { text: 'A new newsletter is ready for you "What\'s New on Cornerstone?"', time: "a month ago" },
];

export function NotificationsPanel() {
  return (
    <div className="absolute right-0 top-full z-10 mt-2 w-96 rounded-card border border-border bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <p className="text-base font-bold text-brand-navy">Notifications</p>
        <button aria-label="Open notifications settings" className="text-brand-navy/50 hover:text-brand-navy">
          <PictureInPicture2 className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {NOTIFICATIONS.map((n, i) => (
          <div key={i} className="flex gap-3 border-b border-border px-5 py-3.5 last:border-b-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-brand-navy/50">
              <Mail className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-brand-navy">{n.text}</p>
              <p className="mt-0.5 text-xs text-brand-navy/50">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
