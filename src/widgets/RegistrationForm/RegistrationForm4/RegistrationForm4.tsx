import React, { useCallback, useState } from "react";
import type {
  Category,
  CategoryWithSubcategories,
  Subcategory,
} from "@entities/Category/CategoryTypes.ts";
import { CardUserBig } from "@widgets/CardUserBig/card-user-big.tsx";
import { Button } from "@shared/ui/button/button.tsx";
import { PhotoSwitcherUI } from "@shared/ui/photo-switcher";
import { Modal } from "@shared/ui/modal/modal.tsx";
import Edit from "@assets/icons/edit.svg?react";
import styles from "./RegistrationForm4.module.css";

interface RegistrationStep4Props {
  onNextStep: () => void;
  onPrevStep: () => void;
  categories: CategoryWithSubcategories[];
  skillName: string;
  skillCategory: Category | null;
  skillSubCategory: Subcategory | null;
  description: string;
  skillImage: string;
  setSkillName: (name: string) => void;
  setSkillCategory: (category: Category | null) => void;
  setSkillSubCategory: (subcategory: Subcategory | null) => void;
  setDescription: (description: string) => void;
  setSkillImage: (image: string) => void;
}

export const RegistrationStep4: React.FC<RegistrationStep4Props> = ({
  onNextStep,
  onPrevStep,
  skillName,
  skillCategory,
  skillSubCategory,
  description,
  skillImage,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const handleClose = useCallback(() => {
    setIsPreviewOpen(false);
    onPrevStep(); // на третий шаг обратно
  }, [onPrevStep]);

  return isPreviewOpen ? (
    <Modal onClose={handleClose} noPadding>
      <CardUserBig
        header={
          <div className={styles.headerCardUserBigText}>
            <div className={styles.headerTitle}>Ваше предложение</div>
            <div className={styles.headerWarning}>
              Пожалуйста, проверьте и подтвердите правильность данных
            </div>
          </div>
        }
        title={skillName}
        category={skillCategory?.name ?? ""}
        subcategory={skillSubCategory?.name ?? ""}
        description={description}
        buttonsSlot={
          <div style={{ display: "flex", gap: 12 }}>
            <Button
              type="secondary"
              htmlType="button"
              onClick={() => {
                setIsPreviewOpen(false);
                onPrevStep();
              }}
              endIcon={<Edit />}
            >
              Редактировать
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={() => {
                setIsPreviewOpen(false);
                onNextStep();
              }}
            >
              Готово
            </Button>
          </div>
        }
        photoSlot={<PhotoSwitcherUI skillId={skillImage} />}
      ></CardUserBig>
    </Modal>
  ) : null;
};
