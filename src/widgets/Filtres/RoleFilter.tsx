import React from "react";
import { RadioGroupUI } from "@shared/ui/radiogroup/radiogroup";
import styles from "./Filtres.module.css";

interface RoleFilterProps {
  selectedRole: string;
  onChange: (role: string) => void;
}

export const RoleFilter: React.FC<RoleFilterProps> = ({
  selectedRole = "Всё",
  onChange,
}) => {
  const roleOptions = ["Всё", "Хочу научиться", "Могу научить"];

  return (
    <div className={styles.filterSection}>
      <RadioGroupUI
        name="role-filter"
        options={roleOptions}
        selected={selectedRole}
        onChange={onChange}
      />
    </div>
  );
};
