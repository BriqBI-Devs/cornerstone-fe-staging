export interface AdminTab {
  id: string;
  label: string;
  /** Text of the button shown beside the page title on this tab, e.g. "Create story". */
  action?: string;
}

export interface AdminNavItem {
  id: string;
  label: string;
  description: string;
  tabs?: AdminTab[];
  /** Text of the button beside the page title when the page has no tabs, e.g. "Create event". */
  action?: string;
  /** Shown after the name in the sidebar, e.g. "11 reports". */
  note?: string;
  /** Shown at the right of the sidebar row. */
  badge?: string;
}

export interface AdminNavGroup {
  title: string | null;
  items: AdminNavItem[];
}

export interface AdminNavSection {
  section: string;
  groups: AdminNavGroup[];
}

/** A page together with where it sits in the sitemap. */
export interface AdminPageInfo extends AdminNavItem {
  section: string;
  group: string | null;
}
