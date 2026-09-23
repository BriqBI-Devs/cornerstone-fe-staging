import { Search } from "lucide-react";
import { CustomizableWorkspace } from "../../features/home/CustomizableWorkspace";
import { FeedbackAndIdeas } from "../../features/home/FeedbackAndIdeas";
import { HowWeWork } from "../../features/home/HowWeWork";
import { KPICards } from "../../features/home/KPICards";
import { LinkedInFeed } from "../../features/home/LinkedInFeed";
import { ManagerNotices } from "../../features/home/ManagerNotices";
import { NewsSection } from "../../features/home/NewsSection";
import { PopularLinks } from "../../features/home/PopularLinks";
import { PulsePoll } from "../../features/home/SocialRow";
import { UpcomingEvents } from "../../features/home/UpcomingEvents";
import { WhereWeWork } from "../../features/home/WhereWeWork";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* top-[217px] clears the pinned header in PublicLayout
          (utility bar 53 + masthead 117 + nav 47). */}
      <div className="sticky top-[217px] z-20 -mt-6 flex items-center justify-between gap-4 border-b border-border bg-surface pb-4 pt-6">
        <h1 className="shrink-0 text-lg font-semibold text-brand-navy">
          {getGreeting()}, Jordan
        </h1>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-surface-subtle px-4 py-2">
          <Search className="h-4 w-4 shrink-0 text-brand-navy/50" />
          <input
            type="text"
            placeholder="Search Cornerstone — people, files, news..."
            className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-brand-navy/50"
          />
        </div>
      </div>

      <NewsSection />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PopularLinks />
        <div className="lg:col-span-2">
          <UpcomingEvents />
        </div>
      </div>

      {/* Reference marker only — shows where "above the fold" ends on a
          typical laptop viewport. Not real site UI; remove before ship. */}
      <div className="relative border-t border-dashed border-brand-navy/30">
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-navy/30 bg-surface px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-navy/50">
          Fold
        </span>
      </div>

      <ManagerNotices />
      <KPICards />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <WhereWeWork />
        <HowWeWork />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PulsePoll />
        <FeedbackAndIdeas />
      </div>

      <LinkedInFeed />
      <CustomizableWorkspace />
    </div>
  );
}
