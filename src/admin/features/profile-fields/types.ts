/** Where a profile field's value comes from. */
export type ProfileFieldSource = "dayforce" | "microsoft" | "admin";

export interface ProfileFieldSetting {
  id: string;
  label: string;
  source: ProfileFieldSource;
  /** Whether employees can see this field on profiles. */
  visible: boolean;
  /** Fixed hidden: never shown to anyone, so it cannot be switched on. */
  locked?: boolean;
}
