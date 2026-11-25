import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { CATEGORIES, CONTENT_TYPES, type ContentType } from "../data";

export function ContentCategories() {
  const [type, setType] = useState<ContentType>("company_culture");

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <select
          value={type}
          onChange={(event) => setType(event.target.value as ContentType)}
          aria-label="Content type"
          className="h-10 w-52 rounded-lg border border-admin-line bg-white px-3 text-sm outline-none focus:border-brand-link"
        >
          {CONTENT_TYPES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <Button className="h-10 shrink-0 px-4">Create category</Button>
      </div>
      <ul className="divide-y divide-admin-line">
        {CATEGORIES[type].map((category) => (
          <li key={category} className="flex items-center gap-3 py-3 first:pt-0">
            <span className="flex-1 font-semibold">{category}</span>
            <RowMenu label={category} />
          </li>
        ))}
      </ul>
    </div>
  );
}
