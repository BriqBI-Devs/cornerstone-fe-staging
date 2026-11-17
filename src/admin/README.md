# Admin console (`src/admin`)

The admin console is part of this React app but kept apart from the employee site. It is laid out like the main
`src/` folder (`app`, `layouts`, `pages`, `features`, `components`), and is served at `/admin`. Only `index.ts` is
extra: it is the one door the employee site uses.

## Structure

```
src/admin/
  index.ts                     the only thing the employee site imports (adminRoutes)
  app/
    routes.tsx                 built pages are listed here; every other sitemap page uses /admin/:id[/:tab]
  layouts/
    AdminLayout, TopNav, AdminGuard
    sidebar/                   Sidebar, NavIcon, and the sitemap (data.ts, types.ts)
  pages/
    console/AdminPage.tsx      the page for any sitemap id: header band + content or placeholder
    <section>/<group>/<page>/  route-level pages, folders named like the sidebar (manage/content/news/ContentPage.tsx)
  features/
    <section>/<group>/<page>/  data.ts (or api.ts), types.ts, components/ for that page
  components/ui/               admin UI used by more than one page (PageHeader, PlaceholderPage, RowMenu)
```

Folders are the kebab-case of the sidebar section, group and page, so a page is easy to find from the sidebar. URLs stay
flat (`/admin/news`). Use the `@/` alias (= `src/`) for imports that leave a feature's own folder, for example
`@/components/ui/PlaceholderImage` or `@/admin/components/ui/RowMenu`.

## Rules (checked by `npm run lint`)

- `src/admin` may import only itself, `src/components/ui` and `src/lib`. Never `src/features`, `src/pages` or `src/layouts`.
- A feature (a `<section>/<group>/<page>` folder) must not import another feature. Put shared code in `components/` or `lib/`.
- The employee site may import only `src/admin/index.ts`.
- A feature's `api.ts` is the only place that stores or loads data (localStorage today, the backend later).
- Colors come from the `admin-*` tokens in `src/index.css`.

## Add a page

1. Add it to `layouts/sidebar/data.ts` (id, label, description, optional tabs, optional `action` for the header button). It already works with the placeholder.
2. Build the feature in `features/<section>/<group>/<page>/` (components, data.ts or api.ts, types.ts) and a thin
   default-exported page in `pages/<section>/<group>/<page>/`.
3. List it in `app/routes.tsx`, before the `:id` fallback. For a tab of a page that already has a route (like
   `application`), add a child: `{ path: "<tab>", lazy: ... }`. For a page with no tabs, add
   `{ path: "<id>", element: <AdminPage />, children: [{ index: true, lazy: ... }] }`.

## Still to do

- Real sign-in and roles: put the check in `layouts/AdminGuard.tsx`. Until then nobody is blocked.
- Replace each feature's localStorage `api.ts` with backend calls.
