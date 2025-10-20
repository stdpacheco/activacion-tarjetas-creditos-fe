import { FC } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import styles from "./text-input.module.scss";

interface TextInputProps {
  label: string;
  name: string;
  options?: RegisterOptions;
}

export const TextInput: FC<TextInputProps> = ({ label, name, options }) => {
  const { register } = useFormContext();

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        type="text"
        autoComplete="off"
        maxLength={30}
        {...register(name, options)}
      />
    </div>
  );
};
