import { ChevronRight } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import type { TileContent, TileDef } from "./TileGrid";

/** A titled list of links. */
function LinkListCard({ title, links }: TileContent) {
  return (
    <Card>
      <SectionHeading title={title} />
      <ul className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2">
        {links.map(({ label, href }, i) => (
          <li key={i}>
            <a
              href={href}
              {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-center gap-3 rounded-card border border-border px-4 py-3.5 text-[15px] text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-surface-subtle"
            >
              <span className="flex-1 font-medium">{label}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-brand-navy/30 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-navy/60" />
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** A tile that is a titled list of links; with `editable` false the links stay fixed and there is no Edit button. */
export const linkListTile = (title: string, layout: TileDef["layout"], labels: string[], editable = true): TileDef => {
  const content = { title, links: labels.map((label) => ({ label, href: "#" })) };
  return { layout, content: editable ? content : undefined, render: (saved) => <LinkListCard {...(editable ? saved : content)} /> };
};

/** The card added by "Add card" in edit mode. */
export const NEW_CARD = linkListTile("New link list", { x: 0, y: 0, w: 3 }, ["Example link"]);
