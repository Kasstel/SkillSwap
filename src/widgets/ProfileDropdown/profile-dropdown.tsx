import { type FC } from "react";
import style from "./profile-dropdown.module.css";
import { NavLink } from "react-router-dom";
import logoutIcon from "@assets/icons/logout.svg";
import { useEffect, useRef } from "react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
}

export const ProfileDropdown: FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  handleLogout,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Обработчик клика вне дропдауна
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={style.dropdown} ref={dropdownRef}>
      <div className={style.wrapper}>
        <NavLink to={"/profile"} className={style.link} onClick={onClose}>
          Личный кабинет
        </NavLink>
        <button className={style.logoutButton} onClick={handleLogout}>
          <span>Выйти из аккаунта</span>
          <div className={style.logoutIcon}>
            <img src={logoutIcon} alt="Изображение выхода" />
          </div>
        </button>
      </div>
    </div>
  );
};
