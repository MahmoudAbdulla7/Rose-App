'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';

const QUANTITY_DEBOUNCE_MS = 800;

type UseDebouncedQuantityChangeParams = {
  quantity: number;
  onCommit: (quantity: number) => void;
};

export function useDebouncedQuantityChange({
  quantity,
  onCommit,
}: UseDebouncedQuantityChangeParams) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const cancelledRef = useRef(false);
  const lastCommittedRef = useRef(quantity);

  useEffect(() => {
    if (quantity === lastCommittedRef.current) {
      setLocalQuantity((local) => (local === lastCommittedRef.current ? quantity : local));
      return;
    }

    setLocalQuantity((local) => {
      if (local !== lastCommittedRef.current) {
        return local;
      }

      lastCommittedRef.current = quantity;
      return quantity;
    });
  }, [quantity]);

  const commitPending = useEffectEvent(() => {
    if (cancelledRef.current || localQuantity === lastCommittedRef.current) return;
    lastCommittedRef.current = localQuantity;
    onCommit(localQuantity);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      commitPending();
    }, QUANTITY_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [localQuantity]);

  useEffect(() => {
    return () => {
      commitPending();
    };
  }, []);

  return {
    quantity: localQuantity,
    setQuantity: setLocalQuantity,
    cancel() {
      cancelledRef.current = true;
    },
  };
}
