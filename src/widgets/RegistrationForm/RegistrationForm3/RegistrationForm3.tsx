import React, { useState, type ChangeEvent } from "react";

import schoolBoardIcon from "@assets/images/school-board.svg";

import { Button } from "@shared/ui/button/button";
import { FormInputUI } from "@shared/ui/form-input/form-input";
import { StepIndicator } from "@shared/ui/stepIndicator/stepIndicator";
import {
  validateDescription,
  validateFormStep3,
  validateSkillCategory,
  validateSkillImage,
  validateSkillName,
  validateSkillSubCategory,
} from "../utils/validation";
import styles from "./RegistrationForm3.module.css";
import { Dropdown } from "@shared/ui/dropdown/dropdown";
import type {
  Category,
  CategoryWithSubcategories,
  Subcategory,
} from "@entities/Category/CategoryTypes";
import { FormTextArea } from "@shared/ui/text-area/text-area";
import { DragAndDropUI } from "@shared/ui/drag-and-drop/drag-and-drop";

interface RegistrationStep3Props {
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

export const RegistrationStep3: React.FC<RegistrationStep3Props> = ({
  onNextStep,
  onPrevStep,
  skillName,
  skillCategory,
  skillSubCategory,
  description,
  skillImage,
  setSkillName,
  setSkillCategory,
  setSkillSubCategory,
  setDescription,
  setSkillImage,
  categories,
}) => {
  const [errors, setErrors] = useState({
    skillName: "",
    skillCategory: "",
    skillSubCategory: "",
    description: "",
    skillImage: "",
  });

  // Удаляем локальное состояние values, так как теперь используем пропсы напрямую
  // Также удаляем зависимость от formData

  function getAllSubcategories(
    categoriesWithSubcategories: CategoryWithSubcategories[],
    categoryId?: string,
  ): Subcategory[] {
    const filteredCategories = categoryId
      ? categoriesWithSubcategories.filter((cat) => cat.id === categoryId)
      : categoriesWithSubcategories;

    return filteredCategories.flatMap((category) => category.subcategories);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "skillName") {
      setSkillName(value);
      const { message } = validateSkillName(value);
      setErrors((prev) => ({ ...prev, skillName: message || "" }));
    }
  };

  const handleCategoryChange = (value: string | string[]) => {
    const selectedCategory =
      categories.find((category) => category.id === value) || null;
    setSkillCategory(selectedCategory);
    const { message } = validateSkillCategory(selectedCategory);
    setErrors((prev) => ({ ...prev, skillCategory: message || "" }));
  };

  const handleSubCategoryChange = (value: string | string[]) => {
    const selectedSubCategory =
      getAllSubcategories(categories, skillCategory?.id).find(
        (subcategory) => subcategory.id === value,
      ) || null;
    setSkillSubCategory(selectedSubCategory);
    const { message } = validateSkillSubCategory(selectedSubCategory);
    setErrors((prev) => ({ ...prev, skillSubCategory: message || "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentValues = {
      skillName,
      skillCategory,
      skillSubCategory,
      description,
      skillImage,
    };
    const validation = validateFormStep3(currentValues);
    setErrors({
      skillName: validation.errors.skillName || "",
      skillCategory: validation.errors.skillCategory || "",
      skillSubCategory: validation.errors.skillSubCategory || "",
      description: validation.errors.description || "",
      skillImage: validation.errors.skillImage || "",
    });

    if (validation.isValid) {
      onNextStep();
    }
  };

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    const { name, value } = e.target;
    if (name === "description") {
      setDescription(value);
      const { message } = validateDescription(value);
      setErrors((prev) => ({ ...prev, description: message || "" }));
    }
  }

  const handleFileChange = (file: File | null) => {
    const fileUrl = file ? URL.createObjectURL(file) : "";
    setSkillImage(fileUrl);
    const { message } = validateSkillImage(fileUrl);
    setErrors((prev) => ({ ...prev, skillImage: message || "" }));
  };

  const currentValues = {
    skillName,
    skillCategory,
    skillSubCategory,
    description,
    skillImage,
  };
  const validationResult = validateFormStep3(currentValues);
  const isFormValid = validationResult.isValid;

  return (
    <div className={styles.wrapper}>
      <div className={styles.stepIndicatorContainer}>
        <StepIndicator currentStep={3} totalSteps={3} />
      </div>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <FormInputUI
              label="Название навыка"
              name="skillName"
              type="text"
              placeholder="Введите название навыка"
              value={skillName}
              onChange={handleInputChange}
              error={!!errors.skillName}
              helperText={errors.skillName}
            />

            <div className={styles.inputContainer}>
              <label className={styles.label}>Категория навыка</label>
              <Dropdown
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                type="select"
                placeholder="Выберите категорию навыка"
                onChange={handleCategoryChange}
              />
              {errors.skillCategory && (
                <span className={styles.errorText}>
                  {validateSkillCategory(skillCategory).message || "ERROR"}
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label}>Подкатегория навыка</label>
              <Dropdown
                options={
                  categories
                    .find((category) => category.id === skillCategory?.id)
                    ?.subcategories.map((subcategory) => ({
                      value: subcategory.id,
                      label: subcategory.name,
                    })) || []
                }
                type="select"
                placeholder="Выберите подкатегорию навыка"
                onChange={handleSubCategoryChange}
              />
              {errors.skillSubCategory && (
                <span className={styles.errorText}>
                  {validateSkillSubCategory(skillSubCategory).message ||
                    "ERROR"}
                </span>
              )}
            </div>

            <FormTextArea
              label="Описание"
              name="description"
              placeholder="Коротко опишите, чему можете научить"
              value={description}
              onChange={handleTextAreaChange}
              error={!!errors.description}
              helperText={errors.description}
            />

            <DragAndDropUI onFileChange={handleFileChange} />

            <div className={styles.buttonsContainer}>
              <Button
                type="secondary"
                htmlType="button"
                extraClass={styles.submitButton}
                onClick={onPrevStep}
              >
                Назад
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                extraClass={styles.submitButton}
                disabled={!isFormValid}
              >
                Продолжить
              </Button>
            </div>
          </form>
        </div>

        <div className={styles.descriptionContainer}>
          <div className={styles.icon}>
            <img src={schoolBoardIcon} alt="Изображение анкеты" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.title}>
              <p>Укажите, чем вы готовы поделиться</p>
            </div>
            <div className={styles.description}>
              <p>
                Так другие люди смогут увидеть ваши предложения и предложить вам
                обмен!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
