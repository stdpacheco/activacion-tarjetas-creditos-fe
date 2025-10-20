import { FC } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./input-error-message.module.scss";

interface Props {
  fieldName: string;
}

export const InputErrorMessage: FC<Props> = ({ fieldName }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.containerMessage}>
      {errors[fieldName] && (
        <div className={styles.errorMessage}>
          {errors[fieldName]?.message?.toString() && "Error!"}
        </div>
      )}
    </div>
  );
};
