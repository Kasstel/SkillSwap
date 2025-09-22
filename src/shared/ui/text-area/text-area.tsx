import { useState, type FC, type ReactNode } from "react";
import style from "./text-area.module.css";
import TextArea from "antd/es/input/TextArea";
import Edit from "@assets/icons/edit.svg?react";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  helperText?: string;
  error?: boolean;
  children?: ReactNode;
  withIcon?: boolean;
}

export const FormTextArea: FC<InputProps> = ({
  label = "",
  placeholder = "",
  value,
  onChange,
  helperText = "",
  error = false,
  children,
  name = "",
  withIcon = false,
}) => {
  const [innerValue, setInnerValue] = useState("");

  const inputValue = value !== undefined ? value : innerValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInnerValue(e.target.value);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.inputContainer}>
        {label && (
          <label htmlFor={name} className={style.label}>
            {label}
          </label>
        )}
        <div className={withIcon ? style.textareaWithIconContainer : ""}>
          <TextArea
            id={name}
            className={`${style.input} ${withIcon ? style.textareaWithIcon : ""} ${error ? style.error : ""}`}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            name={name}
          />
          {withIcon && (
            <div className={style.iconContainer}>
              <div className={style.editIcon}>
                <Edit />
              </div>
            </div>
          )}
        </div>
      </div>
      {helperText && (
        <span
          className={`${style.helperText} ${error ? style.errorText : ""}  `}
        >
          {helperText}
        </span>
      )}
      {children}
    </div>
  );
};
