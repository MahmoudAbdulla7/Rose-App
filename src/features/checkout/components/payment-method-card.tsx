'use client';

import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';

import type { PaymentMethodOption } from '../lib/types/checkout';

type PaymentMethodCardProps = {
  method: PaymentMethodOption;
  isSelected: boolean;
  onSelect: () => void;
};

export default function PaymentMethodCard({
  method,
  isSelected,
  onSelect,
}: PaymentMethodCardProps) {
  const t = useTranslations('checkout');

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex flex-1 cursor-pointer flex-col items-center gap-2.5 rounded-xl border border-zinc-200 p-4 transition-colors dark:border-zinc-700',
        isSelected
          ? 'bg-zinc-50 dark:bg-zinc-900'
          : 'bg-white hover:bg-zinc-50/50 dark:bg-zinc-900 dark:hover:bg-zinc-800',
      )}
    >
      <div className="flex size-48.75 shrink-0 items-center justify-center">
        <img
          src={method.icon}
          alt=""
          width={195}
          height={195}
          className="size-full object-contain brightness-0 dark:invert"
        />
      </div>
      <p
        className={cn(
          'text-2xl leading-none font-semibold',
          isSelected ? 'text-maroon-600' : 'text-zinc-800 dark:text-zinc-100',
        )}
      >
        {t(method.titleKey)}
      </p>
      <p className="text-center text-sm leading-normal font-semibold text-zinc-500 dark:text-zinc-400">
        {t(method.descriptionKey)}
      </p>
    </button>
  );
}
