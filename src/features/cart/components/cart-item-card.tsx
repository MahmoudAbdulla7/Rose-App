'use client';

import Image from 'next/image';
import { Star, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import QuantityStepper from '@/features/cart/components/quantity-stepper';
import { useDebouncedQuantityChange } from '@/features/cart/hooks/use-debounced-quantity-change';
import HoveredLink from '@/shared/components/hovered-link';
import { cn } from '@/shared/lib/utils';
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

const mobileActionTooltipClassName =
  'pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-64 -translate-x-1/2 rounded-lg bg-zinc-900 px-3 py-2 text-center text-xs font-medium text-white shadow-md opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100';

type MobileIconTooltipProps = {
  label: string;
  children: ReactNode;
};

function MobileIconTooltip({ label, children }: MobileIconTooltipProps) {
  return (
    <span className="group relative inline-flex md:hidden">
      {children}
      <span role="tooltip" className={mobileActionTooltipClassName}>
        {label}
      </span>
    </span>
  );
}

function CartItemPrice({ item, className }: { item: CartItem; className?: string }) {
  const t = useTranslations('cart');
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className={cn('flex min-w-0 flex-col gap-1', className)}>
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-ds-text-plain text-lg leading-none font-bold tabular-nums min-[480px]:text-xl md:text-2xl">
          {t('priceAmount', { price: lineTotal })}
        </span>
        <span className="text-ds-text-soft text-sm font-medium">{t('currency')}</span>
        {item.quantity > 1 ? (
          <span className="text-ds-text-default w-full text-xs font-medium min-[480px]:w-auto min-[480px]:text-sm">
            {t('quantityTimes', { quantity: item.quantity })}{' '}
            {t('priceAmount', { price: item.unitPrice })} {t('currency')}
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  isUpdating = false,
}: CartItemCardProps) {
  const t = useTranslations('cart');
  const tProduct = useTranslations('product');

  const {
    quantity,
    setQuantity,
    cancel: cancelPendingQuantity,
  } = useDebouncedQuantityChange({
    quantity: item.quantity,
    onCommit: (nextQuantity) => onQuantityChange(item.id, nextQuantity),
  });

  const handleRemove = () => {
    cancelPendingQuantity();
    onRemove(item.id);
  };

  const removeButtonProps = {
    onClick: handleRemove,
    disabled: isUpdating,
    'aria-label': t('remove'),
  };

  return (
    <article
      className={cn(
        'grid min-w-0 gap-x-3 gap-y-2.5 p-3',
        'grid-cols-[5rem_minmax(0,1fr)] grid-rows-[auto_auto_auto_auto]',
        'min-[400px]:grid-cols-[5.75rem_minmax(0,1fr)] min-[400px]:gap-x-4',
        'min-[480px]:gap-y-3 min-[480px]:p-4',
        'md:min-h-45 md:grid-cols-[7.25rem_minmax(0,1fr)_minmax(11rem,14rem)] md:grid-rows-[auto_auto_auto] md:gap-5',
        'lg:grid-cols-[7.25rem_minmax(0,1fr)_minmax(16rem,22rem)]',
        'first:rounded-t-2xl last:rounded-b-2xl',
      )}
    >
      <HoveredLink
        href={`/products/${item.productId}`}
        className={cn(
          'bg-ds-muted relative row-span-3 block shrink-0 self-start overflow-hidden rounded-md',
          'size-20 min-[400px]:size-23 min-[480px]:size-26 md:row-span-3 md:size-29',
          item.outOfStock && 'opacity-70',
        )}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={cn('object-cover', item.outOfStock && 'grayscale')}
          sizes="(max-width: 400px) 5rem, (max-width: 768px) 6.5rem, 7.25rem"
        />
      </HoveredLink>

      <div className="flex min-w-0 items-start justify-between gap-2 md:col-start-2 md:row-start-1">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {item.outOfStock ? (
            <span className="bg-ds-danger-fade text-ds-danger inline-flex w-fit items-center rounded-full px-2 py-1 text-xs leading-none font-medium">
              {t('outOfStock')}
            </span>
          ) : null}

          <HoveredLink href={`/products/${item.productId}`} className="min-w-0">
            <h2 className="text-ds-text-plain line-clamp-2 text-base leading-5 font-semibold min-[480px]:text-lg min-[480px]:leading-6 md:truncate md:text-xl md:leading-6">
              {item.title}
            </h2>
          </HoveredLink>
        </div>

        <MobileIconTooltip label={t('remove')}>
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            className="bg-ds-danger-fade text-ds-danger hover:bg-ds-danger-faint size-10 shrink-0"
            {...removeButtonProps}
          >
            <Trash2 className="size-4.5" strokeWidth={1.8} aria-hidden="true" />
          </Button>
        </MobileIconTooltip>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-1.5 md:col-start-2 md:row-start-2">
        <span className="bg-ds-warning-fade text-ds-text-plain inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-xs font-semibold min-[480px]:text-sm">
          <Star
            className="fill-ds-warning text-ds-warning size-3.5 min-[480px]:size-4"
            aria-hidden="true"
          />
          {tProduct('productDetails.ratingValue', {
            rating: item.rating,
            maxRating: 5,
          })}
        </span>
        <span className="text-ds-primary text-xs font-medium min-[480px]:text-sm">
          {tProduct('productDetails.ratingsCount', { count: item.ratingsCount })}
        </span>
      </div>

      <CartItemPrice
        item={{ ...item, quantity }}
        className="min-w-0 md:col-start-2 md:row-start-3 md:self-end"
      />

      <div className="col-span-2 flex min-w-0 items-center justify-between gap-3 md:hidden">
        <span className="text-ds-text-default text-sm font-medium">{t('quantity')}</span>
        <QuantityStepper
          quantity={quantity}
          maxStock={item.maxStock}
          disabled={item.outOfStock}
          isLoading={isUpdating}
          onQuantityChange={setQuantity}
          size="compact"
          fullWidth
          className="max-w-45 min-[480px]:max-w-52"
        />
      </div>

      <div className="hidden min-w-0 md:col-start-3 md:row-span-3 md:flex md:flex-col md:items-end md:justify-between md:gap-5 md:self-stretch">
        <Button
          type="button"
          variant="destructive"
          className="h-11 min-w-28 px-4 text-base"
          {...removeButtonProps}
          leftIcon={<Trash2 className="size-5" strokeWidth={1.8} aria-hidden="true" />}
        >
          {t('remove')}
        </Button>

        <QuantityStepper
          quantity={quantity}
          maxStock={item.maxStock}
          disabled={item.outOfStock}
          isLoading={isUpdating}
          onQuantityChange={setQuantity}
        />
      </div>
    </article>
  );
}
