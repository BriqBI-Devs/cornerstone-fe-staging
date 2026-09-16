import { Lightbulb } from "lucide-react";
import { Card } from "../../components/ui/Card";

export function FeedbackAndIdeas() {
  return (
    <Card className="flex h-full flex-col border-t-2 border-t-brand-accent bg-brand-navy text-white">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-brand-accent/20 text-brand-accent">
          <Lightbulb className="h-3.5 w-3.5" />
        </span>
        <p className="text-[15px] font-semibold text-white">Feedback and ideas</p>
      </div>
      <p className="text-sm text-white/70">
        We welcome your feedback about the intranet, as well as any story ideas you might have or
        news you'd like to share.
      </p>
      <a
        href="mailto:intranet@lmdevelopmentpartners.com?subject=Cornerstone%20Feedback"
        className="mt-auto w-fit self-start rounded-md bg-brand-accent px-3 py-1.5 text-sm font-medium text-brand-navy hover:bg-brand-accent/90"
      >
        Email the intranet team
      </a>
    </Card>
  );
}
