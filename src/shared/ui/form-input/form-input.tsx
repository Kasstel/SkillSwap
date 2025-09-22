import React, {
  useState,
  type FC,
  type ReactNode,
  useEffect,
  memo,
  type ReactElement,
} from "react";
import style from "./form-input.module.css";
import Eye from "@assets/icons/eye.svg?react";
import EyeSlash from "@assets/icons/eye-slash.svg?react";
import { nanoid } from "nanoid";

interface InputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  // Значение для контролируемого режима. Если указано, обязательно передайте onChange
  value?: string | number;
  // Обработчик изменения значения в контролируемом режиме. Обязательно, если использовать value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number";
  helperText?: string;
  error?: boolean;
  children?: ReactElement | ReactNode[];
  defaultValue?: string | number;
  icon?: ReactNode;
}

export const FormInputUI: FC<InputProps> = memo(
  ({
    label = "",
    placeholder = "",
    name = "",
    value,
    onChange,
    type = "text",
    helperText = "",
    error = false,
    children,
    defaultValue,
    icon,
  }) => {
    const [innerValue, setInnerValue] = useState(
      defaultValue?.toString() || "",
    );
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;

    const inputId = name?.trim() || nanoid();

    // Обновляем innerValue, если defaultValue изменился и компонент неконтролируемый
    useEffect(() => {
      if (value === undefined && defaultValue !== undefined) {
        setInnerValue(defaultValue.toString());
      }
    }, [defaultValue, value]);

    // Если value передано, используем его, иначе используем внутреннее состояние
    const inputValue = value !== undefined ? String(value) : innerValue;

    // Определяем value/onChange для контролируемого и неконтролируемого режима
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      } else {
        setInnerValue(e.target.value);
      }
    };

    const TOGGLE_TEXT = {
      show: "Показать пароль",
      hide: "Скрыть пароль",
    };

    return (
      <div className={style.wrapper}>
        <div className={style.inputContainer}>
          {label && (
            <label htmlFor={inputId} className={style.label}>
              {label}
            </label>
          )}
          <input
            id={inputId}
            className={`${style.input} ${error ? style.error : ""}`}
            type={inputType}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            name={name}
            aria-describedby={
              helperText && error ? `${name}--error` : undefined
            }
            aria-invalid={error}
          />
          {/*  Добавление svg иконки в input*/}

          {isPasswordType ? (
            <button
              type="button"
              className={style.toggleIcon}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? TOGGLE_TEXT.hide : TOGGLE_TEXT.show}
            >
              {showPassword ? (
                <EyeSlash className={style.icon} />
              ) : (
                <Eye className={style.icon} />
              )}
            </button>
          ) : (
            icon && <div className={style.toggleIcon}> {icon}</div>
          )}
        </div>
        {helperText && (
          <span
            className={`${style.helperText} ${error ? style.errorText : ""}  `}
            id={helperText && error ? `${name}--error` : undefined}
          >
            {helperText}
          </span>
        )}
        {children && <div className={style.children}>{children}</div>}
      </div>
    );
  },
);
