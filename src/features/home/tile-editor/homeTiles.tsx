import { CustomizableWorkspace } from "../CustomizableWorkspace";
import { FeedbackAndIdeas } from "../FeedbackAndIdeas";
import { KPICards } from "../KPICards";
import { LinkedInFeed } from "../LinkedInFeed";
import { ManagerNotices } from "../ManagerNotices";
import { NewsSection } from "../NewsSection";
import { PulsePoll } from "../SocialRow";
import { UpcomingEvents } from "../UpcomingEvents";
import { linkListTile } from "./StaticCards";
import type { TileSet } from "./TileGrid";

/** The home page cards in reading order; add one by adding an entry. `layout` is the start spot on a 6-column grid. */
export const HOME_TILES: TileSet = {
  news: { layout: { x: 0, y: 0, w: 6 }, resizable: false, render: () => <NewsSection /> },
  // TODO: Popular links, Where we work and How we work will be managed like custom cards (loaded from saved data).
  popular: linkListTile("Popular links", { x: 0, y: 1, w: 2 }, [
    "Deal Data + Construction",
    "Building List",
    "Offices, Space + Parking",
  ]),
  events: { layout: { x: 2, y: 1, w: 4 }, render: () => <UpcomingEvents /> },
  manager: { layout: { x: 0, y: 2, w: 6 }, render: () => <ManagerNotices /> },
  kpis: { layout: { x: 0, y: 3, w: 6 }, render: () => <KPICards /> },
  where: linkListTile("Where we work", { x: 0, y: 4, w: 3 }, [
    "Regional Offices Directory",
    "Community Investment Sites",
    "Property Operations Hub",
    "Facilities Requests",
  ]),
  how: linkListTile("How we work", { x: 3, y: 4, w: 3 }, [
    "Company Guide",
    "Mission + Values",
    "How we support employees",
    "Benefits + Wellbeing",
    "Learning + Development",
    "Policies + Handbook",
    "Project Delivery Playbook",
    "Newsletters",
    "IT Help Desk",
  ]),
  poll: { layout: { x: 0, y: 5, w: 3 }, render: () => <PulsePoll /> },
  feedback: { layout: { x: 3, y: 5, w: 3 }, render: () => <FeedbackAndIdeas /> },
  linkedin: { layout: { x: 0, y: 6, w: 6 }, render: () => <LinkedInFeed /> },
  workspace: { layout: { x: 0, y: 7, w: 6 }, render: () => <CustomizableWorkspace /> },
};

export const HOME_TILES_STORAGE_KEY = "cornerstone.home.tiles.v7";
