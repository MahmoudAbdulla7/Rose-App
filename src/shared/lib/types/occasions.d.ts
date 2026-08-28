export interface IOccasion extends IDBFields {
  title: string;
  description: string;
  image: string;
  immutable: boolean;
}

export type IOccasionResponse = IAPIResponse<IPaginatedData<IOccasion>>;

export type ISingleOccasionResponse = IAPIResponse<{ occasion: IOccasion }>;

export type ICreateOccasionInput = {
  title: string;
  description?: string;
  image?: string;
};

export type IUpdateOccasionInput = Partial<ICreateOccasionInput>;
