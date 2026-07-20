export function buildOccasionHref(searchParams: ISearchParams, occasionId: string) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === 'occasion' || value == null) continue;
    for (const item of [value].flat()) params.append(key, item);
  }

  params.set('occasion', occasionId);
  return `?${params.toString()}`;
}
