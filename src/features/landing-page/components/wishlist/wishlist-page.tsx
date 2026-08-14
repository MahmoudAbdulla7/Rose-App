'use client';

import { ArrowLeft, BrushCleaning, FolderHeart, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import ClearWishlistDialog from '@/features/landing-page/components/wishlist/clear-wishlist-dialog';
import WishlistItemCard from '@/features/landing-page/components/wishlist/wishlist-item-card';
import EmptyState from '@/shared/components/empty-state';
import HoveredLink from '@/shared/components/hovered-link';
import { useClearWishlist, useWishlist } from '@/shared/hooks';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';
import { cn } from '@/shared/lib/utils';
import { Button, buttonVariants } from '@/shared/ui/button';

type WishlistPageContentProps = {
  initialItems: IWishlistItem[];
};

export default function WishlistPageContent({ initialItems }: WishlistPageContentProps) {
  const t = useTranslations('common.wishlist');
  const commonT = useTranslations('common');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {
    data: wishlistData,
    isError: isWishlistError,
    isPending: isWishlistPending,
    refetch: refetchWishlist,
  } = useWishlist();
  const clearMutation = useClearWishlist();

  const wishlistItems = wishlistData?.payload.wishlistItems ?? initialItems;
  const isInitialLoading = isWishlistPending && !wishlistData && initialItems.length === 0;
  const showLoadError = isWishlistError && !wishlistData && initialItems.length === 0;

  const hasItems = wishlistItems.length > 0;
  const isClearing = clearMutation.isPending;

  const clearWishlist = async () => {
    try {
      await clearMutation.mutateAsync();
      setConfirmOpen(false);
    } catch {
      toast.error(commonT('error.networkError'));
    }
  };

  return (
    <main className="container flex min-h-[calc(100dvh-12rem)] flex-col gap-4 pt-8 pb-8 md:gap-5 md:pt-10">
      <header className="border-ds-border-subtle flex flex-col items-stretch justify-between gap-3 border-b pb-4 md:flex-row md:items-center md:gap-4 md:pb-5">
        <div className="flex min-w-0 items-end gap-2 md:gap-3">
          <FolderHeart
            className="text-ds-primary mb-1 size-10 shrink-0 sm:size-12"
            strokeWidth={1.2}
            aria-hidden="true"
          />
          <div className="flex min-w-0 flex-wrap items-end gap-x-2 gap-y-1 md:gap-x-3">
            <h1 className="text-ds-text-plain text-3xl leading-none font-bold sm:text-4xl">
              {t('title')}
            </h1>
            <span className="text-ds-text-default pb-1 text-sm leading-none">
              {t('itemCount', { count: wishlistItems.length })}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="destructive"
          disabled={!hasItems}
          onClick={() => setConfirmOpen(true)}
          leftIcon={<BrushCleaning className="size-4" strokeWidth={1.8} aria-hidden="true" />}
          className="h-10! w-full text-sm md:w-auto md:min-w-40"
        >
          {t('clear')}
        </Button>
      </header>

      {isInitialLoading ? (
        <section className="flex min-h-72 items-center justify-center" role="status">
          <Loader2 className="text-ds-primary size-8 animate-spin" aria-hidden="true" />
          <span className="sr-only">{commonT('button.loading')}</span>
        </section>
      ) : showLoadError ? (
        <EmptyState
          title={commonT('loadError.title', { entity: commonT('pages.wishlist') })}
          subtitle={commonT('loadError.subtitle', { entity: commonT('pages.wishlist') })}
        >
          <Button type="button" variant="primary" onClick={() => void refetchWishlist()}>
            {commonT('loadError.retry')}
          </Button>
        </EmptyState>
      ) : hasItems ? (
        <section className="flex flex-col gap-5" aria-label={t('itemsLabel')}>
          <div className="border-ds-border-subtle divide-ds-border-subtle bg-ds-plain divide-y rounded-lg border">
            {wishlistItems.map((item) => (
              <WishlistItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex w-full justify-start md:w-auto">
            <HoveredLink
              href="/products"
              className={cn(
                buttonVariants({ variant: 'primary' }),
                'h-11! w-full gap-2 text-sm sm:w-auto sm:min-w-52',
              )}
            >
              <ArrowLeft className="size-5 rtl:rotate-180" aria-hidden="true" />
              {t('continueShopping')}
            </HoveredLink>
          </div>
        </section>
      ) : (
        <EmptyState title={t('emptyTitle')} subtitle={t('emptyDescription')}>
          <HoveredLink
            href="/products"
            className={cn(
              buttonVariants({ variant: 'primary' }),
              'h-11! min-w-0 gap-2 px-4 text-sm sm:min-w-52',
            )}
          >
            <ArrowLeft className="size-5 rtl:rotate-180" aria-hidden="true" />
            {t('continueShopping')}
          </HoveredLink>
        </EmptyState>
      )}

      <ClearWishlistDialog
        open={confirmOpen}
        pending={isClearing}
        onOpenChange={setConfirmOpen}
        onConfirm={clearWishlist}
      />
    </main>
  );
}
