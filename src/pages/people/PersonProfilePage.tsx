import { Link, useParams } from "react-router-dom";
import { ProfilePage } from "../../features/people/components/profile-page/ProfilePage";
import { getPersonById } from "../../features/people/data";

export function PersonProfilePage() {
  const person = getPersonById(useParams().id);

  if (!person) {
    return (
      <div className="px-5 py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold">Person not found</h1>
        <p className="mb-4 text-brand-navy/60">This profile doesn't exist or may have been removed.</p>
        <Link to="/people" className="inline-flex rounded-lg bg-brand-navy px-[18px] py-[9px] text-sm font-semibold text-white">
          Back to People
        </Link>
      </div>
    );
  }

  // key resets the edit state when moving between profiles.
  return <ProfilePage key={person.id} person={person} />;
}
