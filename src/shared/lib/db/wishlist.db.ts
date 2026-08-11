import Dexie from 'dexie';
import type { IProduct } from '@/shared/lib/types/product';

export interface WishlistItem {
  id?: number;
  productId: string;
  product: IProduct;
  addedAt: Date;
}

class WishlistDB extends Dexie {
  items!: Dexie.Table<WishlistItem, number>;

  constructor() {
    super('WishlistDB');
    this.version(1).stores({
      items: '++id, productId, addedAt',
    });
  }
}

export const db = new WishlistDB();
