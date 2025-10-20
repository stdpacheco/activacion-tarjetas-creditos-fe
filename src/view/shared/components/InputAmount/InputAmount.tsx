import { FC, ChangeEvent } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { classx } from "@/view/utils";
import styles from "./inputAmount.module.scss";

interface InputAmountProps {
  value: string;
  onAmountChange: (newValue: string) => void;
  className?: string;
  error?: boolean;
  id?: string;
  isDisabled?: boolean;
}

export const InputAmount: FC<InputAmountProps> = ({
  value,
  onAmountChange,
  className,
  error,
  id,
  isDisabled,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAmountChange(e.target.value.toSanitizeAmount());
  };

  return (
    <div
      className={classx(
        styles.inputAmountWrapper,
        className,
        error && styles.inputAmountError
      )}
    >
      <input
        id={id}
        type="text"
        inputMode="numeric"
        placeholder="$0.00"
        value={value !== "" ? "$".concat(value) : ""}
        onChange={handleChange}
        className={styles.inputAmount}
        disabled={isDisabled}
        autoComplete="off"
      />

      {error && (
        <ErrorMessage message="El valor que ingresaste excede el saldo que tienes disponible" />
      )}
    </div>
  );
};
