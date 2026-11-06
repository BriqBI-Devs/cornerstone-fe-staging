export interface Person {
  id: number;
  /** Portrait image URL. */
  photo?: string;
  name: string;
  title: string;
  team: string;
  location: string;
  /** Id of the person they report to; null for the top of the org chart. */
  manager: number | null;
  /** Hire date, YYYY-MM-DD. */
  joined: string;
  expertise: string[];
}

export type FilterKey = "company" | "department" | "title" | "timezone" | "management" | "entity";
export type SortKey = "name" | "company" | "title" | "department";

/** One published or mentioned item in a person's activity feed. */
export interface ActivityItem {
  title: string;
  image: string;
  /** Site the item lives in, e.g. "Company News". */
  site: string;
  /** Posts in a restricted site show a lock. */
  locked?: boolean;
  /** YYYY-MM-DD. */
  date: string;
}

/** What the Edit profile form saves for one person. */
export interface SavedEdits {
  name: string;
  title: string;
  manager: number | null;
  details: ProfileDetails;
}

/** What the Edit profile form holds; every field is optional text. */
export interface ProfileDetails {
  first?: string;
  last?: string;
  jobTitle?: string;
  manager?: string;
  pronouns?: string;
  company?: string;
  entity?: string;
  department?: string;
  division?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  birthday?: string;
  hire?: string;
  email?: string;
  timezone?: string;
  phone?: string;
  ext?: string;
  mobile?: string;
  zoom?: string;
  social_linkedin?: string;
  social_x?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_youtube?: string;
  employeeNumber?: string;
  userType?: string;
  language?: string;
  cf_management?: string;
  cf_entity?: string;
  cf_businessLine?: string;
  cf_officeDays?: string;
}
