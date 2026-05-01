import categories from "../data/categories.json";
import { Category } from "../types";

export function getAllCategories(): Category[] {
  return categories;
}

/**
 * Gets the category matching a URL slug.
 * @param slug The category slug from the route params.
 * @returns The matching category.
 * @throws If no category exists for the slug.
 */
export function getCategoryBySlug(slug: string): Category {
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    throw new Error(`Category with slug ${slug} not found`);
  }
  return category;
}

/**
 * Gets the display name for a category based on its slug
 * @param slug
 * @returns The display name of the category
 */
export function getDisplayNameFromSlug(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category.displayName;
}
