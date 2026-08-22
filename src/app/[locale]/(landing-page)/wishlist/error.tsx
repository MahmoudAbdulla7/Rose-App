'use client';

import { useTranslations } from 'next-intl';

import EmptyState from '@/shared/components/empty-state';
import { Button } from '@/shared/ui/button';

type WishlistErrorProps = {
  error: Error;
  reset: () => void;
};

export default function WishlistError({ error, reset }: WishlistErrorProps) {
  void error;

  const t = useTranslations('common');
  const entity = t('pages.wishlist');

  return (
    <main className="container py-10">
      <EmptyState
        title={t('loadError.title', { entity })}
        subtitle={t('loadError.subtitle', { entity })}
      >
        <Button type="button" variant="primary" onClick={reset}>
          {t('loadError.retry')}
        </Button>
      </EmptyState>
    </main>
  );
}
