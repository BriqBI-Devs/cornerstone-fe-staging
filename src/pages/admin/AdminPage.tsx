import { ArrowUpRight } from "lucide-react";
import { Card } from "../../components/ui/Card";

interface AdminDesign {
  id: number;
  /** Shown as "Design <id> — <title>" on the card. */
  title: string;
  /** What is different about this design, in a few lines. */
  description: string;
}

// The Admin Console design options for the client to choose from. Each one is a static page in
// public/admin-dashboard/design<id>/index.html, and both read the same sitemap from
// public/admin-dashboard/data.js.
const ADMIN_DESIGNS: AdminDesign[] = [
  {
    id: 1,
    title: "Dark Section Rail with Link Panel and Cards",
    description:
      "A slim dark rail for the three sections, a light panel with the links of the open section and their icons, and a card overview of each section that opens into the page with its tabs. The panel can be hidden, and a note beside it says the links are provisional.",
  },
  {
    id: 2,
    title: "Top Navbar with Sticky Left Sidebar",
    description:
      "A top navbar with the search in the middle and an Exit button, a left sidebar that stays in place with collapsible sections and icons, the page content centred under a header with its tabs, and a note beside the sidebar that the links are provisional.",
  },
];

const designUrl = (id: number) => `/admin-dashboard/design${id}/index.html`;

/** The Admin dashboard while the design is still being chosen: one card for each design option. */
export function AdminPage() {
  return (
    <div className="py-2">
      <h1 className="text-xl font-semibold text-brand-navy">Admin dashboard</h1>
      <p className="mb-4 mt-1 text-sm text-brand-navy/75">Choose a design option to view.</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {ADMIN_DESIGNS.map((design) => (
          <Card key={design.id} className="flex flex-col items-start gap-3">
            <h2 className="text-[15px] font-semibold">
              Design {design.id} — {design.title}
            </h2>
            <p className="text-xs leading-[1.7] text-brand-navy/60">{design.description}</p>
            <a
              href={designUrl(design.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-subtle"
            >
              View design
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
