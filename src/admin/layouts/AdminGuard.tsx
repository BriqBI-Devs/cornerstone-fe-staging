import type { ReactNode } from "react";

/** Keeps non-admins out; nobody is blocked until sign-in exists, so put the real role check here. */
export function AdminGuard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
