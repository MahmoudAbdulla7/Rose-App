'use client';

import Image from 'next/image';
import { Star, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import QuantityStepper from '@/features/cart/components/quantity-stepper';
import { Button } from '@/shared/ui/button';

export type CartItem = {
  id: string;
  productId: string;
  title: string;
  image: string;
  rating: number;
  ratingsCount: number;
  unitPrice: number;
  quantity: number;
  maxStock: number;
  outOfStock?: boolean;
};

type CartItemCardProps = {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isUpdating?: boolean;
};

export default function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  isUpdating = false,
}: CartItemCardProps) {
  // Translation
  const t = useTranslations('cart');
  const tProduct = useTranslations('product');

  return (
    <article className="flex flex-col gap-4 py-5 sm:flex-row sm:items-stretch sm:gap-5">
      {/* Product image */}
      <div className="bg-ds-muted relative size-28 shrink-0 overflow-hidden rounded-xl sm:size-32">
        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="8rem" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        {/* Title + rating + remove (top row) */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-2">
            <h2 className="text-ds-primary-saturated text-base font-semibold sm:text-lg">
              {item.title}
            </h2>

            <div className="flex flex-wrap items-center gap-1.5">
              <Star
                size={18}
                className="fill-ds-warning text-ds-warning shrink-0"
                aria-hidden="true"
              />
              <span className="text-ds-text-plain text-sm sm:text-base">
                {tProduct('productDetails.ratingLabel')}{' '}
                <span className="font-medium">
                  {tProduct('productDetails.ratingValue', {
                    rating: item.rating,
                    maxRating: 5,
                  })}
                </span>
              </span>
              <span className="text-ds-info text-sm font-medium underline underline-offset-2 sm:text-base">
                {tProduct('productDetails.ratingsCount', { count: item.ratingsCount })}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="shrink-0"
            onClick={() => onRemove(item.id)}
            disabled={isUpdating}
            leftIcon={<Trash2 />}
          >
            {t('remove')}
          </Button>
        </div>

        {/* Price + quantity stepper (bottom row) */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-ds-primary-saturated text-sm font-medium">
                {t('quantityTimes', { quantity: item.quantity })}
              </span>
              <span className="text-ds-text-plain text-base font-bold tabular-nums sm:text-lg">
                {t('priceAmount', { price: item.unitPrice })}
              </span>
              <span className="text-ds-text-soft text-sm font-medium">{t('currency')}</span>
            </p>

            {item.outOfStock ? (
              <p className="text-ds-danger text-sm font-medium">{t('outOfStock')}</p>
            ) : null}
          </div>

          <QuantityStepper
            quantity={item.quantity}
            maxStock={item.maxStock}
            disabled={item.outOfStock}
            isLoading={isUpdating}
            onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
          />
        </div>
      </div>
    </article>
  );
}
