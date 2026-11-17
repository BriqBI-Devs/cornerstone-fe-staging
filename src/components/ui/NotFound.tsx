import { Link } from "react-router-dom";

interface NotFoundProps {
  /** Where the button goes. */
  to?: string;
  /** Text on the button. */
  label?: string;
}

/** Shown when no page matches the address. */
export function NotFound({ to = "/", label = "Back to home" }: NotFoundProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold tracking-widest text-brand-navy/60">ERROR 404</p>
      <h1 className="mt-3 text-3xl font-bold text-brand-navy">Page not found</h1>
      <p className="mt-3 max-w-md text-base text-brand-navy/75">The page you are looking for doesn't exist or has been moved.</p>
      <Link to={to} className="mt-8 rounded-md bg-brand-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90">
        {label}
      </Link>
    </div>
  );
}
