'use client';

import { ArrowLeft, BrushCleaning, FolderHeart, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import ClearWishlistDialog from '@/features/landing-page/components/wishlist/clear-wishlist-dialog';
import WishlistItemCard from '@/features/landing-page/components/wishlist/wishlist-item-card';
import EmptyState from '@/shared/components/empty-state';
import HoveredLink from '@/shared/components/hovered-link';
import { useRemoveFromWishlist } from '@/shared/hooks';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';

type WishlistPageContentProps = {
  initialItems: IWishlistItem[];
};

export default function WishlistPageContent({ initialItems }: WishlistPageContentProps) {
  const t = useTranslations('common.wishlist');
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState(initialItems);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const removeMutation = useRemoveFromWishlist();

  const hasItems = wishlistItems.length > 0;
  const isClearing = removeMutation.isPending;

  const clearWishlist = async () => {
    await Promise.all(
      wishlistItems.map((item) => removeMutation.mutateAsync({ productId: item.productId })),
    );
    setWishlistItems([]);
    setConfirmOpen(false);
    router.refresh();
  };

  const removeItem = (productId: string) => {
    setWishlistItems((items) => items.filter((item) => item.productId !== productId));
    router.refresh();
  };

  return (
    <main className="container flex min-h-[calc(100dvh-12rem)] flex-col pt-14 pb-10">
      <header className="border-ds-border-subtle flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div className="flex min-w-0 items-end gap-3">
          <FolderHeart
            className="mb-1 size-12 shrink-0 text-zinc-800 sm:size-14 dark:text-zinc-100"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <div className="flex min-w-0 flex-wrap items-end gap-x-3 gap-y-1">
            <h1 className="text-[2.625rem] leading-none font-bold text-zinc-800 sm:text-5xl dark:text-zinc-100">
              {t('title')}
            </h1>
            <span className="text-ds-text-default pb-1.5 text-base leading-none">
              {t('itemCount', { count: wishlistItems.length })}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={!hasItems}
          onClick={() => setConfirmOpen(true)}
          className="inline-flex h-11 min-w-45 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-base font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BrushCleaning className="size-5" strokeWidth={1.8} aria-hidden="true" />
          {t('clear')}
        </button>
      </header>

      {hasItems ? (
        <section className="flex flex-col" aria-label={t('itemsLabel')}>
          {wishlistItems.map((item) => (
            <WishlistItemCard key={item.id} item={item} onRemoved={removeItem} />
          ))}

          <div className="border-ds-border-subtle border-t pt-4">
            <HoveredLink
              href="/products"
              className="inline-flex h-12 min-w-58 items-center justify-center gap-3 rounded-lg bg-[#64151d] px-6 text-base font-medium text-white transition-colors hover:bg-[#511017]"
            >
              <ArrowLeft className="size-5 rtl:rotate-180" aria-hidden="true" />
              {t('continueShopping')}
            </HoveredLink>
          </div>
        </section>
      ) : (
        <EmptyState title={t('emptyTitle')} subtitle={t('emptyDescription')}>
          <Heart className="text-maroon-600 dark:text-soft-pink-300 size-6" aria-hidden="true" />
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
