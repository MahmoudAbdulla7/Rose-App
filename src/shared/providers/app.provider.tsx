import ReactQueryProvider from './react-query.provider';
import ThemeProvider from './theme.provider';

import type { NextIntlConfigProps } from '../lib/types/global';
import { Toaster } from '../ui/sonner';
import NextAuthProvider from './next-auth.provider';
import NextIntlProvider from './next-intl.provider';

type AppProviderProps = {
  children: React.ReactNode;
  nextIntlConfig: NextIntlConfigProps;
};

export default function AppProvider({ children, nextIntlConfig }: AppProviderProps) {
  return (
    <NextIntlProvider nextIntlConfig={nextIntlConfig}>
      <ThemeProvider>
        <ReactQueryProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
          <Toaster duration={3000} closeButton />
        </ReactQueryProvider>
      </ThemeProvider>
    </NextIntlProvider>
  );
}
