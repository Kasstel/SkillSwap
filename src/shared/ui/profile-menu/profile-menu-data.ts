import messageIcon from "@assets/icons/user.svg";
import requectIcon from "@assets/icons/request.svg";
import idea from "@assets/icons/idea.svg";
import like from "@assets/icons/like.svg";
import message from "@assets/icons/message-text.svg";
import type { IProfileMenuItem } from "./type";

export const ProfileMenuItems: IProfileMenuItem[] = [
  {
    id: "request",
    title: "Заявки",
    icon: requectIcon,
  },
  {
    id: "message",
    title: "Мои обмены",
    icon: message,
  },
  {
    id: "like",
    title: "Избранное",
    path: "/profile/favourites",
    icon: like,
  },
  {
    id: "idea",
    title: "Мои навыки",
    icon: idea,
  },
  {
    id: "myData",
    title: "Личные данные",
    path: "/profile",
    icon: messageIcon,
  },
];
