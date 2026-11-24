import { ProfileFieldList } from "../../features/application/components/ProfileFieldList";

/** Admin > Application > People tab. */
export default function PeoplePage() {
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-base font-semibold">Profile fields</h2>
        <p className="mt-0.5 text-sm text-admin-muted">
          Check the fields employees can see on profiles.
        </p>
      </div>
      <ProfileFieldList />
    </div>
  );
}
