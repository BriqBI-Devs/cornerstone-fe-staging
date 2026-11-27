import type { ProfileFieldSetting } from "./types";

/** The only place that stores or loads profile field visibility: localStorage now, the backend later. */

const STORAGE_KEY = "admin-profile-fields";

// The fields from the 11 Nov review. Dayforce and Microsoft fields are read-only everywhere; this only controls who sees them.
const DEFAULT_FIELDS: ProfileFieldSetting[] = [
  { id: "name", label: "Name", source: "dayforce", visible: true },
  { id: "jobTitle", label: "Job title", source: "dayforce", visible: true },
  { id: "department", label: "Department", source: "dayforce", visible: true },
  { id: "manager", label: "Manager", source: "dayforce", visible: true },
  { id: "email", label: "Email", source: "microsoft", visible: true },
  { id: "phone", label: "Phone", source: "microsoft", visible: true },
  { id: "extension", label: "Extension", source: "microsoft", visible: true },
  { id: "mobile", label: "Mobile phone", source: "microsoft", visible: true },
  { id: "teams", label: "Microsoft Teams button", source: "microsoft", visible: true },
  { id: "timezone", label: "Time zone", source: "microsoft", visible: true },
  { id: "hireDate", label: "Hire date", source: "dayforce", visible: false, locked: true },
  { id: "birthday", label: "Birthday", source: "dayforce", visible: false, locked: true },
];

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const isStored = (value: unknown): value is Record<string, boolean> => typeof value === "object" && value !== null;

/** The fields with their saved visibility applied. */
export async function loadProfileFields(): Promise<ProfileFieldSetting[]> {
  await delay();
  let saved: Record<string, boolean> = {};
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (isStored(parsed)) saved = parsed;
  } catch {
    // unreadable or unavailable: fall back to the defaults
  }
  return DEFAULT_FIELDS.map((field) => (field.locked ? field : { ...field, visible: saved[field.id] ?? field.visible }));
}

/** Saves which fields are visible. */
export async function saveProfileFields(fields: ProfileFieldSetting[]): Promise<void> {
  await delay();
  const visibility = Object.fromEntries(fields.filter((f) => !f.locked).map((f) => [f.id, f.visible]));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visibility));
  } catch {
    // localStorage unavailable (private mode, quota): the change is lost on reload
  }
}
