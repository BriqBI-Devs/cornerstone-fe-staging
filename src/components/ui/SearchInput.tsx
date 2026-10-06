import { Search } from "lucide-react";
import { cn } from "../../lib/cn";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  className,
  "aria-label": ariaLabel,
}: SearchInputProps) {
  return (
    <div className={cn("flex items-center gap-2 rounded-full bg-surface-subtle px-4 py-2", className)}>
      <Search className="h-4 w-4 shrink-0 text-brand-navy/50" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-brand-navy/50"
      />
    </div>
  );
}
