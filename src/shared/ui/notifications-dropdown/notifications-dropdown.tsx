import { type FC, useEffect, useRef, useState } from "react";
import notification from "@assets/icons/notification.svg";
import styles from "./notifications-dropdown.module.css";
import type { INotificationsDropdownProps } from "./type";

export const NotificationsDropdown: FC<INotificationsDropdownProps> = ({
  notifications,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  // Закрытие по клику вне дропдауна и по Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsOpen((prevState) => !prevState)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img src={notification} alt="Уведомления." className={styles.icon} />
        {unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Уведомления</h3>
            {notifications.length === 0 ? (
              <p className={styles.empty}>Новых уведомлений пока нет</p>
            ) : (
              <ul className={styles.list}>
                {notifications.map((item) => (
                  <li
                    key={item.id}
                    className={`${styles.item} ${item.isRead ? "" : styles.item__unread}`}
                  >
                    <div className={styles.item__icon}>
                      <img src={item.icon} alt="" />
                    </div>
                    <div className={styles.item__content}>
                      <span className={styles.item__title}>{item.title}</span>
                      <span className={styles.item__time}>{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
