import { Button } from "@/components/ui/Button";

const inputClass = "h-10 w-full rounded-lg border border-admin-line bg-white px-3 text-sm font-normal outline-none focus:border-brand-link";

// Static for now: the text each page shows in its banner today.
const PAGES = [
  {
    name: "News",
    path: "/news",
    eyebrow: "Archive",
    title: "News",
    description: "Announcements and updates from across L+M. Search or filter to find what you need.",
  },
  {
    name: "Company + Culture",
    path: "/company-culture",
    eyebrow: "",
    title: "Company + Culture",
    description: "Workiversaries, welcomes, team milestones, and the stories that make L+M feel like home, across every office and every team.",
  },
  {
    name: "Events",
    path: "/events",
    eyebrow: "Cornerstone Events",
    title: "Find something to join",
    description: "Gatherings, learning sessions and chances to connect. Switch between the calendar and a simple list.",
  },
  {
    name: "People",
    path: "/people",
    eyebrow: "Directory",
    title: "People",
    description: "Find colleagues, see where they sit, and open their profile.",
  },
  {
    name: "Policies + Resources",
    path: "/policies-resources",
    eyebrow: "",
    title: "Policies + Resources",
    description: "Help centers, brand resources, and the policies that keep L+M running — HR, safety, IT, and facilities guidance in one place.",
  },
];

export function PageHeaderSettings() {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="grid gap-5">
      {PAGES.map((page) => (
        <section key={page.path} aria-label={`${page.name} page header`} className="rounded-xl border border-admin-line bg-white">
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-admin-line px-5 py-3.5">
            <h3 className="text-base font-bold">{page.name} page</h3>
            <span className="rounded-full bg-admin-soft px-2.5 py-0.5 text-xs font-medium text-admin-muted">{page.path}</span>
          </header>
          <div className="grid gap-4 p-5">
            <label className="grid content-start gap-1.5 text-sm font-semibold">
              Title
              <input defaultValue={page.title} className={inputClass} />
              <span className="text-xs font-normal text-admin-muted">The large heading in the banner. Does not change the menu link.</span>
            </label>
            <label className="grid content-start gap-1.5 text-sm font-semibold">
              Small title
              <input defaultValue={page.eyebrow} placeholder="None" className={inputClass} />
              <span className="text-xs font-normal text-admin-muted">The short label above the title. Leave empty to hide it.</span>
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Description
              <textarea
                defaultValue={page.description}
                rows={2}
                className="w-full rounded-lg border border-admin-line bg-white px-3 py-2 text-sm font-normal outline-none focus:border-brand-link"
              />
            </label>
          </div>
        </section>
      ))}

      <Button type="submit" className="justify-self-end">
        Save
      </Button>
    </form>
  );
}
