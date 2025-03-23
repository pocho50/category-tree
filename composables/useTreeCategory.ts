export const useTreeCategory = () => {
  const categorySelected = ref<Category>();
  const categories = ref<Category[] | null>(null);

  const getPath = computed(() =>
    categorySelected.value && categories.value
      ? getCategoryPath(categories.value, categorySelected.value?.name)
      : "/"
  );

  const handleAddCategory = (categoryName: string) => {
    const categoryToAdd = {
      name: categoryName,
      subcategories: [],
    };
    if (categorySelected.value) {
      categorySelected.value.subcategories.push(categoryToAdd);
      return;
    }
    categories.value?.push(categoryToAdd);
  };

  const handleRemoveCategory = (category: Category) => {
    if (!categories.value) return;

    const removeCategoryRecursively = (
      subcategories: Category[]
    ): Category[] => {
      return subcategories
        .filter((item) => item.name !== category.name)
        .map((item) => ({
          ...item,
          subcategories: removeCategoryRecursively(item.subcategories),
        }));
    };

    categories.value = removeCategoryRecursively(categories.value);

    if (categorySelected.value?.name === category.name) {
      categorySelected.value = undefined;
    }
  };

  const resetPath = () => {
    categorySelected.value = undefined;
  };

  return {
    categories,
    getPath,
    handleAddCategory,
    handleRemoveCategory,
    resetPath,
    categorySelected,
  };
};
