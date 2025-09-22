import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeaderUI } from "@widgets/Header";
import { Footer } from "@widgets/Footer/Footer";
import { Button } from "@shared/ui/button/button";
import error_500 from "@assets/images/error_500.svg";
import styles from "./../page-404/page-404.module.css";

export const ConnetcError500: FC = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/");
  };

  return (
    <div className={styles.notFoundPage}>
      <AppHeaderUI />
      <main className={styles.main}>
        <img src={error_500} alt="Ошибка сервера" />
        <div className={styles.containerWrap}>
          <div className={styles.textWrap}>
            <h2 className={styles.errorLabel}>На сервере произошла ошибка</h2>
            <span className={styles.errorText}>
              Попробуйте позже или вернитесь на главную страницу
            </span>
          </div>
          <Button extraClass={styles.customButton} onClick={handleClickButton}>
            <span className={styles.button}>Домой</span>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
