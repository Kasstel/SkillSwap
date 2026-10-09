import type { FC } from "react";
import styles from "./loader.module.css";

interface LoaderProps {
  size?: number;
  fullPage?: boolean;
  label?: string;
}

export const Loader: FC<LoaderProps> = ({
  size = 48,
  fullPage = false,
  label = "Загрузка",
}) => (
  <div
    className={`${styles.wrapper} ${fullPage ? styles.fullPage : ""}`}
    role="status"
    aria-label={label}
  >
    <span
      className={styles.spinner}
      style={{ width: size, height: size, borderWidth: Math.max(2, size / 10) }}
    />
  </div>
);
