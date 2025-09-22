import React, { useState } from "react";
import { Checkbox } from "@shared/ui/checkbox/checkbox";
import { CATEGORIES } from "@shared/lib/helpers/categoryHelpers";
import styles from "./Filtres.module.css";
import ChevronDown from "@assets/icons/chevron-down.svg?react";
import ChevronUp from "@assets/icons/chevron-up.svg?react";

interface SkillsFilterProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsFilter: React.FC<SkillsFilterProps> = ({
  selectedSkills = [],
  onChange,
}) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleSkill = (value: string) => {
    onChange(
      selectedSkills.includes(value)
        ? selectedSkills.filter((s) => s !== value)
        : [...selectedSkills, value],
    );
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const displayedCategories = showAllSkills
    ? CATEGORIES
    : CATEGORIES.slice(0, 3);

  return (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle}>Навыки</h3>

      {displayedCategories.map((category) => (
        <div key={category.id} className={styles.skillCategory}>
          <div
            className={styles.skillCategoryHeader}
            onClick={() => toggleCategory(category.id)}
            role="button"
            tabIndex={0}
          >
            <Checkbox
              checkboxType="remove"
              label={category.name}
              isChecked={selectedSkills.includes(category.id)}
              onChange={() => toggleSkill(category.id)}
            />
            {category.subcategories &&
              (expandedCategories[category.id] ? (
                <ChevronUp className={styles.chevronIcon} />
              ) : (
                <ChevronDown className={styles.chevronIcon} />
              ))}
          </div>

          {expandedCategories[category.id] && category.subcategories && (
            <div className={styles.subcategories}>
              {category.subcategories.map((subcategory) => (
                <Checkbox
                  key={subcategory.id}
                  checkboxType="remove"
                  label={subcategory.name}
                  isChecked={selectedSkills.includes(subcategory.id)}
                  onChange={() => toggleSkill(subcategory.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setShowAllSkills(!showAllSkills)}
      >
        <span className={styles.toggleText}>
          {showAllSkills ? "Свернуть" : "Все категории"}
        </span>
        {showAllSkills ? (
          <ChevronUp className={styles.chevronIcon} />
        ) : (
          <ChevronDown className={styles.chevronIcon} />
        )}
      </button>
    </div>
  );
};
