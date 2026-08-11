import { db } from '../db/wishlist.db';
import type { IProduct } from '@/shared/lib/types/product';

export const guestWishlist = {
  async add(productId: string, product: IProduct): Promise<void> {
    const existing = await db.items.where('productId').equals(productId).first();
    if (existing) return; // already in wishlist
    await db.items.add({ productId, product, addedAt: new Date() });
  },

  async remove(productId: string): Promise<void> {
    await db.items.where('productId').equals(productId).delete();
  },

  async getAll(): Promise<{ productId: string; product: IProduct }[]> {
    const items = await db.items.toArray();
    return items.map((item) => ({ productId: item.productId, product: item.product }));
  },

  async clear(): Promise<void> {
    await db.items.clear();
  },

  async count(): Promise<number> {
    return await db.items.count();
  },
};
