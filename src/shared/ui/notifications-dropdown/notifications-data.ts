import requestIcon from "@assets/icons/request.svg";
import like from "@assets/icons/like.svg";
import idea from "@assets/icons/idea.svg";
import userIcon from "@assets/icons/user.svg";
import type { INotificationItem } from "./type";

// Заглушка: заменить на реальные данные, когда появится источник уведомлений
export const NotificationItems: INotificationItem[] = [
  {
    id: "request",
    title: "Новая заявка на обмен",
    time: "5 минут назад",
    icon: requestIcon,
    isRead: false,
  },
  {
    id: "like",
    title: "Ваш навык добавили в избранное",
    time: "2 часа назад",
    icon: like,
    isRead: false,
  },
  {
    id: "profile",
    title: "Заполните профиль, чтобы вас чаще находили",
    time: "Вчера",
    icon: userIcon,
    isRead: true,
  },
  {
    id: "welcome",
    title: "Добро пожаловать в SkillSwap",
    time: "3 дня назад",
    icon: idea,
    isRead: true,
  },
];
