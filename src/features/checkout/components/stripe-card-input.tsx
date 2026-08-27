'use client';

import { CardElement } from '@stripe/react-stripe-js';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

import { getStripeCardElementOptions } from '../lib/utils/stripe.utils';

export default function StripeCardInput() {
  const { resolvedTheme } = useTheme();
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    setIsThemeReady(true);
  }, []);

  const isDark = resolvedTheme === 'dark';
  const cardElementOptions = useMemo(
    () => getStripeCardElementOptions(isDark),
    [isDark],
  );

  if (!isThemeReady) {
    return <div className="h-10" aria-hidden="true" />;
  }

  return <CardElement key={resolvedTheme} options={cardElementOptions} />;
}
