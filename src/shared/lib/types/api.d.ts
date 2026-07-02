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
