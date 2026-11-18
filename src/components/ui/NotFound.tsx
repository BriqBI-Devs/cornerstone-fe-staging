import { Link, useLocation } from "react-router-dom";

/** Full-page 404 shown when no page matches the address. Inside /admin it links back to the admin home. */
export function NotFound() {
  const { pathname } = useLocation();
  const admin = pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle text-brand-navy">
      <header className="px-6 py-6 md:px-12">
        <Link to="/" aria-label="Cornerstone home">
          <img src="/cornerstone-assets/L+m-logo.avif" alt="L+M Development Partners" className="h-9 w-auto" />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-24 md:px-12">
        <p className="font-serif text-[clamp(6rem,22vw,13rem)] font-bold leading-none tracking-tight">
          404
          <span className="mt-4 block h-2 w-24 rounded-full bg-brand-accent" />
        </p>
        <h1 className="mt-10 text-3xl font-bold tracking-tight md:text-4xl">This page isn’t here.</h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-brand-navy/70">
          The link may be out of date, or the page may have moved. Head back and pick up from there.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link to={admin ? "/admin" : "/"} className="rounded-md bg-brand-navy px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-navy/90">
            {admin ? "Back to admin" : "Back to home"}
          </Link>
          {admin && (
            <Link to="/" className="text-base font-semibold text-brand-link hover:underline">
              Go to the site
            </Link>
          )}
        </div>
      </main>

      <footer className="px-6 py-6 text-sm text-brand-navy/55 md:px-12">L+M Development Partners · Cornerstone intranet</footer>
    </div>
  );
}
