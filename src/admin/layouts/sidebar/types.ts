export interface AdminTab {
  id: string;
  label: string;
}

export interface AdminNavItem {
  id: string;
  label: string;
  tabs?: AdminTab[];
  /** Where the sidebar link goes when that isn't the page's own address, e.g. the same list opened with a filter set. */
  to?: string;
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
