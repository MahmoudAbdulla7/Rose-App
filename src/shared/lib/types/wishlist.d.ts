export interface IAddToWishlist {
  productId: string;
}

export type IRemoveFromWishlist = { id: string }; // ✅ wishlist item ID (UUID)

export interface IWishlistItem extends Omit<IDBFields, 'updatedAt'> {
  userId: string;
  productId: string;
  product: IProduct;
}

export type IWishlistResponse = IAPIResponse<{ wishlistItems: IWishlistItem[] }>;
export type AddToWishlistResponse = IAPIResponse<IWishlistItem>;
export type RemoveFromWishlistResponse = IAPIResponse<null>;
