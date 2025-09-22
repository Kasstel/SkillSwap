import { fetchUsersData } from "@api/User/User-api";
import type { User } from "@entities/User/types";
import { getLikedSkills } from "@shared/lib/utils/getDataFromLocalStorage";
import SkillList from "@widgets/SkillList/SkillList";
import { useEffect, useState } from "react";
import styles from "./profile-favourites.module.css";
import EmptyFavouritesIcon from "@assets/icons/empty_favourites.svg?react";
export const ProfileFavourites = () => {
  const [likedUsers, setLikedUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsersData();
        const likesUserId = getLikedSkills();
        const likedUserArray = usersData.filter((user) =>
          likesUserId?.includes(user.id),
        );
        setLikedUsers(likedUserArray);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };
    loadData();
  }, []);

  const handleLikeClick = (id: string) => {
    const updateLikedUsers = likedUsers.filter((user) => user.id !== id);
    setLikedUsers(updateLikedUsers);
  };

  return (
    <>
      {likedUsers.length === 0 ? (
        <div className={styles.favourites_empty_container}>
          <EmptyFavouritesIcon className={styles.empty_favourites_icon} />
          <p className={styles.empty_message}>
            Ты ещё никого не добавил... Это как вечеринка без гостей.
          </p>
        </div>
      ) : (
        <div className={styles.skill_list__container}>
          <SkillList
            users={likedUsers}
            title="Избранное"
            onLikeClick={handleLikeClick}
          />
        </div>
      )}
    </>
  );
};
