'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/button';

export default function EmptyCartState() {
  const t = useTranslations('cart');

  return (
    <div
      role="status"
      className="bg-ds-subtle flex min-h-80 flex-col items-center justify-center gap-6 rounded-2xl px-6 py-16 text-center"
    >
      <Image
        src="/assets/images/home/cart/no-cart.png"
        alt=""
        width={160}
        height={160}
        className="size-40 object-contain"
        aria-hidden="true"
      />

      <h2 className="text-ds-text-plain text-xl font-semibold">{t('empty')}</h2>

      <Button variant="primary" size="default" render={<Link href="/products" />}>
        {t('startShopping')}
      </Button>
    </div>
  );
}
