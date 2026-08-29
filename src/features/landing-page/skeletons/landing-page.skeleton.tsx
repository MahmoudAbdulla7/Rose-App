import BestSellingSectionSkeleton from '@/features/landing-page/skeletons/best-selling/best-selling-section.skeleton';
import FeaturesSkeleton from '@/features/landing-page/skeletons/features/features.skeleton';
import HeroSkeleton from '@/features/landing-page/skeletons/hero/hero.skeleton';
import AboutSkeleton from '@/features/landing-page/skeletons/home/about.skeleton';
import GallerySkeleton from '@/features/landing-page/skeletons/home/gallery.skeleton';
import PartnerSkeleton from '@/features/landing-page/skeletons/home/partner.skeleton';
import TestimonialsSkeleton from '@/features/landing-page/skeletons/home/testimonials.skeleton';
import PopularProductsSectionSkeleton from '@/features/landing-page/skeletons/popular-products/popular-products-section.skeleton';

export default function LandingPageSkeleton() {
  return (
    <main className="flex flex-col gap-16 overflow-x-hidden py-6 sm:gap-20 sm:py-8 md:gap-24 lg:gap-28 xl:gap-32">
      <div className="container flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-28 xl:gap-32">
        <HeroSkeleton />
        <FeaturesSkeleton />
        <BestSellingSectionSkeleton />
        <PopularProductsSectionSkeleton />
        <AboutSkeleton />
        <GallerySkeleton />
      </div>

      <TestimonialsSkeleton />

      <div className="container">
        <PartnerSkeleton />
      </div>
    </main>
  );
}
