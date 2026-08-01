import type { User } from 'next-auth';

export interface ReviewPayload {
  review: Review;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  product: Product;
}

export interface Product {
  id: string;
  title: string;
}

export type ReviewInput = {
  productId: string;
  rating: number;
  headline: string;
  content: string;
};
