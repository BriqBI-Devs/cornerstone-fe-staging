# Admin console (`src/admin`)

The admin console is part of this React app but kept apart from the employee site, and is served at `/admin`. Only
`index.ts` is the door the employee site uses.

## Structure

```
src/admin/
  index.ts                     the only thing the employee site imports (adminRoutes)
  app/
    routes.tsx                 built pages are listed here; every other sitemap page uses /admin/:id[/:tab]
  layouts/
    AdminLayout, AdminPage, TopNav, AdminGuard     AdminPage draws the header band and the page content
    sidebar/                   Sidebar, NavIcon, and the sitemap (data.ts, types.ts)
  pages/
    <name>/                    thin route-level pages, one file per tab (news/ContentPage.tsx), like src/pages
  features/
    <name>/                    what the pages are built from, like src/features:
      components/              the page's UI
      data.ts (or api.ts)      the only place that loads or stores the feature's data
      types.ts
  components/ui/               admin UI used by more than one feature (PageHeader, PlaceholderPage, RowMenu)
```

This mirrors the employee site: `pages/<name>` holds the route files and `features/<name>` holds the components and data.
Both folders are named like the page's URL (`/admin/news` is `pages/news` and `features/news`), so moving a page in the
sidebar never moves code. Use the `@/` alias (= `src/`) for imports that leave a feature's own folder, for example
`@/components/ui/PlaceholderImage` or `@/admin/components/ui/RowMenu`.

## Rules (checked by `npm run lint`)

- `src/admin` may import only itself, `src/components/ui` and `src/lib`. Never `src/features`, `src/pages` or `src/layouts`.
- A page or feature must not import another name’s page or feature (`news` cannot import `company-culture`). Put shared code in `components/`.
- The employee site may import only `src/admin/index.ts`.
- A feature's `api.ts` (or `data.ts` while it is sample data) is the only place that loads or stores its data.
- Colors come from the `admin-*` tokens in `src/index.css`.

## Add a page

1. Add it to `layouts/sidebar/data.ts` (id, label, optional tabs). It already works with the placeholder.
2. Build the UI in `features/<name>/` (`components/`, `data.ts`) and a thin default-exported page per tab in
   `pages/<name>/`. Put the Create button in the list's own toolbar so it can open that feature's form.
3. List it in `app/routes.tsx`, before the `:id` fallback. For a page with tabs, add a child per tab:
   `{ path: "<tab>", ...page(() => import("../pages/<name>/<Page>")) }`. For a page with no tabs, add
   `{ path: "<id>", element: <AdminPage />, children: [{ index: true, lazy: ... }] }`.

## Still to do

- Real sign-in and roles: put the check in `layouts/AdminGuard.tsx`. Until then nobody is blocked.
- Replace each feature's sample data with backend calls.
