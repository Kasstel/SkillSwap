import style from "./checkbox.module.css";
import type { FC } from "react";
import { type CheckboxProps } from "./type";

export const Checkbox: FC<CheckboxProps> = ({
  checkboxType,
  label,
  disabled,
  isChecked,
  onChange,
}) => {
  return (
    <label
      className={`${style.checkbox} ${
        checkboxType === "remove" ? style.checkbox_remove : ""
      }`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className={`${style.checkbox_icon}`}></span>
      <span className={`${style.checkbox_label}`}>{label}</span>
    </label>
  );
};
