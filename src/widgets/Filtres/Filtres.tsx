import { useState } from "react";
import { GenderFilter } from "./GenderFilter";
import { GeoFilter } from "./GeoFilter";
import { SkillsFilter } from "./SkillsFilter";
import { RoleFilter } from "./RoleFilter";
import styles from "./Filtres.module.css";
import Cross from "@assets/icons/cross.svg?react";

interface FiltresProps {
  onRoleChange: (role: string) => void;
  onGenderChange: (gender: string) => void;
  onCitiesChange: (cities: string[]) => void;
  onSkillsChange: (skills: string[]) => void;
}

export const Filtres: React.FC<FiltresProps> = ({
  onRoleChange,
  onGenderChange,
  onCitiesChange,
  onSkillsChange,
}) => {
  const [role, setRole] = useState("Всё");
  const [gender, setGender] = useState("Не имеет значения");
  const [cities, setCities] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    onRoleChange(newRole);
  };

  const handleGenderChange = (newGender: string) => {
    setGender(newGender);
    onGenderChange(newGender);
  };

  const handleCitiesChange = (newCities: string[]) => {
    setCities(newCities);
    onCitiesChange(newCities);
  };

  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
    onSkillsChange(newSkills);
  };

  const resetFilters = () => {
    setRole("Всё");
    setGender("Не имеет значения");
    setCities([]);
    setSkills([]);

    // Вызываем колбэки сброса
    onRoleChange("Всё");
    onGenderChange("Не имеет значения");
    onCitiesChange([]);
    onSkillsChange([]);
  };

  const activeFiltersCount = [
    role !== "Всё",
    gender !== "Не имеет значения",
    cities.length > 0,
    skills.length > 0,
  ].filter(Boolean).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.mainTitle}>
          Фильтры
          {activeFiltersCount > 0 && (
            <span className={styles.filtersCount}> ({activeFiltersCount})</span>
          )}
        </h2>
        {activeFiltersCount > 0 && (
          <button className={styles.resetButton} onClick={resetFilters}>
            <span>Сбросить</span>
            <Cross className={styles.closeIcon} />
          </button>
        )}
      </div>

      <RoleFilter selectedRole={role} onChange={handleRoleChange} />
      <SkillsFilter selectedSkills={skills} onChange={handleSkillsChange} />
      <GenderFilter selectedGender={gender} onChange={handleGenderChange} />
      <GeoFilter selectedCities={cities} onChange={handleCitiesChange} />
    </div>
  );
};
