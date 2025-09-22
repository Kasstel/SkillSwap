import React, { useState } from "react";
import { RegistrationStep1 } from "@widgets/RegistrationForm/RegistrationForm1/RegistrationForm1";
import { RegistrationStep2 } from "@widgets/RegistrationForm/RegistrationForm2/RegistrationForm2";
import { RegistrationStep3 } from "@widgets/RegistrationForm/RegistrationForm3/RegistrationForm3";
import { categories as rawCategories } from "@public/db/skills_categories.json";
import { subcategories as rawSubcategories } from "@public/db/skills_subcategories.json";
import type {
  Category,
  CategoryWithSubcategories,
  Subcategory,
} from "@entities/Category/CategoryTypes";
import { useNavigate } from "react-router-dom";
import logo from "@assets/images/logo.svg";
import Cross from "@assets/icons/cross.svg?react";
import styles from "./RegistrationForm.module.css";
import { Button } from "@shared/ui/button/button";
import { convertFileToBase64 } from "@shared/lib/utils/convertFileToBase64";
import { RegistrationStep4 } from "@widgets/RegistrationForm/RegistrationForm4/RegistrationForm4.tsx";

const prepareCategories = (): CategoryWithSubcategories[] => {
  if (!Array.isArray(rawCategories)) {
    console.warn("Некорректные данные категорий: ожидался массив");
    return [];
  }

  if (!Array.isArray(rawSubcategories)) {
    console.warn("Некорректные данные подкатегорий: ожидался массив");
    return [];
  }

  return rawCategories
    .map((category) => {
      if (!category?.id || !category?.name) {
        console.warn(
          "Некорректная категория: отсутствует id или name",
          category,
        );
        return null;
      }

      const categorySubcategories = rawSubcategories
        .filter((sub) => {
          if (!sub?.id || !sub?.name || !sub?.categoryId) {
            console.warn(
              "Некорректная подкатегория: отсутствуют обязательные поля",
              sub,
            );
            return false;
          }
          return sub.categoryId === category.id;
        })
        .map((sub) => ({
          id: sub.id,
          name: sub.name,
          category: {
            id: category.id,
            name: category.name,
            color: category.color,
            icon: category.icon,
          },
        }));

      return {
        ...category,
        subcategories: categorySubcategories,
      };
    })
    .filter((c): c is CategoryWithSubcategories => c !== null);
};

const validateUserData = (data: {
  email: string;
  name: string;
  password: string;
  [key: string]: any;
}): boolean => {
  return !!data.email && !!data.name && !!data.password;
};

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<File | undefined>();

  const categoriesWithSubcategories = React.useMemo(prepareCategories, []);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState<Category | null>(null);
  const [skillSubCategory, setSkillSubCategory] = useState<Subcategory | null>(
    null,
  );
  const [description, setDescription] = useState("");
  const [skillImage, setSkillImage] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmitAll = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!email || !password || !name) {
        throw new Error("Заполните обязательные поля");
      }

      const userData = {
        email,
        name,
        password,
        birthDate: birthDate ? birthDate.getTime() : null,
        gender,
        city,
        categories,
        subcategories,
        skills: {
          name: skillName,
          category: skillCategory,
          subcategory: skillSubCategory,
          description,
        },
        avatar: avatar ? await convertFileToBase64(avatar) : null,
        skillImage,
      };

      if (validateUserData(userData)) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
      } else {
        localStorage.removeItem("user");
        throw new Error("Некорректные данные пользователя");
      }

      navigate("/reg-success", { state: { background: "/" } });
    } catch (err) {
      localStorage.removeItem("user");
      setError(err instanceof Error ? err.message : "Ошибка регистрации");
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <img src={logo} alt="SkillSwap Logo" className={styles.logo} />
          <Button
            type="secondary"
            onClick={handleClose}
            endIcon={<Cross className={styles.closeIcon} aria-hidden="true" />}
            extraClass={styles.closeButton}
          >
            Закрыть
          </Button>
        </div>
      </header>

      {error && (
        <div className={styles.errorMessage} role="alert" aria-live="assertive">
          {error}
        </div>
      )}

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loader}>Загрузка...</div>
        ) : (
          <>
            {step === 1 && (
              <RegistrationStep1
                onNextStep={nextStep}
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                mode="register"
              />
            )}

            {step === 2 && (
              <RegistrationStep2
                onNextStep={nextStep}
                onPrevStep={prevStep}
                name={name}
                birthDate={birthDate}
                gender={gender}
                city={city}
                categories={categories}
                subcategories={subcategories}
                avatar={avatar}
                setName={setName}
                setBirthDate={setBirthDate}
                setGender={setGender}
                setCity={setCity}
                setCategories={setCategories}
                setSubcategories={setSubcategories}
                setAvatar={setAvatar}
              />
            )}

            {step >= 3 && (
              <RegistrationStep3
                onNextStep={nextStep}
                onPrevStep={prevStep}
                categories={categoriesWithSubcategories}
                skillName={skillName}
                skillCategory={skillCategory}
                skillSubCategory={skillSubCategory}
                description={description}
                skillImage={skillImage}
                setSkillName={setSkillName}
                setSkillCategory={setSkillCategory}
                setSkillSubCategory={setSkillSubCategory}
                setDescription={setDescription}
                setSkillImage={setSkillImage}
              />
            )}

            {step === 4 && (
              <RegistrationStep4
                onNextStep={handleSubmitAll}
                onPrevStep={prevStep}
                categories={categoriesWithSubcategories}
                skillName={skillName}
                skillCategory={skillCategory}
                skillSubCategory={skillSubCategory}
                description={description}
                skillImage={skillImage}
                setSkillName={setSkillName}
                setSkillCategory={setSkillCategory}
                setSkillSubCategory={setSkillSubCategory}
                setDescription={setDescription}
                setSkillImage={setSkillImage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
