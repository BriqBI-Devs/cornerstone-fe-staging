import { BookOpen, CalendarDays, Newspaper } from "lucide-react";
import { CreateDialog, type CreateGroup } from "@/admin/components/ui/CreateDialog";
import type { ContentType } from "../data";

/** The choices, grouped by kind as in the filter panel: a page (News or Company + Culture) or an event. Each id is a ContentType. */
const GROUPS: CreateGroup[] = [
  {
    title: "Page",
    options: [
      { id: "news", label: "News", hint: "An announcement or business update for employees.", icon: Newspaper },
      { id: "company_culture", label: "Company + Culture", hint: "A story about people, teams and milestones.", icon: BookOpen },
    ],
  },
  {
    title: "Event",
    options: [{ id: "event", label: "Event", hint: "Something with a date, time and place that people can attend.", icon: CalendarDays }],
  },
];

/** The "Create content" button and its popup. */
export function CreateContentMenu({ onCreate }: { onCreate?: (type: ContentType) => void }) {
  return <CreateDialog label="Create content" question="What would you like to publish?" groups={GROUPS} onCreate={(id) => onCreate?.(id as ContentType)} />;
}
