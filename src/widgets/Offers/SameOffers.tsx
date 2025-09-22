import type { FC } from "react";
import type { User } from "@entities/User/types";
import SkillList from "@widgets/SkillList/SkillList";
import styles from "./SameOffers.module.css";

interface ISameOffers {
  users: User[];
  currentUser: User;
}

export const SameOffers: FC<ISameOffers> = ({ users, currentUser }) => {
  // Получаем teachingSkills текущего пользователя
  const currentUserSkills = Array.isArray(currentUser.teachingSkills)
    ? currentUser.teachingSkills
    : [];

  // Фильтруем пользователей с такими же skills
  const similarUsers = users
    .filter((user) => {
      if (user.id === currentUser.id) return false;
      // Проверяем что у пользователя есть teachingSkills
      if (!Array.isArray(user.teachingSkills)) return false;
      // Проверяем совпадение хотя бы одного skill
      return user.teachingSkills.some((skill) => {
        if (typeof skill === "string") {
          return currentUserSkills.includes(skill);
        } else if (typeof skill === "object" && skill.id) {
          return currentUserSkills.some((currentSkill) =>
            typeof currentSkill === "string"
              ? currentSkill === skill.id
              : currentSkill.id === skill.id,
          );
        }
        return false;
      });
    })
    .slice(0, 4);

  if (similarUsers.length === 0) {
    return <div>Нет пользователей с такими же навыками</div>;
  }

  return (
    <div className={styles.cards_container}>
      <SkillList
        users={similarUsers}
        onButtonClick={() => {}}
        onLikeClick={() => {}}
        title="Похожие предложения"
        isShortList={false}
      />
    </div>
  );
};
