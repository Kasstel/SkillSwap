import type {
  Category,
  Subcategory,
  CategoryWithSubcategories,
} from "@entities/Category/CategoryTypes";

interface RawCategory {
  id: number;
  name: string;
  color: string;
  icon: string;
}

interface RawSubcategory {
  id: number;
  name: string;
  categoryId: string | number;
}

export let CATEGORIES: CategoryWithSubcategories[] = [];
export let isCategoriesLoaded = false;

export const initializeCategories = async (): Promise<boolean> => {
  try {
    const [skillsRes, subcategoriesRes] = await Promise.all([
      fetch("/db/skills_categories.json"),
      fetch("/db/skills_subcategories.json"),
    ]);

    const skillsData = await skillsRes.json();
    const subcategoriesData = await subcategoriesRes.json();

    CATEGORIES = skillsData.categories.map((category: RawCategory) => {
      const categoryObj: Category = {
        id: String(category.id),
        name: category.name,
        color: category.color,
        icon: new URL(`/src/assets/icons/${category.icon}.svg`, import.meta.url)
          .href,
      };

      return {
        ...categoryObj,
        subcategories: subcategoriesData.subcategories
          .filter(
            (sub: RawSubcategory) => String(sub.categoryId) === categoryObj.id,
          )
          .map(
            (sub: RawSubcategory): Subcategory => ({
              id: String(sub.id),
              name: sub.name,
              category: categoryObj,
            }),
          ),
      };
    });

    isCategoriesLoaded = true;
    return true;
  } catch (error) {
    console.error("Categories init error:", error);
    isCategoriesLoaded = false;
    return false;
  }
};

initializeCategories();
