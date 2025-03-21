export const getCategoryPath = (
  categories: Category[],
  categoryName: string
): string | false => {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    const tmpPath = `/${category.name}`;

    if (category.name === categoryName) {
      return tmpPath;
    }

    const path = getCategoryPath(category.subcategories, categoryName);
    if (path) return `${tmpPath}${path}`;
  }

  return false;
};
