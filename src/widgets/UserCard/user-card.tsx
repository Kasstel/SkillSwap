import { useEffect, useLayoutEffect, useState, type FC } from "react";
import styles from "./user-card.module.css";
import { Tag } from "@shared/ui/tag/tag";
import { Button } from "@shared/ui/button/button";
import type { UserCardProps } from "./type";
import { useNavigate } from "react-router-dom";
import {
  getLikedSkills,
  toggleLikedSkillsInStorage,
} from "@shared/lib/utils/getDataFromLocalStorage";
import { getAgeWithDeclension } from "@shared/lib/utils/ageDeclension";
import isEqual from "lodash/isEqual";
import ClockIcon from "@assets/icons/clock.svg?react";

export const UserCard: FC<UserCardProps> = ({
  user,
  onLikeClick,
  onButtonClick,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isHasSwap, setIsHasSwap] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const likedSkills = getLikedSkills();
    setIsLiked(likedSkills?.includes(user.id));
  }, [user]);

  useLayoutEffect(() => {
    const reqString = localStorage.getItem("Request");
    if (!reqString) {
      return;
    }
    const req = JSON.parse(reqString);
    const hasSwap = req.some(
      //проверяем, был ли уже предложен обмен
      (item: any) => isEqual(item.userForSwap.id, user.id),
    );
    setIsHasSwap(hasSwap);
  }, []);

  const handleDetailsClick = () => {
    if (onButtonClick) {
      onButtonClick(user.id);
    }
    // Переходим на страницу /skill с передачей пользователя
    navigate(`/skill/${user.id}`, { state: { user } });
  };

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    toggleLikedSkillsInStorage(user.id);
    onLikeClick?.(user.id);
  };

  return (
    <div className={styles.card}>
      <button
        type="button"
        className={`${styles.card__like_button} ${isLiked ? styles.liked : ""}`}
        onClick={handleLikeClick}
      ></button>
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
      <div>
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

      {isHasSwap ? (
        <Button
          type="secondary"
          htmlType="button"
          onClick={handleDetailsClick}
          extraClass={styles.card__button}
          startIcon={<ClockIcon />}
        >
          Обмен предложен
        </Button>
      ) : (
        <Button
          type="primary"
          htmlType="button"
          onClick={handleDetailsClick}
          extraClass={styles.card__button}
        >
          Подробнее
        </Button>
      )}
    </div>
  );
};
