import { RowMenu } from "@/admin/components/ui/RowMenu";
import { CATEGORIES } from "../data";

export function CategoryList() {
  return (
    <ul className="divide-y divide-admin-line">
      {CATEGORIES.map((category) => (
        <li key={category} className="flex items-center gap-3 py-3 first:pt-0">
          <span className="flex-1 font-semibold">{category}</span>
          <RowMenu label={category} />
        </li>
      ))}
    </ul>
  );
}
