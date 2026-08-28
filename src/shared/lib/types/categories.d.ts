export interface ICategory extends IDBFields {
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  subCategories: IRelatedData[] | null;
  _count: {
    products: number;
  };
}

export type ICategoryResponse = IAPIResponse<IPaginatedData<ICategory>>;

export type ISingleCategoryResponse = IAPIResponse<{ category: ICategory }>;

export type ICreateCategoryInput = {
  title: string;
  description?: string;
  image?: string;
};

export type IUpdateCategoryInput = Partial<ICreateCategoryInput>;
