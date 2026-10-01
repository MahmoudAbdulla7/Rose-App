import type { IProduct } from '@/shared/lib/types/product';

const STORAGE_KEY = 'guestWishlist';
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedSnapshot: IProduct[] = [];

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeToGuestWishlist(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getGuestWishlistSnapshot(): IProduct[] {
  if (typeof window === 'undefined') return cachedSnapshot;

  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = raw ? JSON.parse(raw) : [];
  }

  return cachedSnapshot;
}

const EMPTY: IProduct[] = [];
export function getGuestWishlistServerSnapshot(): IProduct[] {
  return EMPTY;
}

export function addToGuestWishlist(product: IProduct) {
  const current = getGuestWishlistSnapshot();
  if (current.some((item) => item.id === product.id)) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, product]));
  emitChange();
}

export function removeFromGuestWishlist(productId: string) {
  const current = getGuestWishlistSnapshot();
  const updated = current.filter((item) => item.id !== productId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  emitChange();
}

export function clearGuestWishlist() {
  localStorage.removeItem(STORAGE_KEY);
  emitChange();
}

export function setGuestWishlist(items: IProduct[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  cachedRaw = localStorage.getItem(STORAGE_KEY);
  cachedSnapshot = items;
  emitChange();
}
