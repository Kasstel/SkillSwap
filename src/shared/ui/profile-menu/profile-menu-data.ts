import messageIcon from "@assets/icons/user.svg";
import idea from "@assets/icons/idea.svg";
import like from "@assets/icons/like.svg";
import type { IProfileMenuItem } from "./type";

export const ProfileMenuItems: IProfileMenuItem[] = [
  {
    id: "like",
    title: "Избранное",
    path: "/profile/favourites",
    icon: like,
  },
  {
    id: "idea",
    title: "Мои навыки",
    path: "/profile/skills",
    icon: idea,
  },
  {
    id: "myData",
    title: "Личные данные",
    path: "/profile",
    icon: messageIcon,
  },
];
