import { ArrowRight } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { PageHeaderBanner } from "../../components/ui/PageHeaderBanner";

/** The mockups in public/departments-page-designs, listed here until one is chosen and built. */
const DESIGNS = [
  { id: 1, name: "Tiles", description: "A tile for each department. Each opens its own page with the team lead beside the description." },
  { id: 2, name: "Directory table", description: "Departments and team leads in a table. Each opens its own page with one card holding the description and team lead." },
  { id: 3, name: "Side by side", description: "The department list on the left and the selected department on the right, all on one screen." },
  { id: 4, name: "Expanding list", description: "One simple list. Each department opens in place to show more." },
];

export function DepartmentsPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeaderBanner
        title="Departments"
        description="Four layout options for review. Open each one to compare them. All names, people and descriptions in them are sample content."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {DESIGNS.map((design) => (
          <Card key={design.id} className="flex flex-col border-2 border-brand-navy/40 p-7 shadow-md">
            <p className="mb-2 text-[13px] font-normal text-brand-navy/60">Design {design.id}</p>
            <h2 className="mb-2 text-[18px] font-semibold text-brand-navy">{design.name}</h2>
            <p className="mb-6 flex-1 text-[14px] font-normal leading-[1.6] text-brand-navy/70">{design.description}</p>
            {/* A plain link: the mockups are static files, not pages of this app. */}
            <a
              href={`/departments-page-designs/design${design.id}/index.html`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View design ${design.id}: ${design.name} (opens in a new tab)`}
              className="inline-flex w-fit items-center gap-2 rounded-md bg-brand-navy px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-brand-navy/85"
            >
              View design
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
