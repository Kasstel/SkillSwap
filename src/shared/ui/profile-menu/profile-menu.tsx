import { type FC } from "react";
import styles from "./profile-menu.module.css";
import { NavLink, useLocation } from "react-router-dom";
import type { IProfileMenuItemProps, IProfileMenuProps } from "./type";

const ProfileMenuItem = ({ item, isActive }: IProfileMenuItemProps) => {
  if (item.path) {
    return (
      <NavLink
        to={item.path}
        className={`${styles.sidebar_item} ${isActive ? styles.sidebar_item__active : ""}`}
        end
      >
        <img src={item.icon} alt="icon"></img>
        <span className={styles.sidebar_item__title}>{item.title}</span>
      </NavLink>
    );
  }
  return (
    <li
      className={`${styles.sidebar_item} ${isActive ? styles.sidebar_item__active : ""}`}
    >
      <img src={item.icon} alt="icon"></img>
      <span className={styles.sidebar_item__title}>{item.title}</span>
    </li>
  );
};

export const ProfileMenuUI: FC<IProfileMenuProps> = (
  profileMenuProps: IProfileMenuProps,
) => {
  const location = useLocation();
  const { profileMenuItems } = profileMenuProps;
  const activeItem = profileMenuItems.find((item) => {
    if (!item.path) return false;
    if (item.path === "/") return location.pathname === "/";
    return (
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/")
    );
  });

  return (
    <aside className={styles.sidebar_cover}>
      {profileMenuItems.map((item) => {
        const isActive = activeItem?.id === item.id;
        return (
          <ProfileMenuItem key={item.id} item={item} isActive={isActive} />
        );
      })}
    </aside>
  );
};
