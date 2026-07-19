export interface IOccasion extends IDBFields {
  title: string;
  description: string;
  image: string;
  immutable: boolean;
}

export type IOccasionResponse = IAPIResponse<IPaginatedData<IOccasion>>;
