import ComingSoonPage from '@/features/landing-page/components/coming-soon-page';
import type { Locale } from 'next-intl';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  return <ComingSoonPage locale={locale as Locale} titleKey="about" />;
}
