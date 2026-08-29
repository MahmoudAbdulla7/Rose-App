import type { IProduct } from '@/shared/lib/types/product';
import type { ICartItem } from '@/shared/lib/types/cart';
import { getProductStock } from '@/shared/lib/utils/product-stock.utils';

const STORAGE_KEY = 'guestCart';
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedSnapshot: ICartItem[] = [];

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeToGuestCart(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getGuestCartSnapshot(): ICartItem[] {
  if (typeof window === 'undefined') return cachedSnapshot;

  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = raw ? JSON.parse(raw) : [];
  }

  return cachedSnapshot;
}

const EMPTY: ICartItem[] = [];
export function getGuestCartServerSnapshot(): ICartItem[] {
  return EMPTY;
}

// Adds if new, increments quantity if the product is already in the guest cart
export function addToGuestCart(product: IProduct, quantity: number = 1) {
  const current = getGuestCartSnapshot();
  const existing = current.find((item) => item.productId === product.id);
  const nextQuantity = (existing?.quantity ?? 0) + quantity;
  const stock = getProductStock(product.stock);

  if (nextQuantity > stock) {
    throw new Error('Quantity exceeds available stock');
  }

  const updated = existing
    ? current.map((item) =>
        item.productId === product.id ? { ...item, quantity: nextQuantity } : item,
      )
    : [...current, { productId: product.id, product, quantity }];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  emitChange();
}

function matchesGuestCartLine(item: ICartItem, idOrProductId: string) {
  return (
    item.id === idOrProductId ||
    item.productId === idOrProductId ||
    `guest-${item.productId}` === idOrProductId
  );
}

/**
 * Updates a guest line's quantity. Quantity cannot go below 1 — callers must
 * use `removeFromGuestCart` to delete a line (ticket Option B).
 */
export function updateGuestCartItemQuantity(idOrProductId: string, quantity: number) {
  if (!Number.isFinite(quantity) || quantity < 1) {
    throw new Error('Quantity must be at least 1. Remove the item to delete it.');
  }

  const current = getGuestCartSnapshot();
  const match = current.find((item) => matchesGuestCartLine(item, idOrProductId));
  if (match && quantity > getProductStock(match.product.stock)) {
    throw new Error('Quantity exceeds available stock');
  }

  const updated = current.map((item) =>
    matchesGuestCartLine(item, idOrProductId) ? { ...item, quantity } : item,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  emitChange();
}

export function removeFromGuestCart(idOrProductId: string) {
  const current = getGuestCartSnapshot();
  const updated = current.filter((item) => !matchesGuestCartLine(item, idOrProductId));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  emitChange();
}

export function clearGuestCart() {
  localStorage.removeItem(STORAGE_KEY);
  emitChange();
}

export function setGuestCart(items: ICartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  cachedRaw = localStorage.getItem(STORAGE_KEY);
  cachedSnapshot = items;
  emitChange();
}
