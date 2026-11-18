import { ImageUpload } from "../../features/branding/components/ImageUpload";

export default function LogoPage() {
  return (
    <div className="grid gap-5">
      <ImageUpload
        title="Logo"
        description="The logo shown at the top left of every page."
        hint="PNG, SVG or AVIF. Recommended 400 × 100 px, up to 2 MB."
        accept="image/png,image/svg+xml,image/avif"
        current="/cornerstone-assets/L+m-logo.avif"
        previewClass="max-h-14 max-w-full object-contain"
      />
      <ImageUpload
        title="Favicon"
        description="The small icon shown in the browser tab."
        hint="ICO, PNG or SVG. Square, at least 32 × 32 px."
        accept="image/x-icon,image/png,image/svg+xml"
        current="/favicon.svg"
        previewClass="size-12 object-contain"
      />
    </div>
  );
}
