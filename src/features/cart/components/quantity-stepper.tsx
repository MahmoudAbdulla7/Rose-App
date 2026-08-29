'use client';

import { Loader2, Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type QuantityStepperProps = {
  quantity: number;
  maxStock: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

export default function QuantityStepper({
  quantity,
  maxStock,
  onQuantityChange,
  disabled = false,
  isLoading = false,
  className,
}: QuantityStepperProps) {
  // Translation
  const t = useTranslations('cart');

  // Variables
  const isInteractiveDisabled = disabled || isLoading;
  const stockLimit = Number.isFinite(maxStock) ? Math.max(0, Math.floor(maxStock)) : 0;
  const isAtMin = quantity <= 1;
  const isAtMax = quantity >= stockLimit;

  // Functions
  // Quantity cannot go below 1. Minus at 1 is a no-op; deleting a line uses
  // the Remove control, not quantity 0 (ticket Option B).
  const handleDecrease = () => {
    if (isInteractiveDisabled || isAtMin) return;
    onQuantityChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (isInteractiveDisabled || isAtMax) return;
    onQuantityChange(quantity + 1);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isInteractiveDisabled) return;

    const nextValue = Number(event.target.value);
    if (Number.isNaN(nextValue)) return;

    // Clamp between 1 and available stock
    const clamped = Math.min(stockLimit, Math.max(1, Math.floor(nextValue)));
    if (clamped !== quantity) {
      onQuantityChange(clamped);
    }
  };

  return (
    <div
      className={cn('inline-flex items-center gap-2.5', disabled && 'opacity-50', className)}
      aria-busy={isLoading}
    >
      <Button
        type="button"
        variant="secondary"
        size="icon-lg"
        onClick={handleDecrease}
        disabled={isInteractiveDisabled || isAtMin}
        aria-label={t('decreaseQuantity')}
      >
        <Minus />
      </Button>

      <div className="relative w-28">
        <Input
          type="number"
          inputMode="numeric"
          min={1}
          max={stockLimit}
          value={quantity}
          disabled={isInteractiveDisabled}
          onChange={handleInputChange}
          aria-label={t('quantityTimes', { quantity })}
          wrapperClassName="w-full"
          className={cn(
            'text-center font-medium tabular-nums',
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            isLoading && 'text-transparent',
          )}
        />

        {/* Centered loader while PATCH is in flight */}
        {isLoading ? (
          <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <Loader2 className="text-ds-primary size-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">{t('updatingQuantity')}</span>
          </span>
        ) : null}
      </div>

      <Button
        type="button"
        variant="secondary"
        size="icon-lg"
        onClick={handleIncrease}
        disabled={isInteractiveDisabled || isAtMax}
        aria-label={isAtMax ? t('maxStockReached', { count: stockLimit }) : t('increaseQuantity')}
      >
        <Plus />
      </Button>
    </div>
  );
}
