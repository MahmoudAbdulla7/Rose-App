/** Inventory count for a product. Invalid or missing values are treated as 0. */
export function getProductStock(stock: unknown): number {
  const parsed = Number(stock);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.floor(parsed);
}
