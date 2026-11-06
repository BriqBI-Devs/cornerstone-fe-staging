import { ArrowUpRight } from "lucide-react";
import { Card } from "../../components/ui/Card";

interface NewsDesign {
  id: number;
  /** Shown as "Design <id> — <title>" on the card. */
  title: string;
  /** What is different about this design, in a few lines. */
  description: string;
}

// The design options for the client to choose from. Each one is a set of static pages in
// public/news-page-designs/design<id>/ (a list page and a story page), and all of them read
// their stories from public/news-page-designs/data.js.
const NEWS_DESIGNS: NewsDesign[] = [
  {
    id: 1,
    title: "Fading Photo Hero with Filter Bar",
    description:
      "A wide photo hero that fades between the five top stories, with the headline on the photo, arrows and a progress line, a search and category dropdown bar, and a list with headlines, short summaries and thumbnails, plus a story page.",
  },
  {
    id: 2,
    title: "Photo with Numbered Headlines and Filter Sidebar",
    description:
      "A large photo beside a numbered list of the top stories that changes by itself, a left sidebar with a news search and a category list, and a list of stories with thumbnails, categories and dates, plus a story page.",
  },
  {
    id: 3,
    title: "Card Strip with Right Sidebar",
    description:
      "A strip of top-story cards, two in view, that scrolls by itself with arrows, a story list on the left with the search and category list in a sidebar on the right, and a story page.",
  },
  {
    id: 4,
    title: "Photo Reel with Plain Dropdown Filter",
    description:
      "A large photo reel with the next story peeking in, a counter and arrows, a search box on the left and a plain category dropdown on the right, a two-column list with thumbnails, headlines and dates, and a story page.",
  },
  {
    id: 5,
    title: "Peeking Card Strip with Numbered List",
    description:
      "A strip of top-story cards with the third one peeking in that scrolls by itself, a search box and plain category dropdown, a numbered list with thumbnails, headlines and dates, and a story page.",
  },
];

const designUrl = (id: number) => `/news-page-designs/design${id}/index.html`;

/** The News page while the design is still being chosen: one card for each design option. */
export function NewsPage() {
  return (
    <div className="py-2">
      <h1 className="sr-only">News page designs</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {NEWS_DESIGNS.map((design) => (
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
