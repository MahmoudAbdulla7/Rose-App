import * as React from 'react';

import ProductCard from '@/features/landing-page/components/product/product-card';
import type { IProduct } from '@/shared/lib/types/product';
import { CarouselItem } from '@/shared/ui/carousel';
import RelatedProductsCarousel from './related-products-carousel';

export interface ProductsCarouselSectionProps {
  title: string;
  products: IProduct[];
  emptyState?: React.ReactNode;
  className?: string;
}

/** Server-renders one carousel slide — reusable by callers that filter slides on the client. */
export function renderProductCarouselItem(product: IProduct) {
  return (
    <CarouselItem key={product.id} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
      <ProductCard product={product} className="mx-auto max-w-80" />
    </CarouselItem>
  );
}

export default async function ProductsCarouselSection({
  title,
  products,
  emptyState,
  className,
}: ProductsCarouselSectionProps) {
  if (!products.length) {
    return emptyState ? <div className="w-full">{emptyState}</div> : null;
  }

  const items = products.map(renderProductCarouselItem);

  return (
    <RelatedProductsCarousel title={title} emptyState={emptyState} className={className}>
      {items}
    </RelatedProductsCarousel>
  );
}
