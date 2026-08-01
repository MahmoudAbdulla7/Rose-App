import Dexie from 'dexie';
import type { IProduct } from '@/shared/lib/types/product';

export interface CartItem {
  id?: number;
  productId: string;
  product: IProduct;
  quantity: number;
  addedAt: Date;
}

class CartDB extends Dexie {
  items!: Dexie.Table<CartItem, number>;

  constructor() {
    super('CartDB');
    this.version(1).stores({
      items: '++id, productId, addedAt',
    });
  }
}

export const cartDb = new CartDB();
