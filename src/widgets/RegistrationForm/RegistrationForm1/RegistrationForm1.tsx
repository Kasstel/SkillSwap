import React, { useState } from "react";
import Google from "@assets/icons/google.svg?react";
import Apple from "@assets/icons/apple.svg?react";
import lightIcon from "@assets/images/light-bulb.svg";
import { Button } from "@shared/ui/button/button";
import { FormInputUI } from "@shared/ui/form-input/form-input";
import { StepIndicator } from "@shared/ui/stepIndicator/stepIndicator";
import {
  validateEmail,
  validatePassword,
  validateForm,
} from "../utils/validation";
import styles from "./RegistrationForm1.module.css";

interface RegistrationStep1Props {
  onNextStep: () => void;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  mode?: "register" | "login";
}

export const RegistrationStep1: React.FC<RegistrationStep1Props> = ({
  onNextStep,
  email,
  password,
  setEmail,
  setPassword,
  mode = "register",
}) => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      const { message } = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: message || "" }));
    } else if (name === "password") {
      setPassword(value);
      const { message } = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: message || "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(email, password);
    setErrors({
      email: validation.errors.email || "",
      password: validation.errors.password || "",
    });

    if (validation.isValid) {
      onNextStep();
    }
  };

  const isFormValid =
    !validateEmail(email).message &&
    !validatePassword(password).message &&
    email.trim() !== "" &&
    password.trim() !== "";

  return (
    <div className={styles.wrapper}>
      <div className={styles.stepIndicatorContainer}>
        {mode === "register" ? (
          <StepIndicator currentStep={1} totalSteps={3} />
        ) : (
          <h2 className={styles.title}>Вход</h2>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Button
              type="tertiary"
              extraClass={styles.socialButton}
              htmlType="button"
            >
              <div className={styles.socialButtonContent}>
                <Google className={styles.socialIcon} />
                <span>Продолжить с Google</span>
              </div>
            </Button>

            <Button
              type="tertiary"
              extraClass={styles.socialButton}
              htmlType="button"
            >
              <div className={styles.socialButtonContent}>
                <Apple className={styles.socialIcon} />
                <span>Продолжить с Apple</span>
              </div>
            </Button>

            <div className={styles.separator}>
              <div className={styles.separatorLine} />
              <span>или</span>
              <div className={styles.separatorLine} />
            </div>

            <FormInputUI
              label="Email"
              name="email"
              type="email"
              placeholder={"Введите ваш emai"}
              value={email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <FormInputUI
              label="Пароль"
              name="password"
              type="password"
              placeholder={
                mode === "register"
                  ? "Придумайте надёжный пароль"
                  : "Введите ваш пароль"
              }
              value={password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button
              type="primary"
              htmlType="submit"
              extraClass={styles.submitButton}
              disabled={!isFormValid}
            >
              {mode === "register" ? "Далее" : "Войти"}
            </Button>

            {mode === "login" && (
              <div className={styles.bottomLink}>
                <a href="/reg">Зарегистрироваться</a>
              </div>
            )}
          </form>
        </div>

        <div className={styles.descriptionContainer}>
          <div className={styles.icon}>
            <img src={lightIcon} alt="Добро пожаловать" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.title}>
              <p>Добро пожаловать в SkillSwap!</p>
            </div>
            <div className={styles.description}>
              <p>
                Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками
                с другими людьми
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
