import categoriesData from "~/data/categories.json";
import type { Category } from "~/types";
export default defineEventHandler((event) => {
  const categories: Category[] = categoriesData;
  return categories;
});
