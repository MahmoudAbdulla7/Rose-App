'use client';

import { Loader2, Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type ChangeEvent, type FocusEvent } from 'react';

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
  // Translation
  const t = useTranslations('cart');

  // Variables
  const isCompact = size === 'compact';
  const isInteractiveDisabled = disabled || isLoading;
  const stockLimit = Number.isFinite(maxStock) ? Math.max(0, Math.floor(maxStock)) : 0;
  const isAtMin = quantity <= 1;
  const isAtMax = quantity >= stockLimit;
  const [draft, setDraft] = useState<string | null>(null);
  const inputValue = draft ?? String(quantity);

  useEffect(() => {
    setDraft((current) => {
      if (current === null || current === '') return current;

      const parsed = Number(current);
      if (!Number.isNaN(parsed) && Math.floor(parsed) === quantity) return current;

      return null;
    });
  }, [quantity]);

  const clampQuantity = (value: number) => Math.min(stockLimit, Math.max(1, Math.floor(value)));

  const commitQuantity = (nextQuantity: number) => {
    setDraft(null);
    if (nextQuantity !== quantity) {
      onQuantityChange(nextQuantity);
    }
  };

  // Functions
  // Quantity cannot go below 1. Minus at 1 is a no-op; deleting a line uses
  // the Remove control, not quantity 0 (ticket Option B).
  const handleDecrease = () => {
    if (isInteractiveDisabled || isAtMin) return;
    commitQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (isInteractiveDisabled || isAtMax) return;
    commitQuantity(quantity + 1);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isInteractiveDisabled) return;

    const nextValue = event.target.value;
    setDraft(nextValue);

    if (nextValue === '') return;

    const parsed = Number(nextValue);
    if (Number.isNaN(parsed)) return;

    const clamped = clampQuantity(parsed);
    if (clamped !== quantity) {
      onQuantityChange(clamped);
    }
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (isInteractiveDisabled) return;

    const parsed = Number(event.target.value);
    if (event.target.value === '' || Number.isNaN(parsed)) {
      setDraft(null);
      return;
    }

    commitQuantity(clampQuantity(parsed));
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
        disabled={isInteractiveDisabled || isAtMin}
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
          max={stockLimit}
          value={inputValue}
          disabled={isInteractiveDisabled}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
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
        disabled={isInteractiveDisabled || isAtMax}
        aria-label={isAtMax ? t('maxStockReached', { count: stockLimit }) : t('increaseQuantity')}
        className={isCompact ? 'size-8 shrink-0' : undefined}
      >
        <Plus className={isCompact ? 'size-3.5' : undefined} />
      </Button>
    </div>
  );
}
