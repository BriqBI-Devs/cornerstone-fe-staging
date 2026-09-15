import type { ReactNode } from "react";

export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-bold text-brand-navy">{title}</h2>
      {action}
    </div>
  );
}
