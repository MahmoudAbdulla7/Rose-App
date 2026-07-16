import BestSellingCarousel from '@/features/landing-page/components/best-selling-carousel';
import ProductCard from '@/features/landing-page/components/product-card';
import type { IProduct } from '@/shared/lib/types/product';

export interface IBestSellingProductsProps {
  products: IProduct[];
}

export default function BestSellingProducts({ products }: IBestSellingProductsProps) {
  return (
    <BestSellingCarousel className="mx-auto w-full max-w-4xl min-w-0 shrink-0 xl:mx-0">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="mx-auto max-w-80" />
      ))}
    </BestSellingCarousel>
  );
}
