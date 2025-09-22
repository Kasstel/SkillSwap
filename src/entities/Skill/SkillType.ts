export type Skill = {
  id: string;
  name: string;
  CategoryId: string;
  SubcategoryId?: string;
  description: string;
  authorId: string;
  likesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  location?: string;
  status?: "active" | "pending" | "completed";
  images?: string[];
};

export type UserSkill = {
  id: string;
  name: string;
  CategoryId: string;
  SubcategoryId?: string;
  description: string;
  authorId: string;
  likesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  location?: string;
  status?: "active" | "pending" | "completed";
  images?: string[];
  category?: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
  subcategory?: {
    id: string;
    categoryId: string;
    name: string;
  };
};
