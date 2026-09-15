import { Card } from "../../components/ui/Card";

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <Card className="flex min-h-[300px] flex-col items-center justify-center text-center">
      <h1 className="text-xl font-semibold text-brand-navy">{title}</h1>
      <p className="mt-2 text-sm text-brand-navy/75">Coming soon</p>
    </Card>
  );
}
