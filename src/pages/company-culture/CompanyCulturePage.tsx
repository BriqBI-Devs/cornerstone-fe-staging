import { CultureBanner } from "../../features/company-culture/CultureBanner";
import { FeaturedStory } from "../../features/company-culture/FeaturedStory";
import { MoreStories } from "../../features/company-culture/MoreStories";

export function CompanyCulturePage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <CultureBanner />
      <FeaturedStory />
      <MoreStories />
    </div>
  );
}
