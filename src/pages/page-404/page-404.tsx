import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeaderUI } from "@widgets/Header";
import { Footer } from "@widgets/Footer/Footer";
import { Button } from "@shared/ui/button/button";
import error_404 from "@assets/images/error_404.svg";
import styles from "./page-404.module.css";

export const NotFound404: FC = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/");
  };

  return (
    <div className={styles.notFoundPage}>
      <AppHeaderUI />
      <main className={styles.main}>
        <img src={error_404} alt="Страница не найдена" />
        <div className={styles.containerWrap}>
          <div className={styles.textWrap}>
            <h2 className={styles.errorLabel}>Страница не найдена</h2>
            <span className={styles.errorText}>
              К сожалению, эта страница недоступна. Вернитесь на главную
              страницу или попробуйте позже
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
