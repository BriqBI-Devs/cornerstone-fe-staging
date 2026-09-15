import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const variants = {
  primary: "bg-brand-navy text-white hover:bg-brand-navy/90",
  secondary: "border border-border bg-surface text-brand-navy hover:bg-surface-subtle",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
