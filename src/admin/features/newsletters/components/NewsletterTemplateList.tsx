import { Button } from "@/components/ui/Button";
import { RowMenu } from "@/admin/components/ui/RowMenu";
import { NEWSLETTER_TEMPLATES } from "../data";

export function NewsletterTemplateList() {
  return (
    <div>
      <div className="mb-5 flex justify-end">
        <Button className="h-10 shrink-0 px-4">Create template</Button>
      </div>
      <ul className="divide-y divide-admin-line">
        {NEWSLETTER_TEMPLATES.map((template) => (
          <li key={template.name} className="flex items-center gap-3 py-3 first:pt-0">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{template.name}</p>
              <p className="mt-0.5 text-sm text-admin-muted">{template.description}</p>
            </div>
            <span className="hidden whitespace-nowrap text-sm text-admin-muted sm:block">{template.modified}</span>
            <RowMenu label={template.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
