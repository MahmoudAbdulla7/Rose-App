'use client';
import { NextIntlClientProvider } from 'next-intl';
import type { NextIntlConfigProps } from '../lib/types/global';

export default function NextIntlProvider({
  children,
  nextIntlConfig,
}: {
  children: React.ReactNode;
  nextIntlConfig: NextIntlConfigProps;
}) {
  return <NextIntlClientProvider {...nextIntlConfig}>{children}</NextIntlClientProvider>;
}
