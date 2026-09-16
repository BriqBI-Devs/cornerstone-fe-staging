import { Search } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { CustomizableWorkspace } from "../../features/home/CustomizableWorkspace";
import { FeedbackAndIdeas } from "../../features/home/FeedbackAndIdeas";
import { HomeSidebar } from "../../features/home/HomeSidebar";
import { HowWeWork } from "../../features/home/HowWeWork";
import { KPICards } from "../../features/home/KPICards";
import { LinkedInFeed } from "../../features/home/LinkedInFeed";
import { ManagerNotices } from "../../features/home/ManagerNotices";
import { NewsSection } from "../../features/home/NewsSection";
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
  const { searchOpen } = useOutletContext<{ searchOpen: boolean }>();

  return (
    <div className="flex gap-6">
      <HomeSidebar />

      <div className="flex flex-1 flex-col gap-6">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <h1 className="shrink-0 text-lg font-semibold text-brand-navy">
            {getGreeting()}, Jordan
          </h1>
          {searchOpen && (
            <div className="flex flex-1 items-center gap-2 rounded-full bg-surface-subtle px-4 py-2">
              <Search className="h-4 w-4 shrink-0 text-brand-navy/50" />
              <input
                autoFocus
                type="text"
                placeholder="Search Cornerstone — people, files, news..."
                className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-brand-navy/50"
              />
            </div>
          )}
        </div>

        <NewsSection />
        <UpcomingEvents />
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
    </div>
  );
}
