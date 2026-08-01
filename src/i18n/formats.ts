import type { Formats } from 'next-intl';

import type { routing } from './routing';

type AppLocale = (typeof routing.locales)[number];

export function getFormats(locale: AppLocale): Formats {
  const numberingSystem = locale === 'ar' ? 'arab' : 'latn';

  return {
    number: {
      decimal: {
        numberingSystem,
      },
      precise: {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        numberingSystem,
      },
      currency: {
        style: 'currency',
        currency: 'EGP',
        numberingSystem,
      },
    },
  };
}
