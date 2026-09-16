import { Card } from "../../components/ui/Card";
import { PlaceholderImage } from "../../components/ui/PlaceholderImage";

const POSTS = [
  {
    text: "Proud to break ground on our newest affordable housing development in the Bronx.",
    date: "2d",
  },
  {
    text: "L+M was recognized this month for our commitment to workforce diversity.",
    date: "5d",
  },
];

export function LinkedInFeed() {
  return (
    <Card className="border-t-2 border-t-[#0A66C2]">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0A66C2] text-xs font-bold text-white">
          in
        </span>
        <p className="text-[15px] font-semibold text-brand-navy">Latest from LinkedIn</p>
      </div>
      <div className="space-y-3">
        {POSTS.map((post) => (
          <a
            key={post.text}
            href="#"
            className="-mx-2 flex items-center gap-3 rounded-card px-2 py-1.5 transition-colors hover:bg-surface-subtle"
          >
            <PlaceholderImage label="post" className="h-12 w-12 shrink-0" />
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm text-brand-navy">{post.text}</p>
              <p className="mt-0.5 text-xs text-brand-navy/55">{post.date} ago</p>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-brand-navy/45">
        Placeholder — pending confirmation of company-wide LinkedIn access
      </p>
    </Card>
  );
}
