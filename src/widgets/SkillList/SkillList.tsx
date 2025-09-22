import type { User } from "@entities/User/types";
import { UserCard } from "@widgets/UserCard/user-card";
import { Button } from "@shared/ui/button/button";
import styles from "./skill-list.module.css";
import { useCallback, useEffect, useState } from "react";
import ChevronRightIcon from "@assets/icons/chevron-right.svg?react";
import ChevronDownIcon from "@assets/icons/chevron-down.svg?react";

interface ISkillListProps {
  users: User[];
  title: string;
  onLikeClick?: (id: string) => void;
  onButtonClick?: (id: string) => void;
  isShortList?: boolean; //отображаем короткий список или выводим все карточки
}

const SkillList = ({
  users,
  title,
  isShortList = false,
  onLikeClick,
}: ISkillListProps) => {
  const [usersToShow, setUsersToShow] = useState<User[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    const listUsers = isShortList ? users.slice(0, 3) : users;
    setUsersToShow(listUsers);
  }, [isShortList, users]);

  const onButtonMoreClick = useCallback(() => {
    setUsersToShow(users);
    setIsExpanded(true);
  }, [users]);

  const onButtonLessClick = useCallback(() => {
    setIsExpanded(false);
    setUsersToShow(users.slice(0, 3));
  }, [users]);

  return (
    <div className={styles.skill_list}>
      <div className={styles.list__header}>
        <h3 className={styles.header__title}>{title}</h3>
        {isShortList &&
          (isExpanded ? (
            <Button
              type="tertiary"
              htmlType="button"
              onClick={onButtonLessClick}
              endIcon={<ChevronDownIcon />}
            >
              Свернуть
            </Button>
          ) : (
            <Button
              type="tertiary"
              htmlType="button"
              onClick={onButtonMoreClick}
              endIcon={<ChevronRightIcon />}
            >
              Смотреть все
            </Button>
          ))}
      </div>
      <div className={styles.cards_container}>
        {usersToShow.map((user) => (
          <UserCard user={user} onLikeClick={onLikeClick} key={user.id} />
        ))}
      </div>
    </div>
  );
};

export default SkillList;
