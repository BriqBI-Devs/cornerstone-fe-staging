import { Card } from "../../components/ui/Card";
import { SectionHeading } from "../../components/ui/SectionHeading";

export function FeedbackAndIdeas() {
  return (
    <Card>
      <SectionHeading title="Feedback and Ideas" />
      <p className="text-sm text-brand-navy/75">
        We welcome your feedback about the intranet, as well as any story ideas you might have or
        news you'd like to share.
      </p>
      <p className="mt-2 text-sm text-brand-navy/75">
        To get in touch with the intranet team,{" "}
        <a
          href="mailto:intranet@lmdevelopmentpartners.com?subject=Cornerstone%20Feedback"
          className="text-brand-link hover:underline"
        >
          please email us
        </a>
        .
      </p>
    </Card>
  );
}
