import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "../../components/ui/Card";
import { NewsListItem } from "../../components/ui/NewsListItem";
import { PlaceholderImage } from "../../components/ui/PlaceholderImage";

const FEATURED_ARTICLES = [
  {
    title: "July is BIPOC Mental Health Awareness Month",
    excerpt:
      "Resources, events, and conversations across L+M this month — starting with Magellan Healthcare's toolkit for teams and managers.",
    meta: "Jul 2 · 4 min read",
  },
  {
    title: "Fun, Food, and Family at River Crossing",
    excerpt:
      "We held our second annual Family Day at River Crossing this past Saturday, and it was nothing short of a great time.",
    meta: "Sep 4 · 3 min read",
  },
  {
    title: "Q3 Town Hall: what to expect this Friday",
    excerpt:
      "All staff are invited to join leadership for a look back at Q2 and what's ahead for Q3 — plus live Q&A.",
    meta: "Jul 14 · 2 min read",
  },
];

const ARTICLES = [
  {
    category: "Builders",
    title: "Topping-out at the Bronx site: 312 affordable homes closer to move-in",
    meta: "Jul 8 · 3 min read",
  },
  {
    category: "Corporate Comms",
    title: "Q3 All-Hands: what to know before Friday",
    meta: "Jul 7 · 2 min read",
  },
  {
    category: "Operations",
    title: "How to finish your MFA setup in under five minutes",
    meta: "Jul 6 · 2 min read",
  },
  {
    category: "Workforce and Contractor Diversity",
    title: "WCD Team Engages with MWBE Firms at the 2026 Regional Opportunities Expo",
    meta: "Aug 31 · 4 min read",
  },
  {
    category: "Property Management",
    title: "Fulton Park Supports Students with Annual Book Bag Giveaway",
    meta: "Sep 2 · 2 min read",
  },
  {
    category: "Community Investment",
    title:
      "July Community Digest is out — Saratoga harvest photos, new childcare seats, and the fall volunteer day poll",
    meta: "Jul 6 · 2 min read",
  },
  {
    category: "Operations",
    title: "Benefits drop-in hours this week — 4th floor kitchen, Tuesdays and Thursdays",
    meta: "Jul 10 · 1 min read",
  },
  {
    category: "Builders",
    title: "Margaret Carestia shares topping-out ceremony photos from the Bronx site",
    meta: "Jul 8 · 2 min read",
  },
  {
    category: "HR Central",
    title: "How to finish your MFA setup in under five minutes: a follow-up walkthrough",
    meta: "Jul 12 · 2 min read",
  },
];

export function NewsSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 2700 })]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
      <div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {FEATURED_ARTICLES.map((article) => (
              <div key={article.title} className="min-w-0 shrink-0 grow-0 basis-full">
                <PlaceholderImage label="hero news photo" className="aspect-[16/10] w-full" />
                <h2 className="mt-3 font-serif text-xl font-bold text-brand-navy md:text-2xl">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-brand-navy/75">{article.excerpt}</p>
                <p className="mt-1 text-xs text-brand-navy/55">
                  {article.meta} ·{" "}
                  <a href="#" className="font-semibold text-brand-navy hover:underline">
                    Read the story →
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="border-t-[3px] border-t-brand-accent" />
        <Card className="mt-1 max-h-[520px] overflow-y-auto rounded-none border-0 px-0 pt-0 shadow-none md:px-0 md:pt-0">
          {ARTICLES.map((article) => (
            <NewsListItem key={article.title} {...article} />
          ))}
        </Card>
        <a
          href="#"
          className="mt-2 block text-right text-sm font-semibold text-brand-navy hover:underline"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}
