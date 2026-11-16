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
  layouts/                     AdminLayout, TopNav, Sidebar, AdminGuard
  pages/
    console/AdminPage.tsx      the page for any sitemap id: header band + content or placeholder
    profile-fields/            route-level page for each built feature
  features/
    navigation/                the sitemap (data.ts, types.ts) and PageHeader, NavIcon
    profile-fields/            api.ts, types.ts, components/
  components/ui/               admin UI used by more than one feature (PlaceholderPage)
```

## Rules (checked by `npm run lint`)

- `src/admin` may import only itself, `src/components/ui` and `src/lib`. Never `src/features`, `src/pages` or `src/layouts`.
- A feature must not import another feature. Put shared code in `components/` or `lib/`.
- The employee site may import only `src/admin/index.ts`.
- A feature's `api.ts` is the only place that stores or loads data (localStorage today, the backend later).
- Colors come from the `admin-*` tokens in `src/index.css`.

## Add a page

1. Add it to `features/navigation/data.ts` (id, label, description, optional tabs). It already works with the placeholder.
2. Build the feature in `features/<name>/` (components, api.ts, types.ts) and a thin default-exported page in `pages/<name>/`.
   Read the open tab with `useParams().tab`.
3. List it in `app/routes.tsx`, before the `:id` fallback. For a tab of a page that already has a route (like
   `application`), add a child: `{ path: "<tab>", lazy: ... }`. For a page with no tabs, add
   `{ path: "<id>", element: <AdminPage />, children: [{ index: true, lazy: ... }] }`.

## Still to do

- Real sign-in and roles: put the check in `layouts/AdminGuard.tsx`. Until then nobody is blocked.
- Replace each feature's localStorage `api.ts` with backend calls.
