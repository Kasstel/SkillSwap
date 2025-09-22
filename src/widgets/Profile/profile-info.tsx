import styles from "./profile-info.module.css";
import { FormInputUI } from "@shared/ui/form-input";
import { FormTextArea } from "@shared/ui/text-area/text-area";
import { Button } from "@shared/ui/button/button";
import { Dropdown } from "@shared/ui/dropdown/dropdown";
import {
  cityOptions,
  genderOptions,
} from "@shared/ui/dropdown/dropdownConstants";
import { DatePicker } from "@shared/ui/date-picker/date-picker";
import { useEffect, useRef, useState, type FC } from "react";
import EditIconGallery from "@assets/icons/gallery-edit.svg?react";
import defaultIcon from "@assets/icons/default-user-icon.png";
import {
  validateDateOfBirth,
  validateDescription,
  validateDropdown,
  validateEmail,
  validateInput,
  validatePassword,
} from "@widgets/RegistrationForm/utils/validation";
import isEqual from "lodash/isEqual";
import EditIcon from "@assets/icons/edit.svg?react";
import type { UserInLocalStorage } from "@entities/User/types";
import {
  getUserFromLocalStorage,
  updateUserInStorage,
} from "@shared/lib/utils/getDataFromLocalStorage";
import { convertFileToBase64 } from "@shared/lib/utils/convertFileToBase64";

const INITIAL_ERRORS = {
  name: "",
  email: "",
  password: "",
  gender: "",
  city: "",
  description: "",
  birthDate: "",
};

export const ProfileInfo: FC = () => {
  const user = getUserFromLocalStorage();
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [formValue, setFormValue] = useState<UserInLocalStorage>(() => {
    const user = getUserFromLocalStorage();
    return user
      ? {
          ...user,
          birthDate: user.birthDate ? new Date(user.birthDate) : null,
        }
      : ({} as UserInLocalStorage);
  });
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const isDisabled =
      isEqual(user, formValue) || !isEqual(INITIAL_ERRORS, errors);
    setIsDisabledButton(isDisabled);
  }, [user, formValue, errors]);

  const handleInputChange =
    (field: keyof UserInLocalStorage) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { message } = validateInput(e.target.value);
      setErrors((prev) => ({ ...prev, [field]: message || "" }));
      setData(field, e.target.value);
    };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { message } = validateEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: message || "" }));
    setData("email", e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { message } = validatePassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: message || "" }));
    setData("password", e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { message } = validateDescription(e.target.value);
    setErrors((prev) => ({ ...prev, description: message || "" }));
    setData("description", e.target.value);
  };

  const handleGenderChange = (value: string | string[]) => {
    if (typeof value === "string") {
      const { message } = validateDropdown(value);
      setErrors((prev) => ({ ...prev, gender: message || "" }));
      setData("gender", value);
    }
  };

  const handleCityChange = (value: string | string[]) => {
    if (typeof value === "string") {
      const { message } = validateDropdown(value);
      setErrors((prev) => ({ ...prev, city: message || "" }));
      setData("city", value);
    }
  };

  const setData = <K extends keyof UserInLocalStorage>(
    field: K,
    value: UserInLocalStorage[K]
  ) => {
    setFormValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleShowPasswordField = () => {
    setShowPasswordField((showPasswordField) => !showPasswordField);
  };

  const handleChangeDate = (date: number | null) => {
    const dateObj = date ? new Date(date) : null;
    const { message } = validateDateOfBirth(date);
    setErrors((prev) => ({ ...prev, birthDate: message || "" }));
    setData("birthDate", dateObj);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Открываем диалог выбора файла
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAvatar = e.target.files?.[0];
    if (newAvatar) {
      try {
        const changeAvatar = await convertFileToBase64(newAvatar);
        setData("avatar", changeAvatar); // Обновляем аватар
        console.log("Аватар успешно изменен");
      } catch (error) {
        console.error("Ошибка при преобразовании файла в base64:", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      updateUserInStorage(formValue);
      console.log("Данные пользователя успешно сохранены в localStorage");
      setIsDisabledButton(true);
    } catch (error) {
      console.log("Ошибка при сохранении данных в localStorage:", error);
    }
  };

  return (
    <div className={styles.profile_info__container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInputUI
          label="Почта"
          name="email"
          type="email"
          placeholder="Введите email"
          value={formValue.email}
          onChange={handleEmailChange}
          error={!!errors.email}
          helperText={errors.email}
          icon={<EditIcon />}
        />
        <span
          className={styles.change_password_block}
          onClick={handleToggleShowPasswordField}
        >
          Изменить пароль
        </span>
        {showPasswordField && (
          <FormInputUI
            label="Пароль"
            name="password"
            type="password"
            placeholder="Введите ваш пароль"
            value={formValue.password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        )}

        <FormInputUI
          label="Имя"
          name="name"
          type="text"
          placeholder="Введите имя"
          value={formValue.name}
          onChange={handleInputChange("name")}
          error={!!errors.name}
          helperText={errors.name}
          icon={<EditIcon />}
        />
        <div className={styles.birth_gender_block}>
          <div className={styles.birth_block}>
            <label className={styles.label}>Дата рождения</label>
            <DatePicker
              onChange={(timestamp) => handleChangeDate(timestamp)}
              date={formValue.birthDate ? formValue.birthDate.getTime() : null}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
            />
          </div>
          <div className={styles.gender_block}>
            <label className={styles.label}>Пол</label>
            <Dropdown
              options={genderOptions}
              type="input"
              placeholder="Не выбран"
              value={formValue.gender}
              onChange={handleGenderChange}
              error={!!errors.gender}
              helperText={errors.gender}
            />
          </div>
        </div>
        <div>
          <label className={styles.label}>Город</label>
          <Dropdown
            options={cityOptions}
            type="input"
            placeholder="Не указан"
            value={formValue.city}
            onChange={handleCityChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </div>
        <FormTextArea
          label="О себе"
          placeholder="Расскажите немного о себе"
          value={formValue.description}
          onChange={handleDescriptionChange}
          helperText={errors.description}
          error={!!errors.description}
          withIcon={true}
        />
        <Button
          type="primary"
          extraClass={styles.button_save}
          htmlType="submit"
          disabled={isDisabledButton}
        >
          Сохранить
        </Button>
      </form>
      <div className={styles.card_wrapper}>
        <img
          src={(formValue.avatar as string) || defaultIcon}
          className={styles.card__avatar}
          alt="Аватар пользователя"
        />
        <EditIconGallery
          className={styles.edit_icon_gallery}
          onClick={handleImageClick}
        />
        <input
          type="file"
          id="avatar"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
        />
      </div>
    </div>
  );
};
