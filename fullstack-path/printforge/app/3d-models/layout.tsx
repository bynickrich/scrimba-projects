import type { CategoryLayoutProps } from "../types";
import { getAllCategories } from "../lib/categories";
import Link from "next/link";

export default function CategoryPage({ children }: CategoryLayoutProps) {
  const categories = getAllCategories();
  return (
    <div className="flex gap-8">
      <aside>
        <ul className="space-y-2">
          <li>
            <Link href={`/3d-models`}>All</Link>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/3d-models/categories/${category.slug}`} className="text-blue-500 hover:underline">
                {category.displayName}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
