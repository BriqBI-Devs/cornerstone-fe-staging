import type { Story } from "../data";

export function StoryBody({ story }: { story: Story }) {
  return (
    <div className="space-y-[18px] text-[15px] leading-[1.7]">
      <p className="text-[17px] font-semibold">{story.description}</p>
      {story.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
