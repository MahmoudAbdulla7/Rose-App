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
import { cn } from '@/shared/lib/utils';
import { Button, buttonVariants } from '@/shared/ui/button';

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
    <main className="container flex min-h-[calc(100dvh-12rem)] flex-col gap-6 pt-14 pb-10">
      <header className="border-ds-border-subtle flex flex-wrap items-center justify-between gap-4 border-b pb-5">
        <div className="flex min-w-0 items-end gap-3">
          <FolderHeart
            className="text-ds-primary mb-1 size-12 shrink-0 sm:size-14"
            strokeWidth={1.2}
            aria-hidden="true"
          />
          <div className="flex min-w-0 flex-wrap items-end gap-x-3 gap-y-1">
            <h1 className="text-ds-text-plain text-[2.625rem] leading-none font-bold sm:text-5xl">
              {t('title')}
            </h1>
            <span className="text-ds-text-default pb-1.5 text-base leading-none">
              {t('itemCount', { count: wishlistItems.length })}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="destructive"
          disabled={!hasItems}
          onClick={() => setConfirmOpen(true)}
          leftIcon={<BrushCleaning className="size-5" strokeWidth={1.8} aria-hidden="true" />}
          className="h-11 min-w-45 text-base"
        >
          {t('clear')}
        </Button>
      </header>

      {hasItems ? (
        <section className="flex flex-col gap-5" aria-label={t('itemsLabel')}>
          <div className="border-ds-border-subtle divide-ds-border-subtle bg-ds-plain divide-y rounded-lg border">
            {wishlistItems.map((item) => (
              <WishlistItemCard key={item.id} item={item} onRemoved={removeItem} />
            ))}
          </div>

          <div className="flex justify-start">
            <HoveredLink
              href="/products"
              className={cn(
                buttonVariants({ variant: 'primary' }),
                'h-12 min-w-58 gap-3 text-base',
              )}
            >
              <ArrowLeft className="size-5 rtl:rotate-180" aria-hidden="true" />
              {t('continueShopping')}
            </HoveredLink>
          </div>
        </section>
      ) : (
        <EmptyState title={t('emptyTitle')} subtitle={t('emptyDescription')}>
          <Heart className="text-ds-primary size-6" aria-hidden="true" />
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
