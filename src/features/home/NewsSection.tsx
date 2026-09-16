import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { NewsListItem } from "../../components/ui/NewsListItem";
import { PlaceholderImage } from "../../components/ui/PlaceholderImage";
import { cn } from "../../lib/cn";

const FEATURED_ARTICLES = [
  {
    title: "September is Suicide Prevention Awareness Month",
    excerpt:
      "Resources, events, and conversations across L+M this month — starting with Magellan Healthcare's toolkit for teams and managers.",
    meta: "Sep 2 · 4 min read",
  },
  {
    title: "Fun, Food, and Family at River Crossing",
    excerpt:
      "We held our second annual Family Day at River Crossing this past Saturday, and it was nothing short of a great time.",
    meta: "Sep 6 · 3 min read",
  },
  {
    title: "Q3 Town Hall: what to expect this Friday",
    excerpt:
      "All staff are invited to join leadership for a look back at Q2 and what's ahead for Q3 — plus live Q&A.",
    meta: "Sep 15 · 2 min read",
  },
  {
    title: "Safety Stand-Down: What Every Site Needs to Know",
    excerpt:
      "This Friday at 7:00 AM, every field site will pause for a company-wide safety stand-down — here's what to expect.",
    meta: "Sep 15 · 3 min read",
  },
  {
    title: "Meet the IT Team: MFA Rollout Office Hours",
    excerpt:
      "The MFA rollout completes this month — stop by walk-up help Tuesdays and Thursdays, 12–2, on the 4th floor kitchen.",
    meta: "Sep 10 · 2 min read",
  },
];

const ARTICLES = [
  {
    category: "Workiversaries",
    title: "This month's Workiversaries: Denise Ramirez (10 years) and Margaret Carestia (12 years)",
    meta: "Sep 9 · 1 min read",
  },
  {
    category: "New Hires",
    title: "Welcome Alex Kim, Priya Shah, Tomás Rivera, and Sarah Hunt — our September new hires",
    meta: "Sep 8 · 1 min read",
  },
  {
    category: "Your News and Photos",
    title: "The 12-foot snowman that stole the show after last winter's storm",
    meta: "Sep 5 · 2 min read",
  },
  {
    category: "Your News and Photos",
    title: "Fulton Park Supports Students with Annual Book Bag Giveaway",
    meta: "Sep 3 · 2 min read",
  },
  {
    category: "Company + Culture",
    title:
      "September Community Digest is out — Saratoga harvest photos, new childcare seats, and the fall volunteer day poll",
    meta: "Sep 7 · 2 min read",
  },
];

export function NewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 2700 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
      <div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {FEATURED_ARTICLES.map((article) => (
              <div key={article.title} className="min-w-0 shrink-0 grow-0 basis-full">
                <PlaceholderImage label="hero news photo" className="aspect-[16/10] w-full" />
                <h2 className="mt-3 text-xl font-bold text-brand-navy md:text-2xl">
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

        <div className="mt-3 flex justify-center gap-1.5">
          {FEATURED_ARTICLES.slice(0, 5).map((article, i) => (
            <button
              key={article.title}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                i === selectedIndex ? "bg-brand-navy" : "bg-brand-navy/25",
              )}
            />
          ))}
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
