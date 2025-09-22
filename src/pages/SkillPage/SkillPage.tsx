import { useParams } from "react-router-dom";
import type { User } from "@entities/User/types";
import { SameOffers } from "@widgets/Offers/SameOffers";
import { useState, useEffect } from "react";
import { fetchUsersData } from "../../api/User/User-api";
import { fetchSkillByAuthorId } from "../../api/Skill/Skill-api";
import { AppHeaderUI } from "@widgets/Header";
import styles from "./SkillPage.module.css";
import { Footer } from "@widgets/Footer/Footer";
import type { UserSkill } from "../../entities/Skill/SkillType";
import { SkillInfo } from "@widgets/SkillInfo/SkillInfo";

export const SkillPage = () => {
  const { userId } = useParams(); // Получаем ID из URL
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSkill, setCurrentSkill] = useState<UserSkill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsersData();
        setUsers(usersData);

        // Находим пользователя по ID из URL
        const user = usersData.find((u) => u.id === userId) || null;
        setCurrentUser(user);

        if (user) {
          const skill = await fetchSkillByAuthorId(user.id);
          setCurrentSkill(skill);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);
  // сброс состояния при переходе между карточками
  useEffect(() => {
    setCurrentUser(null);
    setCurrentSkill(null);
    setLoading(true);
  }, [userId]);

  if (loading) return <div>Загрузка...</div>;
  if (!currentUser) return <div>Пользователь не найден</div>;

  return (
    <div className={styles.skillPage}>
      <AppHeaderUI />
      <main className={styles.main}>
        <SkillInfo user={currentUser} skill={currentSkill} />
        <SameOffers users={users} currentUser={currentUser} />
      </main>
      <Footer />
    </div>
  );
};
