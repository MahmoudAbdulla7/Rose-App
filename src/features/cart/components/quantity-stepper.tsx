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
  size?: 'default' | 'compact';
  fullWidth?: boolean;
};

export default function QuantityStepper({
  quantity,
  maxStock,
  onQuantityChange,
  disabled = false,
  isLoading = false,
  className,
  size = 'default',
  fullWidth = false,
}: QuantityStepperProps) {
  const t = useTranslations('cart');

  const isCompact = size === 'compact';
  const isInteractiveDisabled = disabled || isLoading;

  const handleDecrease = () => {
    if (isInteractiveDisabled || quantity <= 1) return;
    onQuantityChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (isInteractiveDisabled || quantity >= maxStock) return;
    onQuantityChange(quantity + 1);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isInteractiveDisabled) return;

    const nextValue = Number(event.target.value);
    if (Number.isNaN(nextValue)) return;

    const clamped = Math.min(maxStock, Math.max(1, Math.floor(nextValue)));
    if (clamped !== quantity) {
      onQuantityChange(clamped);
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center',
        isCompact ? 'gap-2' : 'gap-2.5',
        fullWidth && 'w-full justify-between',
        disabled && 'opacity-50',
        className,
      )}
      aria-busy={isLoading}
    >
      <Button
        type="button"
        variant="secondary"
        size={isCompact ? 'icon-sm' : 'icon-lg'}
        onClick={handleDecrease}
        disabled={isInteractiveDisabled || quantity <= 1}
        aria-label={t('decreaseQuantity')}
        className={isCompact ? 'size-8 shrink-0' : undefined}
      >
        <Minus className={isCompact ? 'size-3.5' : undefined} />
      </Button>

      <div className={cn('relative', isCompact ? 'w-16 min-[480px]:w-20' : 'w-28')}>
        <Input
          type="number"
          inputMode="numeric"
          min={1}
          max={maxStock}
          value={quantity}
          disabled={isInteractiveDisabled}
          onChange={handleInputChange}
          aria-label={t('quantityTimes', { quantity })}
          wrapperClassName="w-full"
          className={cn(
            'text-center font-medium tabular-nums',
            isCompact && 'h-8 px-2 text-sm',
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            isLoading && 'text-transparent',
          )}
        />

        {isLoading ? (
          <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <Loader2
              className={cn('text-ds-primary animate-spin', isCompact ? 'size-3.5' : 'size-4')}
              aria-hidden="true"
            />
            <span className="sr-only">{t('updatingQuantity')}</span>
          </span>
        ) : null}
      </div>

      <Button
        type="button"
        variant="secondary"
        size={isCompact ? 'icon-sm' : 'icon-lg'}
        onClick={handleIncrease}
        disabled={isInteractiveDisabled || quantity >= maxStock}
        aria-label={t('increaseQuantity')}
        className={isCompact ? 'size-8 shrink-0' : undefined}
      >
        <Plus className={isCompact ? 'size-3.5' : undefined} />
      </Button>
    </div>
  );
}
