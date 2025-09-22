import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { RegistrationStep1 } from "@widgets/RegistrationForm/RegistrationForm1/RegistrationForm1.tsx";
import styles from "../RegistrationPage/RegistrationForm.module.css";
import logo from "@assets/images/logo.svg";
import { Button } from "@shared/ui/button/button.tsx";
import closeIcon from "@assets/icons/cross.svg";
import { usePreviousUrl } from "@shared/hooks/usePreviousUrl";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { getPreviousUrl, clearPreviousUrl } = usePreviousUrl();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);

    try {
      const userDataString = localStorage.getItem("user");

      if (!userDataString) {
        throw new Error("Пользователь не найден. Зарегистрируйтесь.");
      }

      const userData = JSON.parse(userDataString);

      if (userData.email !== email) {
        throw new Error("Неверный email");
      }

      // В реальном приложении пароль не храним в localStorage и должен проверяться через хеширование!
      if (userData.password !== password) {
        throw new Error("Неверный пароль");
      }

      // Сохраняем флаг авторизации
      localStorage.setItem("isAuthenticated", "true");

      // Получаем предыдущий URL и перенаправляем туда
      const previousUrl = getPreviousUrl();
      clearPreviousUrl(); // Очищаем сохраненный URL
      navigate(previousUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
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
            endIcon={
              <img src={closeIcon} alt="Закрыть" className={styles.closeIcon} />
            }
            extraClass={styles.closeButton}
          >
            Закрыть
          </Button>
        </div>
      </header>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {isLoading ? (
        <div className={styles.loader}>Вход...</div>
      ) : (
        <RegistrationStep1
          onNextStep={handleLogin}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          mode="login"
        />
      )}
    </div>
  );
};
