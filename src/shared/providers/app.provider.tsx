import ReactQueryProvider from './react-query.provider';
import ThemeProvider from './theme.provider';
import { Toaster } from '../ui/sonner';
import NextAuthProvider from './next-auth.provider';
import NextIntlProvider from './next-intl.provider';
import { WishlistSyncProvider } from '@/features/auth/providers/wishlist-sync.provider';

import type { NextIntlConfigProps } from '../lib/types/global';
import { CartSyncProvider } from '@/features/auth/providers/cart-sync.provider';

type AppProviderProps = {
  children: React.ReactNode;
  nextIntlConfig: NextIntlConfigProps;
};

export default function AppProvider({ children, nextIntlConfig }: AppProviderProps) {
  return (
    <NextIntlProvider nextIntlConfig={nextIntlConfig}>
      <ThemeProvider>
        <ReactQueryProvider>
          <NextAuthProvider>
            <WishlistSyncProvider>
              <CartSyncProvider>{children}</CartSyncProvider>
            </WishlistSyncProvider>
          </NextAuthProvider>
          <Toaster duration={3000} closeButton />
        </ReactQueryProvider>
      </ThemeProvider>
    </NextIntlProvider>
  );
}
