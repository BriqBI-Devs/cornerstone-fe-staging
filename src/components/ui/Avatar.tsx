import { cn } from "../../lib/cn";

export function Avatar({
  name,
  size = "md",
  className,
  src,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** A photo; without one the person's initials are shown. */
  src?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizes = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
  };

  if (src) {
    return <img src={src} alt="" title={name} className={cn("shrink-0 rounded-full object-cover", sizes[size], className)} />;
  }

  const palette = ["bg-brand-navy", "bg-amber-700", "bg-teal-700", "bg-rose-700", "bg-violet-700"];
  const hash = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const tone = palette[hash % palette.length];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        tone,
        sizes[size],
        className,
      )}
      title={name}
    >
      {initials}
    </div>
  );
}
