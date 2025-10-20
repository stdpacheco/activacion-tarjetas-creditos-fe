import { FC } from "react";
import { classx } from "@/view/utils";
import styles from "./errorMessage.module.scss";
import IonIcon from "@reacticons/ionicons";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <div className={classx(styles.errorMessage, className)}>
      <IonIcon name="alert-circle" className={styles.errorMessageIcon} />

      <span>{message}</span>
    </div>
  );
};
