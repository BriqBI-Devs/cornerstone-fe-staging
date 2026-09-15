import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const variants = {
  neutral: "bg-surface-subtle text-brand-navy border-border",
  accent: "bg-brand-accent/20 text-brand-navy border-brand-accent/40",
  info: "bg-brand-link/10 text-brand-link border-brand-link/30",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
