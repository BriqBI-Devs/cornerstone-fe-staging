import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { NEWSLETTER_CATEGORIES } from "../data";

export function NewsletterCategoryList() {
  return (
    <div>
      <div className="mb-5 flex justify-end">
        <Button className="h-10 shrink-0 px-4">Create category</Button>
      </div>
      <ul className="divide-y divide-admin-line">
        {NEWSLETTER_CATEGORIES.map((category) => (
          <li key={category} className="flex items-center gap-3 py-3 first:pt-0">
            <span className="flex-1 font-semibold">{category}</span>
            <RowMenu label={category} />
          </li>
        ))}
      </ul>
    </div>
  );
}
