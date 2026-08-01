export interface ICategory extends IDBFields {
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  subCategories: IRelatedData[] | null;
  count: {
    products: number;
  };
}

export type ICategoryResponse = IAPIResponse<IPaginatedData<ICategory>>;
