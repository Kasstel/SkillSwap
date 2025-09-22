import { AppHeaderUI } from "@widgets/Header/Header";
import { Footer } from "../../widgets/Footer/Footer";
import styles from "./ProfilePage.module.css";
import { type FC } from "react";
import { ProfileMenuUI } from "@shared/ui/profile-menu";
import { ProfileMenuItems } from "@shared/ui/profile-menu/profile-menu-data";
import { Outlet } from "react-router-dom";

export const ProfilePage: FC = () => {
  return (
    <div className={styles.profile_page__wrapper}>
      <AppHeaderUI />
      <main className={styles.profile_page__container}>
        <ProfileMenuUI profileMenuItems={ProfileMenuItems} />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
