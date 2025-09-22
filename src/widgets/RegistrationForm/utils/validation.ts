import type { Category, Subcategory } from "@entities/Category/CategoryTypes";

type TValidateResponse = {
  isValid: boolean;
  message?: string;
};

export const validateEmail = (email: string): TValidateResponse => {
  if (!email) return { isValid: false, message: "Email обязателен" };

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email))
    return { isValid: false, message: "Некорректный формат email" };

  if (email.length > 254)
    return { isValid: false, message: "Email слишком длинный" };

  return { isValid: true };
};

export const validatePassword = (password: string): TValidateResponse => {
  if (!password) return { isValid: false, message: "Пароль обязателен" };

  if (password.length < 8)
    return {
      isValid: false,
      message: "Пароль должен содержать не менее 8 символов",
    };

  if (password.length > 64)
    return {
      isValid: false,
      message: "Пароль должен содержать не более 64 символов",
    };

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Добавьте хотя бы одну заглавную букву" };
  }

  if (!/\d/.test(password)) {
    return { isValid: false, message: "Добавьте хотя бы одну цифру" };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: "Добавьте хотя бы один спецсимвол" };
  }

  const weakPasswords = ["password", "12345678", "qwertyui"];
  if (weakPasswords.includes(password.toLowerCase())) {
    return { isValid: false, message: "Этот пароль слишком простой" };
  }

  return { isValid: true };
};

export const validateForm = (email: string, password: string) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid,
    errors: {
      email: emailValidation.message,
      password: passwordValidation.message,
    },
  };
};

export type FormErrors = {
  name: string;
  birthDate: string;
  gender: string;
  city: string;
  categories: string;
  subcategories: string;
};

export const validateFormInfo = (formData: {
  name: string;
  birthDate: number;
  gender: string;
  city: string;
  categories: string[];
  subcategories: string[];
}): { isValid: boolean; errors: FormErrors } => {
  const now = new Date();
  const birthDate = formData.birthDate ? new Date(formData.birthDate) : null;
  const isBirthDateValid = birthDate ? birthDate && birthDate <= now : false;

  const errors = {
    name: !formData.name ? "Это поле обязательно" : "",
    birthDate: !formData.birthDate
      ? "Это поле обязательно"
      : !isBirthDateValid
        ? "Дата рождения не может быть в будущем"
        : "",
    gender: !formData.gender ? "Это поле обязательно" : "",
    city: !formData.city ? "Это поле обязательно" : "",
    categories:
      formData.categories.length === 0 ? "Выберите хотя бы одну категорию" : "",
    subcategories:
      formData.subcategories.length === 0
        ? "Выберите хотя бы одну подкатегорию"
        : "",
  };

  const isValid =
    !Object.values(errors).some((error) => error) && isBirthDateValid;

  return { isValid, errors };
};

export const validateDescription = (value: string) => {
  if (!value.trim()) {
    return { message: "Описание обязательно для заполнения" };
  }
  if (value.length < 10) {
    return { message: "Описание должно содержать минимум 10 символов" };
  }
  if (value.length > 500) {
    return { message: "Описание не должно превышать 500 символов" };
  }
  return { isValid: true };
};

export const validateSkillImage = (value: string) => {
  if (!value.trim()) {
    return { message: "Изображение навыка обязательно для заполнения" };
  }
  return { isValid: true };
};
export const validateSkillCategory = (category: Category | null) => {
  if (!category) {
    return { message: "Категория навыка обязательна для выбора" };
  }
  return { isValid: true };
};

export const validateSkillName = (value: string) => {
  if (!value.trim()) {
    return { message: "Название навыка обязательно для заполнения" };
  }
  if (value.length < 2) {
    return { message: "Название навыка должно содержать минимум 2 символа" };
  }
  return { isValid: true };
};

export const validateSkillSubCategory = (subcategory: Subcategory | null) => {
  if (!subcategory) {
    return { message: "Подкатегория навыка обязательна для выбора" };
  }
  return { isValid: true };
};

export const validateFormStep3 = (values: {
  skillName: string;
  skillCategory: Category | null;
  skillSubCategory: Subcategory | null;
  description: string;
  skillImage: string;
}) => {
  const skillNameValidation = validateSkillName(values.skillName);
  const skillCategoryValidation = validateSkillCategory(values.skillCategory);
  const skillSubCategoryValidation = validateSkillSubCategory(
    values.skillSubCategory,
  );
  const descriptionValidation = validateDescription(values.description);
  const skillImageValidation = validateSkillImage(values.skillImage);

  return {
    isValid:
      skillNameValidation.isValid &&
      skillCategoryValidation.isValid &&
      skillSubCategoryValidation.isValid &&
      descriptionValidation.isValid &&
      skillImageValidation.isValid,
    errors: {
      skillName: skillNameValidation.message,
      skillCategory: skillCategoryValidation.message,
      skillSubCategory: skillSubCategoryValidation.message,
      description: descriptionValidation.message,
      skillImage: skillImageValidation.message,
    },
  };
};

export const validateInput = (value: string): TValidateResponse => {
  if (!value)
    return { isValid: false, message: "Поле обязательно для заполнения" };
  return { isValid: true };
};

export const validateDropdown = (
  value?: string | string[],
): TValidateResponse => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return { isValid: false, message: "Поле обязательно для заполнения" };
  }
  return { isValid: true };
};

export const validateDateOfBirth = (
  value: number | null,
): TValidateResponse => {
  const now = new Date();
  const birthDate = value ? new Date(value) : null;
  const isBirthDateValid = birthDate ? birthDate <= now : false;
  if (isBirthDateValid) {
    return { isValid: true };
  } else {
    const message = birthDate
      ? "Дата рождения не может быть в будущем"
      : "Поле обязательно для заполнения";
    return { isValid: false, message };
  }
};
