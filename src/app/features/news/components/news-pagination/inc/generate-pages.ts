export const generatePages = (totalPages: number, currentPage: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  const total = totalPages;
  const current = currentPage;

  pages.push(1);
  if (total >= 2) pages.push(2);

  if (current > 4) {
    pages.push('...');
  }

  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 2 && i < total - 1) {
      pages.push(i);
    }
  }

  if (current < total - 3) {
    pages.push('...');
  }

  if (total > 3) pages.push(total - 1);
  if (total > 2) pages.push(total);

  return pages;
};
