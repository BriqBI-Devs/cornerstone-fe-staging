import {
  Box,
  ChartNoAxesColumn,
  CircleAlert,
  Download,
  FileText,
  GitBranch,
  Heart,
  House,
  LayoutGrid,
  Link2,
  Mail,
  PanelLeft,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  Tag,
  User,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/** One icon for each sitemap page, by page id. */
const ICONS: Record<string, LucideIcon> = {
  content: FileText,
  "onboarding-content": GitBranch,
  sites: Store,
  alerts: CircleAlert,
  branding: Palette,
  "custom-app-tiles": LayoutGrid,
  "landing-pages": House,
  navigation: PanelLeft,
  newsletters: Mail,
  polls: ChartNoAxesColumn,
  application: SlidersHorizontal,
  "apps-and-links": Link2,
  "company-values": Heart,
  topics: Tag,
  "access-control": ShieldCheck,
  audiences: UsersRound,
  users: User,
  "export-history": Download,
  "analytics-application": ChartNoAxesColumn,
};

export function NavIcon({ id, className }: { id: string; className?: string }) {
  const Icon = ICONS[id] ?? Box;
  return <Icon className={className} aria-hidden="true" />;
}
