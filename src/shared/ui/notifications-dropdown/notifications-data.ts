import like from "@assets/icons/like.svg";
import idea from "@assets/icons/idea.svg";
import userIcon from "@assets/icons/user.svg";
import type { INotificationItem } from "./type";

// Заглушка: заменить на реальные данные, когда появится источник уведомлений
export const NotificationItems: INotificationItem[] = [
  {
    id: "like",
    title: "Здесь будут появляться уведомления!!",
    time: "1 минуту назад",
    icon: like,
    isRead: false,
  },
  {
    id: "profile",
    title: "Заполните профиль, чтобы вас чаще находили",
    time: "2 минуты назад",
    icon: userIcon,
    isRead: true,
  },
  {
    id: "welcome",
    title: "Добро пожаловать в SkillSwap",
    time: "2 минуты назад",
    icon: idea,
    isRead: true,
  },
];
