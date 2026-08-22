'use client';

import { useTranslations } from 'next-intl';
import type * as React from 'react';

import { useCart } from '@/features/cart/hooks/use-cart';
import RelatedProductsCarousel from '@/features/products/components/related-products/related-products-carousel';
import EmptyState from '@/shared/components/empty-state';

export interface SuggestedProductsCarouselProps {
  title: string;
  items: { productId: string; node: React.ReactNode }[];
  limit: number;
}

export default function SuggestedProductsCarousel({
  title,
  items,
  limit,
}: SuggestedProductsCarouselProps) {
  // Translation
  const t = useTranslations('common');

  // Query
  const { data } = useCart();

  // Variables (derived)
  const cartProductIds = new Set(
    data?.status === true ? data.payload.cartItems.map((item) => item.productId) : [],
  );
  const visibleItems = items
    .filter((item) => !cartProductIds.has(item.productId))
    .slice(0, limit)
    .map((item) => item.node);

  return (
    <RelatedProductsCarousel
      title={title}
      emptyState={
        <EmptyState
          title={t('emptyState.title')}
          subtitle={t('emptyState.description', { entity: t('entities.products') })}
        />
      }
    >
      {visibleItems.length ? visibleItems : null}
    </RelatedProductsCarousel>
  );
}
