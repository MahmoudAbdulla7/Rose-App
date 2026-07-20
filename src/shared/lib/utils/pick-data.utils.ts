export function pickData<T>(response?: IAPIResponse<IPaginatedData<T>>): T[] {
  if (!response?.status) return [];

  return response.payload.data ?? [];
}
