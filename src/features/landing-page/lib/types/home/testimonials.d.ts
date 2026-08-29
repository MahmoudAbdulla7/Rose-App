export interface ITestimonial extends IDBFields {
  name: string;
  email: string;
  content: string;
  rating: number;
  image: string | null;
  isApproved: boolean;
  immutable: boolean;
}

export type ITestimonialResponse = IAPIResponse<IPaginatedData<ITestimonial>>;
