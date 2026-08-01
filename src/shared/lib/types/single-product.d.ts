import type { IOccasion } from './occasions';
import type { IProduct } from './product';

export type ICategory = IOccasion;

export interface IProductOccasion extends IDBFields {
  productId: string;
  occasionId: string;
  occasion: IOccasion;
}

export interface IReview extends IDBFields {
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

export interface ISingleProduct extends Omit<
  IProduct,
  'category' | 'subCategory' | 'occasions' | 'count'
> {
  category: ICategory;
  subCategory: ICategory | null;
  occasions: IProductOccasion[];
  reviews: IReview[];
  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
  };
}

export type ISingleProductResponse = IAPIResponse<{ product: ISingleProduct }>;
