import type { FC } from 'react'
import styles from './UserCardSkillInfo.module.css'
import { Tag } from '@shared/ui/tag/tag'
import type {User} from "@entities/User/types.ts";
import { getAgeWithDeclension } from "@shared/lib/utils/ageDeclension";


export type UserCardSkillProps = {
  user: User;
};
export const UserCardSkillInfo: FC<UserCardSkillProps> = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <img
          src={user.photo}
          alt="Аватар пользователя"
          className={styles.card__avatar}
        />
        <div className={styles.card__title}>
          <span className={styles.card__user_name_title}>{user.name}</span>
          <span className={styles.card__user_description}>
						{user.city.name}, {getAgeWithDeclension(user.age)}
					</span>
        </div>
      </div>
      <div className={styles.card__allSkills}>
        <div className={styles.card__skills}>
          <span className={styles.card__skills_title}>Может научить:</span>
          <div className={styles.card__skills_list}>
            {user.teachingSkills.length <= 2
              ? user.teachingSkills.map((skill) => (
                  <Tag
                    key={skill.id}
                    label={skill.name}
                    backgroundColor={skill.category.color}
                  />
                ))
              : user.teachingSkills
                  .slice(0, 2)
                  .map((skill) => (
                    <Tag
                      key={skill.id}
                      label={skill.name}
                      backgroundColor={"#E0F7FA"}
                    />
                  ))}
            {user.teachingSkills.length > 2 && (
              <Tag
                label={`+${user.teachingSkills.length - 2}`}
                backgroundColor={"#E8ECF7"}
              />
            )}
          </div>
        </div>
        <div className={styles.card__skills}>
          <span className={styles.card__skills_title}>Хочет научиться:</span>
          <div className={styles.card__skills_list}>
            {user.wantToLearnSkills.length <= 2
              ? user.wantToLearnSkills.map((skill) => (
                  <Tag
                    key={skill.id}
                    label={skill.name}
                    backgroundColor={skill.category.color}
                  />
                ))
              : user.wantToLearnSkills
                  .slice(0, 2)
                  .map((skill) => (
                    <Tag
                      key={skill.id}
                      label={skill.name}
                      backgroundColor={"#E0F7FA"}
                    />
                  ))}
            {user.wantToLearnSkills.length > 2 && (
              <Tag
                label={`+${user.wantToLearnSkills.length - 2}`}
                backgroundColor={"#E8ECF7"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
