import { cartDb, type CartItem } from '../db/cart.db';
import type { IProduct } from '@/shared/lib/types/product';

export const guestCart = {
  async add(productId: string, product: IProduct, quantity = 1): Promise<void> {
    const existing = await cartDb.items.where('productId').equals(productId).first();
    if (existing) {
      await cartDb.items.update(existing.id!, { quantity: existing.quantity + quantity });
    } else {
      await cartDb.items.add({ productId, product, quantity, addedAt: new Date() });
    }
  },

  async remove(productId: string): Promise<void> {
    await cartDb.items.where('productId').equals(productId).delete();
  },

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await this.remove(productId);
      return;
    }
    const existing = await cartDb.items.where('productId').equals(productId).first();
    if (existing) {
      await cartDb.items.update(existing.id!, { quantity });
    }
  },

  async getAll(): Promise<CartItem[]> {
    return await cartDb.items.toArray();
  },

  async clear(): Promise<void> {
    await cartDb.items.clear();
  },

  async count(): Promise<number> {
    return await cartDb.items.count();
  },

  async totalQuantity(): Promise<number> {
    const items = await this.getAll();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
};
