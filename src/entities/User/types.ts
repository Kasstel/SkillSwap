import type {
  CategoryWithSubcategories,
  Subcategory,
} from "@entities/Category/CategoryTypes";

export type User = {
  id: string;
  name: string;
  age: number;
  gender: UserGender;
  city: City;
  wantToLearnSkills: Subcategory[];
  teachingSkills: Subcategory[];
  photo: string;
  description: string;
  likes: User[];
  likedSkills: User[];
  createdAt?: string;
};

export type UserInLocalStorage = {
  email: string;
  name: string;
  password: string;
  birthDate: Date | null;
  gender: string;
  city: string;
  categories: string[];
  subcategories: string[];
  skills: CategoryWithSubcategories;
  avatar: string | undefined | File;
  skillImage: string;
  description: string;
  likedSkills: string[];
};

export type Skill = {
  id: string;
  name: string;
  CategoryId: string;
  SubcategoryId: string;
  description: string;
  authorId: string;
  likesCount: number;
  createdAt: string;
  images: string[];
};

export type UserGender = "male" | "female";

export type City = {
  id: string;
  name: string;
};
