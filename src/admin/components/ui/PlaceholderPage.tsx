/** The content of every admin page until it is built from the backend requirements. */
export function PlaceholderPage({ heading, pageLabel }: { heading: string; pageLabel: string }) {
  return (
    <div className="grid min-h-[280px] place-content-center justify-items-center gap-2 rounded-xl border border-dashed border-admin-line bg-admin-soft px-6 py-10 text-center">
      <b className="text-base">{heading}</b>
      <p className="max-w-[460px] text-sm leading-relaxed text-admin-muted">
        The “{pageLabel}” configurable content will appear here. We will start building it according to the backend requirements.
      </p>
      <span className="mt-2 rounded-full bg-admin-tint px-3 py-1 text-xs font-semibold text-admin-tint-ink">Awaiting backend requirements</span>
    </div>
  );
}
