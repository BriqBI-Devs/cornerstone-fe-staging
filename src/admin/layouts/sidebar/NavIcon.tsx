import {
  Box,
  Building2,
  ChartNoAxesColumn,
  CircleAlert,
  FolderOpen,
  LayoutDashboard,
  Link2,
  Mail,
  Newspaper,
  Palette,
  Handshake,
  SlidersHorizontal,
  User,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/** One icon for each sitemap page, by page id. */
const ICONS: Record<string, LucideIcon> = {
  content: Newspaper,
  "onboarding-content": Handshake,
  departments: Building2,
  newsletters: Mail,
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
