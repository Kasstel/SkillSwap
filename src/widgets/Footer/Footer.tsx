import type { FC } from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import logo from "@assets/images/logo.svg";

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <Link to="/" className={styles.logo}>
      <img src={logo} alt="SkillSwap Logo" />
    </Link>

    <nav className={styles.links}>
      <Link to="/about">О проекте</Link>
      <Link to="/skills">Все навыки</Link>
      <Link to="/contacts">Контакты</Link>
      <Link to="/blog">Блог</Link>
      <Link to="/policy">Политика конфиденциальности</Link>
      <Link to="/faq">Пользовательское соглашение</Link>
    </nav>

    <div className={styles.copy}>SkillSwap — 2025</div>
  </footer>
);
