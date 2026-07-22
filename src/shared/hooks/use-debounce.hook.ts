'use client';

import { useEffect, useEffectEvent, type DependencyList } from 'react';

const DEBOUNCE_MS = 400;

export function useDebounce({
  callback,
  delay = DEBOUNCE_MS,
  deps,
}: {
  callback: () => void;
  delay?: number;
  deps: DependencyList;
}) {
  const onDebounce = useEffectEvent(callback);

  useEffect(() => {
    const timer = setTimeout(() => {
      onDebounce();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, ...deps]);
}
