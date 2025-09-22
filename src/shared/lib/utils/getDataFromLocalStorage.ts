import type { User, UserInLocalStorage } from "@entities/User/types";
import { EventEmitterWrapper } from "../event/EventEmitter";
import { EventType } from "../event/EventType";
import type { UserSkill } from "@entities/Skill/SkillType";

export const getUserFromLocalStorage = (): UserInLocalStorage | null => {
  try {
    const userJSON = localStorage.getItem("user") as string;
    if (!userJSON) {
      console.log("Нет данных пользователя в localStorage");
      return null;
    }
    const parsedUser: UserInLocalStorage = JSON.parse(userJSON);
    return parsedUser;
  } catch (error) {
    console.log("Ошибка при парсинге пользователя из localStorage:", error);
    return null;
  }
};

export const updateUserInStorage = (data: Partial<UserInLocalStorage>) => {
  localStorage.setItem("user", JSON.stringify(data));
  const user = getUserFromLocalStorage();
  EventEmitterWrapper.publish(EventType.updateUser, user);
};

export const getLikedSkills = (): string[] | null => {
  try {
    const likedSkillsJSON = localStorage.getItem("likedSkills");
    if (!likedSkillsJSON) {
      localStorage.setItem("likedSkills", JSON.stringify([]));
      return [];
    }
    const parsedLikedSkills = JSON.parse(likedSkillsJSON);
    return parsedLikedSkills;
  } catch (error) {
    console.log(
      "Ошибка при парсинге лайков пользователя из localStorage:",
      error,
    );
    return null;
  }
};

export const toggleLikedSkillsInStorage = (skillId: string): void => {
  try {
    const likedSkills = getLikedSkills();
    let result = [];
    if (!likedSkills) {
      // Обработка ситуации, когда возвращается null
      result.push(skillId);
    } else {
      const indexLike = likedSkills.indexOf(skillId);
      indexLike !== -1
        ? likedSkills.splice(indexLike, 1)
        : likedSkills.push(skillId);
      result = likedSkills;
    }
    localStorage.setItem("likedSkills", JSON.stringify(result));
    EventEmitterWrapper.publish(EventType.updateLikedUser, result);
  } catch (error) {
    console.log("Ошибка при переключении лайка", error);
  }
};

export const getAuth = () => {
  const isAuth = localStorage.getItem("isAuthenticated");
  return isAuth;
};

export const addRequestSwap = (
  userForSwap: User,
  skillForSwap: UserSkill,
): void => {
  const request = localStorage.getItem("Request");
  let result = [];
  if (!request) {
    result.push({ userForSwap: userForSwap, skillForSwap: skillForSwap });
  } else {
    const requestParse = JSON.parse(request!);
    requestParse.push({ userForSwap: userForSwap, skillForSwap: skillForSwap });
    result = requestParse;
  }
  localStorage.setItem("Request", JSON.stringify(result));
};
