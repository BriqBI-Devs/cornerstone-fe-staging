import type { Story } from "../data";

export function StoryHero({ story }: { story: Story }) {
  return (
    <figure>
      <div className="aspect-video overflow-hidden rounded-lg bg-surface-subtle">
        <img src={story.image} alt={story.title} className="h-full w-full object-cover" />
      </div>
      <figcaption className="mb-8 mt-2.5 text-[12.5px] text-brand-navy/45">{story.title}</figcaption>
    </figure>
  );
}
