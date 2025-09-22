import { useState, useEffect, useMemo, memo, useCallback } from "react";
import { AppHeaderUI } from "@widgets/Header";
import { Filtres } from "@widgets/Filtres/Filtres.tsx";
import { Footer } from "@widgets/Footer/Footer.tsx";
import { UserCard } from "@widgets/UserCard/user-card.tsx";
import { SkillListContainer } from "@widgets/SkillList/SkillListContainer.tsx";
import styles from "./HomePage.module.css";
import skillListStyles from "../../widgets/SkillList/skill-list.module.css";
import type { User } from "@entities/User/types.ts";
import { fetchUsersData } from "@api/User/User-api.ts";
import { Button } from "@shared/ui/button/button";
import SortIcon from "@assets/icons/sort.svg?react";
import skills from "@public/db/skills.json";
import { sortUsersByCreatedAt } from "@shared/lib/utils/sortedUsersByDate";
import useDebounce from "@shared/hooks/useDebounce";

type RoleType = "Всё" | "Хочу научиться" | "Могу научить";
type GenderType = "Не имеет значения" | "Мужской" | "Женский";

interface HomeFilters {
  role: RoleType;
  gender: GenderType;
  cities: string[];
  skills: string[];
}

const MemoizedUserCard = memo(UserCard);

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClickButtonShowNew, setisClickButtonShowNew] = useState(false);

  const [filters, setFilters] = useState<HomeFilters>({
    role: "Всё",
    gender: "Не имеет значения",
    cities: [],
    skills: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsersData();
        setUsers(usersData);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleRoleChange = useCallback((role: string) => {
    if (["Всё", "Хочу научиться", "Могу научить"].includes(role)) {
      setFilters((prev) => ({ ...prev, role: role as RoleType }));
    }
  }, []);

  const handleGenderChange = useCallback((gender: string) => {
    if (["Не имеет значения", "Мужской", "Женский"].includes(gender)) {
      setFilters((prev) => ({ ...prev, gender: gender as GenderType }));
    }
  }, []);

  const handleCitiesChange = useCallback((cities: string[]) => {
    setFilters((prev) => ({ ...prev, cities }));
  }, []);

  const handleSkillsChange = useCallback((skills: string[]) => {
    setFilters((prev) => ({ ...prev, skills }));
  }, []);

  const handleDetailsClick = useCallback((userId: string) => {
    console.log("Подробнее о пользователе:", userId);
  }, []);

  const skillsUsers = useMemo(() => skills.skills, []);

  const skillNamesBySubId = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const s of skillsUsers) {
      const key = s.SubcategoryId;
      if (!key) continue;
      const arr = m.get(key) ?? [];
      arr.push(s.name.toLowerCase());
      m.set(key, arr);
    }
    return m;
  }, [skillsUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (filters.gender !== "Не имеет значения") {
        const genderMap = { Мужской: "male", Женский: "female" } as const;
        if (user.gender !== genderMap[filters.gender as keyof typeof genderMap])
          return false;
      }

      if (
        filters.cities.length > 0 &&
        !filters.cities.includes(user.city.name)
      ) {
        return false;
      }

      if (filters.skills.length > 0) {
        const skillsToCheck =
          filters.role === "Всё"
            ? [...user.teachingSkills, ...user.wantToLearnSkills]
            : filters.role === "Могу научить"
              ? user.teachingSkills
              : user.wantToLearnSkills;

        const hasMatch = skillsToCheck.some(
          (skill) =>
            filters.skills.includes(skill.id) ||
            filters.skills.includes(skill.category.id),
        );
        if (!hasMatch) return false;
      }

      return true;
    });
  }, [users, filters]);

  const searchedUsers = useMemo(() => {
    if (!debouncedSearch) return filteredUsers;

    const query = debouncedSearch.toLowerCase();

    return filteredUsers.filter((user) => {
      const skillsToCheck =
        filters.role === "Всё"
          ? [...user.teachingSkills, ...user.wantToLearnSkills]
          : filters.role === "Могу научить"
            ? user.teachingSkills
            : user.wantToLearnSkills;

      return skillsToCheck.some((subcat) => {
        const namesInThisSub = skillNamesBySubId.get(subcat.id) ?? [];

        return (
          subcat.name.toLowerCase().includes(query) ||
          subcat.category.name.toLowerCase().includes(query) ||
          namesInThisSub.some((n) => n.includes(query))
        );
      });
    });
  }, [debouncedSearch, filteredUsers, filters.role, skillNamesBySubId]);

  const isSearchActive = useMemo(
    () => debouncedSearch.trim().length > 0,
    [debouncedSearch],
  );
  const resultsCount = searchedUsers.length;

  const listToRender = useMemo(() => {
    return isClickButtonShowNew
      ? sortUsersByCreatedAt(searchedUsers, skillsUsers)
      : searchedUsers;
  }, [isClickButtonShowNew, searchedUsers, skillsUsers]);

  const isDefaultFilters = useMemo(
    () =>
      filters.role === "Всё" &&
      filters.gender === "Не имеет значения" &&
      filters.cities.length === 0 &&
      filters.skills.length === 0,
    [filters],
  );

  const onClickButtonShowNew = () => {
    setisClickButtonShowNew((v) => !v);
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  return (
    <div className={styles.homePage}>
      <AppHeaderUI searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className={styles.main}>
        <div className={styles.layout}>
          <Filtres
            onRoleChange={handleRoleChange}
            onGenderChange={handleGenderChange}
            onCitiesChange={handleCitiesChange}
            onSkillsChange={handleSkillsChange}
          />

          <div className={styles.content}>
            {isDefaultFilters && !isSearchActive ? (
              <SkillListContainer users={filteredUsers} />
            ) : (
              <section className={styles.section}>
                <div className={styles.section__header}>
                  <h2
                    className={skillListStyles.header__title}
                    style={{ marginBottom: "36px" }}
                  >
                    Подходящие предложения: {resultsCount}
                  </h2>
                  <Button
                    type="tertiary"
                    startIcon={<SortIcon />}
                    onClick={onClickButtonShowNew}
                    htmlType="button"
                  >
                    {!isClickButtonShowNew ? "Сначала новые" : "Показать все"}
                  </Button>
                </div>

                {resultsCount === 0 ? (
                  <div className={styles.emptyState}>
                    Таких талантов в нашей базе нет… Может, пора добавить?
                  </div>
                ) : (
                  <div className={styles.usersGrid}>
                    {listToRender.map((user) => (
                      <MemoizedUserCard
                        key={user.id}
                        user={user}
                        onButtonClick={handleDetailsClick}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
