/** Left-hand list of options inside a settings tab. */
export function SettingsNav({
  options,
  active,
  onSelect,
}: {
  options: { id: string; label: string }[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="flex gap-4 md:flex-col md:gap-1" aria-label="Settings options">
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={`rounded-lg border px-3 py-2 text-left text-sm ${
            active === id
              ? "border-brand-navy font-semibold text-brand-navy"
              : "border-transparent text-admin-muted hover:text-brand-navy"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
