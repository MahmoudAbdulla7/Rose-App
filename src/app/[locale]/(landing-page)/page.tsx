import BestSellingSection from '@/features/landing-page/components/best-selling-section';
import PopularProductsSection from '@/features/landing-page/components/popular-products-section';

type LandingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="container flex flex-col gap-32 overflow-hidden py-8">
      <BestSellingSection />
      <PopularProductsSection searchParams={resolvedSearchParams} />
    </main>
  );
}
