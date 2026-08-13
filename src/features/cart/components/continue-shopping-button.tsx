'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/button';

export default function ContinueShoppingButton() {
  const t = useTranslations('cart');

  return (
    <Button
      variant="primary"
      size="default"
      className="self-start"
      render={<Link href="/products" />}
      leftIcon={<ArrowLeft className="rtl:rotate-180" />}
    >
      {t('continueShopping')}
    </Button>
  );
}
