import { IonSpinner } from "@ionic/react";
import { FC, ReactElement } from "react";
import styles from "./button.module.scss";
import { classx } from "@/view/utils/classListUtil";

interface Props {
  id?: string;
  label: string;
  className?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: "outline";
  nameSpinner?:
    | "bubbles"
    | "circles"
    | "circular"
    | "crescent"
    | "dots"
    | "lines"
    | "lines-small"
    | "lines-sharp"
    | "lines-sharp-small";
  showSpinner?: boolean;
  isSubmit?: boolean;
  size?: "sm" | "md";
  leftIcon?: ReactElement;
  variant?: "primary" | "secondary";
}

export const Button: FC<Props> = ({
  id,
  label,
  className,
  color,
  disabled,
  onClick,
  style,
  showSpinner,
  nameSpinner,
  isSubmit = false,
  size = "md",
  leftIcon,
  variant = "primary",
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={classx(
        styles.btn,
        className,
        disabled ? styles.btnDisabled : styles.btnPrimary,
        style === "outline" && styles.outline,
        size === "sm" && styles.btnSm,
        variant === "secondary" && styles.btnSecondary
      )}
      style={{ backgroundColor: color }}
      disabled={disabled}
      type={isSubmit ? "submit" : "button"}
    >
      {leftIcon && <span className={styles.btnIconWrapper}>{leftIcon}</span>}

      {showSpinner ? (
        <IonSpinner className={styles.loadingSpinner} name={nameSpinner} />
      ) : (
        label
      )}
    </button>
  );
};
