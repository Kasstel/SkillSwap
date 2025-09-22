import React from "react";

import styles from "./radiogroup.module.css";

type Props = {
  name: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  title?: string;
};

export const RadioGroupUI: React.FC<Props> = ({
  name,
  options,
  selected,
  onChange,
  title,
}) => {
  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.group}>
        {options.map((option) => (
          <label key={option} className={styles.label}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={selected === option}
              onChange={() => onChange(option)}
              className={styles.input}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};
