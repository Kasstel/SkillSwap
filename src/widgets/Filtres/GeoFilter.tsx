import React, { useState } from "react";
import { Checkbox } from "@shared/ui/checkbox/checkbox";
import { cityOptions } from "@shared/ui/dropdown/dropdownConstants";
import styles from "./Filtres.module.css";

import ChevronDown from "@assets/icons/chevron-down.svg?react";
import ChevronUp from "@assets/icons/chevron-up.svg?react";

interface GeoFilterProps {
  selectedCities: string[];
  onChange: (cities: string[]) => void;
}

export const GeoFilter: React.FC<GeoFilterProps> = ({
  selectedCities = [],
  onChange,
}) => {
  const [showAllCities, setShowAllCities] = useState(false);
  const displayedCities = showAllCities ? cityOptions : cityOptions.slice(0, 5);

  const handleCityToggle = (cityLabel: string) => {
    const newSelection = selectedCities.includes(cityLabel)
      ? selectedCities.filter((c) => c !== cityLabel)
      : [...selectedCities, cityLabel];
    onChange(newSelection);
  };

  return (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle}>Город</h3>
      <div className={styles.citiesList}>
        {displayedCities.map((city) => (
          <Checkbox
            key={city.value}
            checkboxType="remove"
            label={city.label}
            isChecked={selectedCities.includes(city.label)}
            onChange={() => handleCityToggle(city.label)}
          />
        ))}
      </div>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setShowAllCities(!showAllCities)}
      >
        <span className={styles.toggleText}>
          {showAllCities ? "Свернуть" : "Все города"}
        </span>
        {showAllCities ? (
          <ChevronUp className={styles.chevronIcon} />
        ) : (
          <ChevronDown className={styles.chevronIcon} />
        )}
      </button>
    </div>
  );
};
