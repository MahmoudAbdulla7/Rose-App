import type { ICouponType } from './coupon';

export interface IProduct extends IDBFields {
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
  category: IRelatedData;
  subCategory: IRelatedData | null;
  occasions: IRelatedData[] | null;
  count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
  };
}

export type IProductResponse = IAPIResponse<IPaginatedData<IProduct>>;
