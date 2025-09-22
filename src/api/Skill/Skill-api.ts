import type { Skill } from "../../entities/Skill/SkillType";
import type {
  Subcategory,
  Category,
} from "../../entities/Category/CategoryTypes";
import type { User } from "../../entities/User/types";

interface FetchedSkill
  extends Omit<Skill, "category" | "subcategory" | "author"> {
  CategoryId: string;
  SubcategoryId: string;
  authorId: string;
}

export const fetchSkillsData = async (): Promise<Skill[]> => {
  try {
    const [categoriesRes, subcategoriesRes, skillsRes, usersRes] =
      await Promise.all([
        fetch("/db/skills_categories.json").then((res) => res.json()),
        fetch("/db/skills_subcategories.json").then((res) => res.json()),
        fetch("/db/skills.json").then((res) => res.json()),
        fetch("/db/users.json").then((res) => res.json()),
      ]);

    return (skillsRes.skills || []).map((skill: FetchedSkill) => {
      // Находим подкатегорию и категорию
      const subcategory = subcategoriesRes.subcategories.find(
        (s: Subcategory) => s.id === skill.SubcategoryId,
      );
      const category = categoriesRes.categories.find(
        (c: Category) => c.id === skill.CategoryId,
      );

      // Находим автора навыка
      const author = usersRes.users.find(
        (u: User) => String(u.id) === skill.authorId,
      );

      return {
        ...skill,
        id: String(skill.id),
        category: category || {
          id: "unknown",
          name: "Неизвестная категория",
          color: "#E8ECF7",
          icon: "",
        },
        subcategory: subcategory || {
          id: "unknown",
          name: "Неизвестная подкатегория",
          categoryId: "unknown",
        },
        author: author
          ? {
              ...author,
              id: String(author.id),
            }
          : {
              id: "unknown",
              name: "Неизвестный автор",
              avatar: "",
              city: { id: "unknown", name: "Неизвестный город" },
              teachingSkills: [],
              wantToLearnSkills: [],
              exchangesCount: 0,
            },
      } as Skill;
    });
  } catch (error) {
    console.error("Error loading skills data:", error);
    throw error;
  }
};
export const fetchSkillByAuthorId = async (
  authorId: string,
): Promise<Skill | null> => {
  try {
    const skills = await fetchSkillsData();
    const skill = skills.find((s) => s.authorId === authorId);
    return skill || null;
  } catch (error) {
    console.error("Error finding skill by author:", error);
    throw error;
  }
};
