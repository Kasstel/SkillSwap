export interface Subcategory {
  id: string;
  name: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface CategoryWithSubcategories extends Category {
  subcategories: Subcategory[];
}
