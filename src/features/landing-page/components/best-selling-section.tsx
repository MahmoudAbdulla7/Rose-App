import { ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import BestSellingProducts from '@/features/landing-page/components/best-selling-products';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { isMobileDevice } from '@/shared/lib/utils/device.utils';
import { buttonVariants } from '@/shared/ui/button';
import { getBestSellingProducts } from '../lib/services/products.service';

export default async function BestSellingSection() {
  const locale = await getLocale();
  const isMobile = await isMobileDevice();

  // Translations
  const t = await getTranslations('product.bestSelling');

  // Products
  const products = await getBestSellingProducts({
    searchParams: {},
    options: { locale, isMobile },
  });

  // Check if response is successful
  if (!products?.length) {
    return null;
  }

  return (
    <section className="flex w-full flex-col items-stretch gap-9 xl:flex-row">
      {/* Text column */}
      <div className="flex w-full flex-col gap-2.5 lg:min-w-0 lg:flex-1 lg:self-stretch">
        <p className="text-soft-pink-500 dark:text-maroon-400 tracking-label text-base leading-none font-bold uppercase">
          {t('label')}
        </p>

        <div className="flex w-full flex-col gap-2">
          <h2 className="text-maroon-700 dark:text-maroon-400 text-3xl leading-none font-bold">
            {t.rich('headline', {
              accent: (chunks) => (
                <span className="text-soft-pink-400 dark:text-soft-pink-200">{chunks}</span>
              ),
            })}
          </h2>

          <p className="leading-body text-base text-zinc-500 dark:text-zinc-400">
            {t('description')}
          </p>
        </div>

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'primary' }),
            'dark:bg-soft-pink-200 dark:hover:bg-soft-pink-300 mt-auto max-h-9 w-fit min-w-38.75 gap-2.5 rounded-xl px-4 py-2.5 text-base font-normal',
          )}
        >
          {t('exploreButton')}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>

      {/* Products carousel */}
      <BestSellingProducts products={products} />
    </section>
  );
}
