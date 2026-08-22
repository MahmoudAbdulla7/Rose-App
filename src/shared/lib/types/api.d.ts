declare type IErrorResponse = {
  status: false;
  code: number;
  message: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
};

declare type ISuccessResponse<T> = {
  status: true;
  code: number;
  message: string;
  payload: T;
};

declare type IAPIResponse<T> = IErrorResponse | ISuccessResponse<T>;

declare interface IDBFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId?: string;
}

declare interface IPaginatedData<T> {
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: T[];
}

declare interface ISearchParams {
  [key: string]: string | string[] | undefined;
}

declare interface IRelatedData {
  id: string;
  title: string;
}
