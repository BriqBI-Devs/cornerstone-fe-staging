import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

const TOOLS = [
  { image: "outlook-img.png", label: "Outlook" },
  { image: "zoom-img.png", label: "Zoom" },
  { image: "copilot-img.png", label: "Copilot" },
  { image: "powerbi-img.png", label: "Power BI" },
  { image: "Salesforce-img.png", label: "Salesforce" },
  { image: "linkedin-img.png", label: "LinkedIn" },
  { image: "Canva-logo-img.png", label: "Canva" },
  { image: "monday-com-img.png", label: "Monday.com" },
];

export function QuickLinksTools() {
  return (
    <Card>
      <SectionHeading title="My tools + Quick links" />
      <div className="grid grid-cols-3 gap-3">
        {TOOLS.map(({ image, label }) => (
          <a
            key={label}
            href="#"
            className="group flex flex-col items-center gap-2 rounded-card border border-border p-3 text-center transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-card"
          >
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-white transition-transform group-hover:scale-105">
              <img
                src={`/cornerstone-assets/apps/${image}`}
                alt=""
                className="h-full w-full object-contain p-1.5"
              />
            </span>
            <span className="text-xs font-medium text-brand-navy">{label}</span>
          </a>
        ))}

        <a
          href="#"
          className="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-border p-3 text-center text-brand-navy/65 transition-all hover:-translate-y-0.5 hover:border-brand-navy/30 hover:text-brand-navy"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-subtle text-lg font-semibold">
            →
          </span>
          <span className="text-xs font-medium">More</span>
        </a>
      </div>
    </Card>
  );
}
