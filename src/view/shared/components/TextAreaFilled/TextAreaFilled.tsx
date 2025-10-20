import { ChangeEvent, KeyboardEvent } from "react";
import {
  FieldValues,
  Control,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { classx } from "@/view/utils";
import { InputPatterns, pattersRegExp } from "@/view/utils/regExpUtils";
import styles from "./TextAreaFilled.module.scss";

interface InputFilledProps<T extends FieldValues> {
  label?: string;
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  maxlength?: number;
  isOptional?: boolean;
  rules?: RegisterOptions;
  pattern?: InputPatterns;
  isError?: boolean;
  errorHint?: string;
  disabled?: boolean;
  onTextProcess?: (value: string) => string;
  leadingIcon?: React.ReactNode;
  rows?: number;
}

export const TextAreaFilled = <T extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  className,
  maxlength = 30,
  isOptional,
  rules,
  pattern,
  isError,
  errorHint,
  classNameLabel,
  onTextProcess,
  leadingIcon,
  disabled = false,
  rows = 2,
}: InputFilledProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, maxlength);
    const capitalizeValues = ["titularCuenta", "alias"];

    const treatmentValue = capitalizeValues.includes(name)
      ? value?.toCapitalize()
      : value;

    field.onChange(onTextProcess ? onTextProcess(treatmentValue) : treatmentValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || !pattern) return;

    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Control",
      "Shift",
      "Home",
      "Enter",
    ];

    const keyValue = e.key;
    const regex = pattersRegExp[pattern] as RegExp;

    if (Object.values(regex).length) return;

    if (regex?.test(keyValue) || allowedKeys.includes(keyValue)) {
      return;
    }

    e.preventDefault();
  };

  return (
    <div className={classx(styles.inputFilledGroup, className)}>
      {label && (
        <label htmlFor={name} className={classx(styles.label, classNameLabel)}>
          {label}

          {isOptional && <small className={styles.optionalLabel}> (opcional)</small>}
        </label>
      )}

      <div className="flex items-center rounded-xl bg-gray-100">
        <textarea
          id={name}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          rows={rows}
          className={classx(
            styles.inputFilled,
            error?.message || (isError && styles.inputFilledError)
          )}
          {...field}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {leadingIcon && <div className="px-4">{leadingIcon}</div>}
      </div>

      {(error || errorHint) && (
        <ErrorMessage
          message={error?.message ?? errorHint ?? ""}
          className={styles.errorMsg}
        />
      )}
    </div>
  );
};
