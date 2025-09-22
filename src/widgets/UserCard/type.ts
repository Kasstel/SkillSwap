import type { User } from "@entities/User/types";

export type UserCardProps = {
  user: User;
  onLikeClick?: (userId: string) => void;
  onButtonClick?: (userId: string) => void;
};
