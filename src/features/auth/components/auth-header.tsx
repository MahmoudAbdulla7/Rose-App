import { Separator } from '@/shared/ui/separator';

type AuthHeaderProps = {
  title: string;
  subtitle?: string;
  description: string;
};

export default function AuthHeader({ title, subtitle, description }: AuthHeaderProps) {
  return (
    <>
      <h1 className="text-ds-text-plain text-3xl font-bold">{title}</h1>
      <h2 className="text-ds-primary text-xl font-semibold">{subtitle}</h2>
      <p>{description}</p>
      <Separator className="mt-4 mb-6" />
    </>
  );
}
