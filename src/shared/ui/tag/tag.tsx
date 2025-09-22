import type { FC } from "react";
import styles from "./tag.module.css";
import type { TagProps } from "./type";

export const Tag: FC<TagProps> = ({ label, backgroundColor }) => (
  <span className={styles.tag} style={{ background: backgroundColor }}>
    {label}
  </span>
);
