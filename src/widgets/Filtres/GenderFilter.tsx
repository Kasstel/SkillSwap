import React from "react";
import { RadioGroupUI } from "@shared/ui/radiogroup/radiogroup";
import { genderOptions } from "@shared/ui/dropdown/dropdownConstants";
import styles from "./Filtres.module.css";

interface GenderFilterProps {
  selectedGender: string;
  onChange: (gender: string) => void;
}

export const GenderFilter: React.FC<GenderFilterProps> = ({
  selectedGender = "Не имеет значения",
  onChange,
}) => {
  const genderOptionsWithDefault = [
    { value: "0", label: "Не имеет значения" },
    ...genderOptions,
  ];

  return (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle}>Пол автора</h3>
      <RadioGroupUI
        name="gender-filter"
        options={genderOptionsWithDefault.map((opt) => opt.label)}
        selected={selectedGender}
        onChange={onChange}
      />
    </div>
  );
};
