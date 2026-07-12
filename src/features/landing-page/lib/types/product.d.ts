export interface IProductBadge {
  labelAr: string;
  labelEn: string;
  variant: 'hot' | 'outOfStock' | 'default';
}

export interface IProduct {
  id: string;
  nameEn: string;
  nameAr: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  maxRating?: number;
  badges?: IProductBadge[];
  outOfStock?: boolean;
  isWishlisted?: boolean;
}
