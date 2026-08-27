import { Suspense } from 'react';

import AboutSection from '@/features/landing-page/components/home/about';
import Gallery from '@/features/landing-page/components/home/gallery';
import CompaniesSection from '@/features/landing-page/components/home/partner';
import Testimonials from '@/features/landing-page/components/home/testimonials';
import BestSellingSection from '@/features/landing-page/components/best-selling/best-selling-section';
import Features from '@/features/landing-page/components/features';
import Hero from '@/features/landing-page/components/hero/hero';
import PopularProductsSection from '@/features/landing-page/components/popular-products/popular-products-section';
import BestSellingSectionSkeleton from '@/features/landing-page/skeletons/best-selling/best-selling-section.skeleton';
import FeaturesSkeleton from '@/features/landing-page/skeletons/features/features.skeleton';
import HeroSkeleton from '@/features/landing-page/skeletons/hero/hero.skeleton';
import AboutSkeleton from '@/features/landing-page/skeletons/home/about.skeleton';
import GallerySkeleton from '@/features/landing-page/skeletons/home/gallery.skeleton';
import PartnerSkeleton from '@/features/landing-page/skeletons/home/partner.skeleton';
import TestimonialsSkeleton from '@/features/landing-page/skeletons/home/testimonials.skeleton';
import PopularProductsSectionSkeleton from '@/features/landing-page/skeletons/popular-products/popular-products-section.skeleton';

type LandingPageProps = {
  searchParams: Promise<ISearchParams>;
};

export default function LandingPage({ searchParams }: LandingPageProps) {
  return (
    <main className="flex flex-col gap-16 overflow-x-hidden py-6 sm:gap-20 sm:py-8 md:gap-24 lg:gap-28 xl:gap-32">
      <div className="container flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-28 xl:gap-32">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<FeaturesSkeleton />}>
          <Features />
        </Suspense>

        <Suspense fallback={<BestSellingSectionSkeleton />}>
          <BestSellingSection />
        </Suspense>
        <Suspense fallback={<PopularProductsSectionSkeleton />}>
          <PopularProductsSection searchParams={searchParams} />
        </Suspense>

        <Suspense fallback={<AboutSkeleton />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<GallerySkeleton />}>
          <Gallery />
        </Suspense>
      </div>

      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>

      <div className="container">
        <Suspense fallback={<PartnerSkeleton />}>
          <CompaniesSection />
        </Suspense>
      </div>
    </main>
  );
}
