import type { IProduct } from '@/shared/lib/types/product';
import type { ICartItem } from '@/shared/lib/types/cart';

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

  const updated = existing
    ? current.map((item) =>
        item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
      )
    : [...current, { productId: product.id, product, quantity }];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  emitChange();
}

export function updateGuestCartItemQuantity(productId: string, quantity: number) {
  const current = getGuestCartSnapshot();
  const updated = current.map((item) =>
    item.productId === productId ? { ...item, quantity } : item,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  emitChange();
}

export function removeFromGuestCart(productId: string) {
  const current = getGuestCartSnapshot();
  const updated = current.filter((item) => item.productId !== productId);
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
