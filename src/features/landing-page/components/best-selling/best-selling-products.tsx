import dynamic from 'next/dynamic';
import { isBestSellingCarouselImagePriority } from '@/features/landing-page/lib/constants/best-selling-constant';
import ProductCard from '@/features/landing-page/components/product/product-card';
import type { IProduct } from '@/shared/lib/types/product';

const BestSellingCarousel = dynamic(
  () => import('@/features/landing-page/components/best-selling/best-selling-carousel'),
);

export interface IBestSellingProductsProps {
  products: IProduct[];
}

export default function BestSellingProducts({ products }: IBestSellingProductsProps) {
  return (
    <BestSellingCarousel className="mx-auto w-full max-w-4xl min-w-0 shrink-0 xl:mx-0">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          className="mx-auto max-w-80"
          priority={isBestSellingCarouselImagePriority(index)}
        />
      ))}
    </BestSellingCarousel>
  );
}
