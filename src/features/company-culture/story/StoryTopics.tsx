import type { Story } from "../data";

export function StoryTopics({ story }: { story: Story }) {
  return (
    <section aria-label="Topics" className="mt-9">
      <h2 className="mb-3 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-brand-navy/45">Topics</h2>
      <ul className="flex flex-wrap gap-2">
        {story.topics.map((topic) => (
          <li
            key={topic}
            className="rounded-md bg-surface-subtle px-2.5 py-[5px] text-xs font-semibold"
          >
            {topic}
          </li>
        ))}
      </ul>
    </section>
  );
}
