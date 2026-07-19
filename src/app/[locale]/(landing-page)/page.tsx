import BestSellingSection from '@/features/landing-page/components/best-selling/best-selling-section';
import Features from '@/features/landing-page/components/features';
import Hero from '@/features/landing-page/components/hero/hero';
import PopularProductsSection from '@/features/landing-page/components/popular-products/popular-products-section';

type LandingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="container flex flex-col gap-32 overflow-hidden py-8">
      <Hero />
      <Features />
      <BestSellingSection />
      <PopularProductsSection searchParams={resolvedSearchParams} />
    </main>
  );
}
