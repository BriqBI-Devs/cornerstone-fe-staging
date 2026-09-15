import { Search } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { AlertBar } from "../../features/home/AlertBar";
import { HomeSidebar } from "../../features/home/HomeSidebar";
import { ManagerNotices } from "../../features/home/ManagerNotices";
import { NewsSection } from "../../features/home/NewsSection";
import { PeopleFinder } from "../../features/home/PeopleFinder";
import { QuickLinksTools } from "../../features/home/QuickLinksTools";
import { SocialRow } from "../../features/home/SocialRow";
import { UpcomingEvents } from "../../features/home/UpcomingEvents";
import { WhereWeWork } from "../../features/home/WhereWeWork";
import { useDateAndWeather } from "../../lib/useDateAndWeather";

export function HomePage() {
  const dateAndWeather = useDateAndWeather();
  const { searchOpen } = useOutletContext<{ searchOpen: boolean }>();

  return (
    <div className="flex gap-6">
      <HomeSidebar />

      <div className="flex flex-1 flex-col gap-6">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <h1 className="shrink-0 text-lg font-semibold text-brand-navy">Good morning, Jordan</h1>
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
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-brand-link">
            {dateAndWeather}
          </span>
        </div>

        <AlertBar />
        <NewsSection />
        <ManagerNotices />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <UpcomingEvents />
          <QuickLinksTools />
        </div>

        <WhereWeWork />
        <SocialRow />
        <PeopleFinder />
      </div>
    </div>
  );
}
