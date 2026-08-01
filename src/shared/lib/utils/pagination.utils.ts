export function getPageItems(total: number, current: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];
  const start = Math.max(2, current - 2);
  const end = Math.min(total - 1, current + 2);

  if (start > 2) pages.push('ellipsis');
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < total - 1) pages.push('ellipsis');

  pages.push(total);
  return pages;
}
