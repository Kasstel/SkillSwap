import type { User, City } from "../../entities/User/types";
import type {
  Subcategory,
  Category,
} from "../../entities/Category/CategoryTypes";

interface FetchedUser extends Omit<User, "city"> {
  cityId: string;
}

export const fetchUsersData = async (): Promise<User[]> => {
  try {
    const [citiesRes, subcategoriesRes, categoriesRes, usersRes] =
      await Promise.all([
        fetch("/db/cities.json").then((res) => res.json()),
        fetch("/db/skills_subcategories.json").then((res) => res.json()),
        fetch("/db/skills_categories.json").then((res) => res.json()),
        fetch("/db/users.json").then((res) => res.json()),
      ]);

    return (usersRes.users || []).map((user: FetchedUser) => {
      const cityData = citiesRes.cities.find((c: City) => c.id === user.cityId);
      const city = cityData || { id: "unknown", name: "Неизвестный город" };

      const formatSkills = (skills: (string | Subcategory)[]) => {
        return skills
          .map((skill) => {
            const skillId = typeof skill === "string" ? skill : skill.id;
            const subcategory = subcategoriesRes.subcategories.find(
              (s: Subcategory) => s.id === skillId,
            );
            if (!subcategory) return null;

            const category = categoriesRes.categories.find(
              (c: Category) => c.id === subcategory.categoryId,
            );
            return {
              ...subcategory,
              category: category || {
                id: "unknown",
                name: "Неизвестная категория",
                color: "#E8ECF7",
                icon: "",
              },
            };
          })
          .filter(Boolean) as Subcategory[];
      };

      return {
        ...user,
        id: String(user.id),
        city,
        teachingSkills: formatSkills(user.teachingSkills),
        wantToLearnSkills: formatSkills(user.wantToLearnSkills),
        exchangesCount: Math.floor(Math.random() * 10) + 1,
      } as User;
    });
  } catch (error) {
    console.error("Error loading users data:", error);
    throw error;
  }
};
