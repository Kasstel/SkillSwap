import type { UserInLocalStorage } from "@entities/User/types";
import { getUserFromLocalStorage } from "@shared/lib/utils/getDataFromLocalStorage";
import { CardUserBig } from "@widgets/CardUserBig/card-user-big";
import { useState } from "react";
import styles from "./profile-skills.module.css";
import EmptySkillsIcon from "@assets/images/light-bulb.svg?react";

type UserSkillView = {
  name: string;
  category: string;
  subcategory: string;
  description: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const getName = (value: unknown): string =>
  isRecord(value) ? getString(value.name) : "";

// При регистрации навык сохраняется как { name, category, subcategory, description },
// что не совпадает с типом UserInLocalStorage["skills"], поэтому читаем с проверками
const getUserSkill = (
  user: UserInLocalStorage | null,
): UserSkillView | null => {
  const skill: unknown = user?.skills;
  if (!isRecord(skill)) {
    return null;
  }
  const name = getString(skill.name);
  if (!name) {
    return null;
  }
  return {
    name,
    category: getName(skill.category),
    subcategory: getName(skill.subcategory),
    description: getString(skill.description),
  };
};

export const ProfileSkills = () => {
  const [user] = useState(getUserFromLocalStorage);
  const [isImageBroken, setIsImageBroken] = useState(false);

  const skill = getUserSkill(user);
  const skillImage = getString(user?.skillImage);

  if (!skill) {
    return (
      <div className={styles.skills_empty_container}>
        <EmptySkillsIcon className={styles.empty_skills_icon} />
        <p className={styles.empty_message}>
          Здесь пока пусто... Расскажи, чему можешь научить других.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.skills_container}>
      <h2 className={styles.title}>Мои навыки</h2>
      <CardUserBig
        title={skill.name}
        category={skill.category || "Без категории"}
        subcategory={skill.subcategory || "Без подкатегории"}
        description={skill.description || "Описание пока не добавлено"}
        photoSlot={
          skillImage && !isImageBroken ? (
            <img
              src={skillImage}
              alt={`Изображение навыка «${skill.name}»`}
              className={styles.skill_image}
              onError={() => setIsImageBroken(true)}
            />
          ) : undefined
        }
      />
    </div>
  );
};
