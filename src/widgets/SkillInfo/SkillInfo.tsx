import { CardUserBig } from "@widgets/CardUserBig/card-user-big.tsx";
import { Button } from "@shared/ui/button/button.tsx";
import styles from "./SkillInfo.module.css";
import LikeIcon from "@assets/icons/like.svg?react";
import LikeFillIcon from "@assets/icons/likeFill.svg?react";
import ShareIcon from "@assets/icons/share.svg?react";
import ClockIcon from "@assets/icons/clock.svg?react";
import MoreSquareIcon from "@assets/icons/more-square.svg?react";
import { UserCardSkillInfo } from "@widgets/SkillInfo/UserCardSkillInfo.tsx";
import { type FC, useEffect, useLayoutEffect, useState } from "react";
import type { User } from "@entities/User/types";
import type { UserSkill } from "@entities/Skill/SkillType.ts";
import { PhotoSwitcherUI } from "@shared/ui/photo-switcher";
import { Modal } from "@shared/ui/modal/modal";
import iconModal from "@assets/icons/notification.svg";
import {
  addRequestSwap,
  getAuth,
  getLikedSkills,
  toggleLikedSkillsInStorage,
} from "@shared/lib/utils/getDataFromLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import isEqual from "lodash/isEqual";

interface SkillInfoProps {
  user: User;
  skill: UserSkill | null;
}

export const SkillInfo: FC<SkillInfoProps> = ({ user, skill }) => {
  const [exchangeOffered, setExchangeOffered] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const likedSkills = getLikedSkills();
    setIsLiked(likedSkills?.includes(user.id));
  }, [user]);

  useLayoutEffect(() => {
    const reqString = localStorage.getItem("Request");
    if (!reqString) {
      return;
    }
    const req = JSON.parse(reqString);
    const hasSwap = req.some(
      //проверяем, был ли уже предложен обмен
      (item: any) =>
        isEqual(item.skillForSwap, skill) &&
        isEqual(item.userForSwap.id, user.id)
    );
    setExchangeOffered(hasSwap);
  }, []);

  const handleOfferClick = () => {
    const isAuth = getAuth();
    if (isAuth) {
      setExchangeOffered(true);
      setIsOpenModal(!isOpenModal);
      addRequestSwap(user, skill!);
    } else {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    toggleLikedSkillsInStorage(user.id);
  };

  // Проверяем наличие skill
  if (!skill) {
    return <div>Информация о навыке не найдена</div>;
  }

  return (
    <div className={styles.gridSkillInfo}>
      <UserCardSkillInfo user={user} />
      <CardUserBig
        user={user}
        header={
          <div className={styles.headerIcons}>
            <button className={styles.iconButton} onClick={handleLikeClick}>
              {isLiked ? <LikeFillIcon /> : <LikeIcon />}
            </button>
            <button className={styles.iconButton}>
              <ShareIcon />
            </button>
            <button className={styles.iconButton}>
              <MoreSquareIcon />
            </button>
          </div>
        }
        title={skill.name}
        description={skill.description}
        category={skill.category?.name || "Без категории"}
        subcategory={skill.subcategory?.name || ""}
        buttonsSlot={
          <Button
            style={{ width: "100%" }}
            onClick={handleOfferClick}
            type={exchangeOffered ? "secondary" : "primary"}
            startIcon={exchangeOffered ? <ClockIcon /> : undefined}
            disabled={exchangeOffered}
          >
            {exchangeOffered ? "Обмен предложен" : "Предложить обмен"}
          </Button>
        }
        // <PhotoSwitcherUI skillId/>
        photoSlot={<PhotoSwitcherUI skillId={skill.id} />}
      ></CardUserBig>
      {isOpenModal && (
        <Modal
          title="Вы предложили обмен"
          imageAlt="Иконка колокольчика"
          image={iconModal}
          onClose={() => setIsOpenModal(!isOpenModal)}
          description="Теперь дождитесь подтверждения. Вам придёт уведомление"
        >
          <Button type="primary" onClick={() => setIsOpenModal(!isOpenModal)}>
            Готово
          </Button>
        </Modal>
      )}
    </div>
  );
};
