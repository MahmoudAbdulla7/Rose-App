import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const [common, auth, register, button, forgotPassword] = await Promise.all([
    import(`./messages/${locale}/common.json`),
    import(`./messages/${locale}/auth.json`),
    import(`./messages/${locale}/register.json`),
    import(`./messages/${locale}/button.json`),
    import(`./messages/${locale}/forgot-password.json`),
  ]);

  return {
    locale,
    timeZone: 'Africa/Cairo',
    messages: {
      common: common.default,
      auth: { ...auth.default, ...forgotPassword.default },
      register: register.default,
      button: button.default,
    },
  };
});
