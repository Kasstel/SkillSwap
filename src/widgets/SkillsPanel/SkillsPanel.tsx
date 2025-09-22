import { useEffect, useState } from "react";
import styles from "./SkillsPanel.module.css";
import "../../shared/lib/constants/variables.css";
import type {
  Category,
  Subcategory,
  CategoryWithSubcategories,
} from "../../entities/Category/CategoryTypes";

interface RawCategory {
  id: number | string;
  name: string;
  color: string;
  icon: string;
}

interface RawSubcategory {
  id: number | string;
  name: string;
  categoryId: string | number;
}

export const CategoryDisplay = () => {
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [skillsRes, subcategoriesRes] = await Promise.all([
          fetch("/db/skills_categories.json"),
          fetch("/db/skills_subcategories.json"),
        ]);

        if (!skillsRes.ok || !subcategoriesRes.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        const skillsData: { categories: RawCategory[] } =
          await skillsRes.json();
        const subcategoriesData: { subcategories: RawSubcategory[] } =
          await subcategoriesRes.json();

        const processedCategories: CategoryWithSubcategories[] =
          skillsData.categories.map((category: RawCategory) => {
            const categoryObj: Category = {
              id: String(category.id),
              name: category.name,
              color: category.color,
              icon: new URL(
                `/src/assets/icons/${category.icon}.svg`,
                import.meta.url,
              ).href,
            };

            const subcategories: Subcategory[] = subcategoriesData.subcategories
              .filter(
                (sub: RawSubcategory) =>
                  String(sub.categoryId) === categoryObj.id,
              )
              .map((sub: RawSubcategory) => ({
                id: String(sub.id),
                name: sub.name,
                category: categoryObj,
              }));

            return {
              ...categoryObj,
              subcategories,
            };
          });

        setCategories(processedCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      {categories.map((category) => {
        const cssVarName = category.color.replace("var(", "").replace(")", "");
        const colorValue =
          getComputedStyle(document.documentElement)
            .getPropertyValue(cssVarName)
            .trim() || "#ccc";

        return (
          <div key={category.id} className={styles.categoryCard}>
            <div
              className={styles.categoryIconWrapper}
              style={{ backgroundColor: colorValue }}
            >
              <img
                src={category.icon}
                alt={category.name}
                className={styles.categoryIcon}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <div className={styles.categoryContent}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <ul className={styles.subcategoriesList}>
                {category.subcategories.map((sub) => (
                  <li key={sub.id} className={styles.subcategoryItem}>
                    {sub.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
