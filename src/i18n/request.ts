import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { getFormats } from './formats';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const [common, auth, product, hero, features] = await Promise.all([
    import(`./messages/${locale}/common.json`),
    import(`./messages/${locale}/auth.json`),
    import(`./messages/${locale}/product.json`),
    import(`./messages/${locale}/hero.json`),
    import(`./messages/${locale}/features.json`),
  ]);

  return {
    locale,
    timeZone: 'Africa/Cairo',
    formats: getFormats(locale),
    messages: {
      common: common.default,
      auth: auth.default,
      product: product.default,
      hero: hero.default,
      features: features.default,
    },
  };
});
