import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

/** Admin entry to the home page editor: the editing itself happens on the real home page. */
export default function HomeLayoutPage() {
  return (
    <section className="rounded-xl border border-admin-line bg-white p-5">
      <h2 className="text-base font-bold">Home layout</h2>
      <p className="mt-1 max-w-[460px] text-sm leading-relaxed text-admin-muted">
        Drag, resize and edit the cards on the home page. Changes apply once you finish editing.
      </p>
      <Link
        to="/?editLayout=1"
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-[10px] bg-admin-navy px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-link"
      >
        Open home page editor
        <ExternalLink className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
