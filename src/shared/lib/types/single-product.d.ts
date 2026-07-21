import type { ICouponType } from './coupon';
import type { IOccasion } from './occasions';

export type ICategory = IOccasion;

export interface IProductOccasion extends IDBFields {
  productId: string;
  occasionId: string;
  occasion: IOccasion;
}

export interface ISingleProduct extends IDBFields {
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: ICouponType;
  discountValue: string;
  cover: string;
  gallery: string[];
  categoryId: string;
  subCategoryId: string | null;
  immutable: boolean;
  deletedAt: string | null;
  category: ICategory;
  subCategory: ICategory | null;
  occasions: IProductOccasion[];
  reviews: unknown[];
  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
  };
}

export type ISingleProductResponse = IAPIResponse<{ product: ISingleProduct }>;
