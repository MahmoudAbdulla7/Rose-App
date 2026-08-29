export interface IAddToCart {
  productId: string;
  quantity?: number;
}

export type IRemoveFromCart = IAddToCart;

export interface ICartItem extends IDBFields {
  userId?: string;
  productId: string;
  product: IProduct;
  quantity: number;
}

export interface IUpdateCartQuantity {
  productId: string;
  quantity: number;
}

export type UpdateCartQuantityResponse = IAPIResponse<ICartItem>;
export type ICartResponse = IAPIResponse<{ cartItems: ICartItem[] }>;

export type AddToCartResponse = IAPIResponse<ICartItem>;
export type RemoveFromCartResponse = IAPIResponse<null>;
