'use client';

import { ArrowRight, Check, Package, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { useQueryClient } from '@tanstack/react-query';

type CheckoutSuccessContentProps = {
  celebrateOrder?: boolean;
};

export default function CheckoutSuccessContent({
  celebrateOrder = false,
}: CheckoutSuccessContentProps) {
  const t = useTranslations('checkout');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!celebrateOrder) return;

    toast.success(t('orderSuccess'));
    queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
  }, [celebrateOrder, queryClient, t]);

  return (
    <section className="container my-8 px-4 md:my-16">
      <div
        role="status"
        className={cn(
          'relative isolate flex min-h-[min(32rem,calc(100dvh-12rem))] w-full flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-16 text-center',
          'from-ds-success-fade/40 via-ds-subtle to-ds-primary-fade/30 bg-linear-to-b',
          'dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900',
          'border-ds-border-soft border',
        )}
      >
        <div
          aria-hidden="true"
          className="bg-ds-success-fade/60 pointer-events-none absolute inset-s-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full blur-3xl rtl:translate-x-1/2"
        />
        <div
          aria-hidden="true"
          className="bg-ds-primary-fade/50 pointer-events-none absolute inset-e-1/4 -top-10 size-36 rounded-full blur-3xl"
        />

        <div className="relative mb-8">
          <div
            className={cn(
              'relative flex size-20 items-center justify-center rounded-full',
              'bg-ds-success-fade text-ds-success',
              'ring-ds-success-faint ring-8',
            )}
          >
            <Check strokeWidth={2} className="size-9" aria-hidden="true" />
          </div>
        </div>

        <div className="relative flex max-w-lg flex-col gap-3">
          <p className="text-ds-success/80 text-sm font-medium tracking-wide uppercase">
            {t('orderSuccess')}
          </p>
          <h1 className="text-ds-text-plain text-3xl font-semibold tracking-tight md:text-4xl">
            {t('checkoutSuccessTitle')}
          </h1>
          <p className="text-ds-text-muted text-lg leading-relaxed">
            {t('checkoutSuccessMessage')}
          </p>
        </div>

        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <span className="bg-ds-plain/70 border-ds-border-soft text-ds-text-default inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <Package className="text-ds-primary/70 size-4 shrink-0" aria-hidden="true" />
            {t('checkoutSuccessPreparing')}
          </span>
          <span className="bg-ds-plain/70 border-ds-border-soft text-ds-text-default inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <Truck className="text-ds-primary/70 size-4 shrink-0" aria-hidden="true" />
            {t('checkoutSuccessUpdates')}
          </span>
        </div>

        <div className="relative mt-10">
          <Button
            variant="primary"
            size="xl"
            className="rounded-2xl px-8"
            rightIcon={<ArrowRight className="size-4 rtl:rotate-180" />}
            render={<Link href="/" />}
          >
            {t('continueShopping')}
          </Button>
        </div>
      </div>
    </section>
  );
}
