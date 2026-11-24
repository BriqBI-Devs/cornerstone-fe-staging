import {
  Box,
  Building2,
  CalendarDays,
  ChartNoAxesColumn,
  CircleAlert,
  FolderOpen,
  Heart,
  LayoutDashboard,
  Link2,
  Newspaper,
  Palette,
  SlidersHorizontal,
  User,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/** One icon for each sitemap page, by page id. */
const ICONS: Record<string, LucideIcon> = {
  "company-culture": Heart,
  news: Newspaper,
  events: CalendarDays,
  departments: Building2,
  polls: ChartNoAxesColumn,
  "policies-resources": FolderOpen,
  alerts: CircleAlert,
  application: SlidersHorizontal,
  branding: Palette,
  "home-layout": LayoutDashboard,
  "apps-and-links": Link2,
  audiences: UsersRound,
  users: User,
  "analytics-application": ChartNoAxesColumn,
};

export function NavIcon({ id, className }: { id: string; className?: string }) {
  const Icon = ICONS[id] ?? Box;
  return <Icon className={className} aria-hidden="true" />;
}
