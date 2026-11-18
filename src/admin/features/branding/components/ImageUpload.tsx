import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface ImageUploadProps {
  title: string;
  /** What the image is used for. */
  description: string;
  /** Accepted file types and recommended size. */
  hint: string;
  /** File types the picker accepts. */
  accept: string;
  /** The image in use now. */
  current: string;
  /** Size of the preview image. */
  previewClass: string;
}

/** A card to upload or replace one image, with a preview. The file is only previewed, not saved yet. */
export function ImageUpload({ title, description, hint, accept, current, previewClass }: ImageUploadProps) {
  const input = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(current);

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-admin-line bg-white p-5 sm:flex-row sm:items-center">
      <div className="grid h-28 w-full shrink-0 place-items-center rounded-lg border border-dashed border-admin-line bg-admin-soft sm:w-56">
        {image ? <img src={image} alt={`${title} preview`} className={previewClass} /> : <span className="text-sm text-admin-muted">No image</span>}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-base font-bold">{title}</h2>
        <p className="mt-1 text-sm text-admin-muted">{description}</p>
        <p className="mt-1 text-xs text-admin-muted">{hint}</p>
        <div className="mt-4 flex gap-2">
          <input
            ref={input}
            type="file"
            accept={accept}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setImage(URL.createObjectURL(file));
            }}
            className="hidden"
          />
          <Button type="button" onClick={() => input.current?.click()}>
            {image ? "Replace" : "Upload"}
          </Button>
          {image && (
            <Button type="button" variant="secondary" onClick={() => setImage(null)}>
              Remove
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
