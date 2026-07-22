import type { ICouponType } from './coupon';
import type { PRODUCT_SORT_BY } from '../apis/products/products.options';

export type TProductSortBy = (typeof PRODUCT_SORT_BY)[keyof typeof PRODUCT_SORT_BY];
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
export interface IProductSearchParams {
  limit: string;
  page: string;
  categoryId: string;
  subCategoryId: string;
  occasionId: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  maxRating: string;
  sortBy: TProductSortBy;
  sortOrder: TSortOrder;
}
