import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../../lib/useLocalStorage";
import { getActivity, getProfileDetails } from "../../data";
import type { Person, SavedEdits } from "../../types";
import { ActivityCard } from "./ActivityCard";
import { EditProfileDialog } from "./EditProfileDialog";
import { OrgSummaryCard } from "./OrgSummaryCard";
import { ProfileHeader } from "./ProfileHeader";

/** The /people/:id page. */
export function ProfilePage({ person: original }: { person: Person }) {
  // Edits are kept in this browser for now; swap for the profile requests once the backend exists.
  const [saved, setSaved] = useLocalStorage<SavedEdits | null>(`cornerstone:people-edit:${original.id}`, null);
  const [editing, setEditing] = useState(false);

  const person = saved ? { ...original, name: saved.name, title: saved.title, manager: saved.manager } : original;
  const details = saved?.details ?? getProfileDetails(original);
  const { published, mentioned } = getActivity(person);

  return (
    <div className="pb-8">
      <Link to="/people" className="mb-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy/60 hover:text-brand-link">
        ← Back to People
      </Link>

      <ProfileHeader person={person} details={details} onEdit={() => setEditing(true)} />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)]">
        <ActivityCard published={published} mentioned={mentioned} />
        <div className="grid min-w-0 gap-6">
          <OrgSummaryCard person={person} />
        </div>
      </div>

      <EditProfileDialog
        open={editing}
        person={person}
        details={details}
        onClose={() => setEditing(false)}
        onSave={(edits) => {
          setSaved(edits);
          setEditing(false);
        }}
      />
    </div>
  );
}
