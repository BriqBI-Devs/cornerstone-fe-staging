import { PageHeaderBanner } from "../../components/ui/PageHeaderBanner";
import { FeaturedStory } from "../../features/company-culture/FeaturedStory";
import { MoreStories } from "../../features/company-culture/MoreStories";

export function CompanyCulturePage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeaderBanner
        title="Company + Culture"
        description="Workiversaries, welcomes, team milestones, and the stories that make L+M feel like home, across every office and every team."
      />
      <FeaturedStory />
      <MoreStories />
    </div>
  );
}
