import AboutSection from '@/features/landing-page/components/home/about';
import CompaniesSection from '@/features/landing-page/components/home/partner';
import Gallery from '@/features/landing-page/components/home/gallery';
import ProductCard from '@/features/landing-page/components/product-card';
import Testimonials from '@/features/landing-page/components/home/testimonials';
import { PRODUCT_CARD_DUMMY_DATA } from '@/features/landing-page/lib/constants/product.constant';
import ProductCardSkeleton from '@/features/landing-page/skeletons/product-card.skeleton';

export default async function LandingPage() {
  return (
    <div className="space-y-4 p-2">
      <ProductCard product={PRODUCT_CARD_DUMMY_DATA} />

      <ProductCardSkeleton />

      <AboutSection />

      <Gallery />

      <Testimonials />

      <CompaniesSection />
    </div>
  );
}
