import type React from "react";
import { NavLink } from "react-router-dom";
import like from "@assets/icons/like.svg";
import defaultUserIcon from "@assets/icons/default-user-icon.png";
import styles from "./header-logged-in.module.css";
import { NotificationsDropdown } from "@shared/ui/notifications-dropdown/notifications-dropdown";
import { NotificationItems } from "@shared/ui/notifications-dropdown/notifications-data";
import type { INotificationItem } from "@shared/ui/notifications-dropdown/type";

type Props = {
  name: string;
  avatar?: string;
  handleClick: () => void;
  notifications?: INotificationItem[];
};

export const HeaderLoggedIn: React.FC<Props> = ({
  name,
  avatar,
  handleClick,
  notifications = NotificationItems,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <NotificationsDropdown notifications={notifications} />
        <NavLink to="/profile/favourites" className={styles.link} end>
          <button type="button" className={styles.button}>
            <img src={like} alt="Избранное." className={styles.icon} />
          </button>
        </NavLink>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className={`${styles.button} ${styles.userInfoButton}`}
      >
        <span className={styles.userName}>{name}</span>
        <img
          src={avatar ?? defaultUserIcon}
          alt="Аватар пользователя."
          className={styles.userAvatar}
        />
      </button>
    </div>
  );
};
