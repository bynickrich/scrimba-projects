import { getDisplayNameFromSlug } from "@/app/lib/categories";
import type { CategoryPageProps } from "@/app/types";

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryName } = await params;
  const displayName = getDisplayNameFromSlug(categoryName);

  return <h1 className="mb-8 text-3xl font-bold">{displayName}</h1>;
}
