export interface IAddToWishlist {
  productId: string;
}

export type IRemoveFromWishlist = IAddToWishlist;

export interface IWishlistItem extends Omit<IDBFields, 'updatedAt'> {
  userId: string;
  productId: string;
  product: IProduct;
}

export type IWishlistResponse = IAPIResponse<{ wishlistItems: IWishlistItem[] }>;

export type AddToWishlistResponse = IAPIResponse<IWishlistItem>;

export type RemoveFromWishlistResponse = IAPIResponse<null>;
