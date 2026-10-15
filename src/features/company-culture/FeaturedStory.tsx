import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { CategoryLabel } from "./CategoryLabel";
import { featuredStories, storyHref } from "./data";
import { formatStoryDate } from "./format";

export function FeaturedStory() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section aria-label="Featured stories">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {featuredStories.map((story) => (
            <div
              key={story.slug}
              className="relative grid min-w-0 shrink-0 grow-0 basis-full items-center gap-5 md:grid-cols-[1.1fr_1fr] md:gap-[clamp(24px,4vw,48px)]"
            >
              <div className="aspect-[16/11] overflow-hidden rounded-card bg-surface-subtle">
                <img src={story.image} alt={story.title} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-brand-navy/55">
                  <span className="h-[3px] w-[22px] bg-brand-accent" />
                  Featured story
                </p>
                <CategoryLabel categoryKey={story.categoryKey} className="mb-2" />
                <h2 className="mb-3 text-[clamp(22px,2.5vw,32px)] font-extrabold leading-[1.2] tracking-[-0.025em]">
                  <Link to={storyHref(story)} className="after:absolute after:inset-0 hover:text-brand-link">
                    {story.title}
                  </Link>
                </h2>
                <p className="mb-3.5 max-w-[520px] text-[15px] leading-[1.65] text-brand-navy/75">
                  {story.description}
                </p>
                <span className="text-xs text-brand-navy/55">{formatStoryDate(story.publishedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {featuredStories.map((story, i) => (
          <button
            key={story.slug}
            type="button"
            aria-label={`Show story ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === selectedIndex ? "w-6 bg-brand-navy" : "w-2 bg-brand-navy/25 hover:bg-brand-navy/50",
            )}
          />
        ))}
      </div>
    </section>
  );
}
