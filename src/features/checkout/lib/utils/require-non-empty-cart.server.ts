import 'server-only';

import { getCartSubtotal } from '@/features/cart/lib/utils/cart.utils';
import { redirect } from '@/i18n/navigation';
import { getCartItems } from '@/shared/lib/apis/cart/cart.api';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import type { Locale } from 'next-intl';

export async function requireNonEmptyCart(locale: Locale) {
  let token;

  try {
    token = await getNextAuthToken();
  } catch {
    redirect({
      href: { pathname: '/login', query: { callbackUrl: '/checkout' } },
      locale,
    });
  }

  if (!token) {
    redirect({
      href: { pathname: '/login', query: { callbackUrl: '/checkout' } },
      locale,
    });
  }

  const cartResponse = await getCartItems();

  if (cartResponse.status === true) {
    const cartItems = cartResponse.payload.cartItems;

    if (cartItems.length === 0 || getCartSubtotal(cartItems) <= 0) {
      redirect({ href: '/cart', locale });
    }

    return;
  }

  redirect({ href: '/cart', locale });
}
