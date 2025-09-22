import React from "react";
import type { SyntheticEvent } from "react";

import clsx from "clsx";
import styles from "./button.module.css";

interface Props
  extends React.PropsWithChildren<
    Omit<React.HTMLProps<HTMLButtonElement>, "type">
  > {
  type?: "primary" | "secondary" | "tertiary";
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  extraClass?: string;
  htmlType?: "button" | "submit" | "reset";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button: React.FC<Props> = ({
  children,
  type = "primary",
  onClick,
  htmlType,
  extraClass = "",
  startIcon,
  endIcon,
  ...rest
}) => {
  const className = clsx(
    styles.button,
    styles[`button_type_${type}`],
    extraClass,
  );

  return (
    <button type={htmlType} onClick={onClick} className={className} {...rest}>
      {startIcon && <span className={styles.icon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.icon}>{endIcon}</span>}
    </button>
  );
};
