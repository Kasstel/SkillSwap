import orderBy from "lodash/orderBy";
import keyBy from "lodash/keyBy";
import map from "lodash/map";
import type { User, Skill } from "@entities/User/types";

export const sortUsersByCreatedAt = (users: User[], skillsUsers: Skill[]) => {
  const skillsByAuthorId = keyBy(skillsUsers, "authorId");
  const usersWithDate = map(users, (user) => ({
    ...user,
    createdAt: skillsByAuthorId[user.id].createdAt,
  }));
  return orderBy(usersWithDate, ["createdAt"], ["desc"]);
};
