import React, { ChangeEvent, KeyboardEvent } from "react";
import {
  FieldValues,
  Control,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { classx } from "@/view/utils";
import { InputPatterns, pattersRegExp } from "@/view/utils/regExpUtils";
import styles from "./inputFilled.module.scss";
import erroIcon from "@/view/assets/activation/information-circle.svg";
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
  disabled?: boolean;
  onTextProcess?: (value: string) => string;
  leadingIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  prefixText?: string;
}

export const InputFilled = <T extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  className,
  maxlength = 30,
  isOptional,
  rules,
  pattern,
  classNameLabel,
  onTextProcess,
  leadingIcon,
  prefixIcon,
  prefixText,
  disabled = false,
}: InputFilledProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });
  const cleanPatterns = {
    [InputPatterns.number]: /[^0-9]/g,
    [InputPatterns.text]: /[^A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]/g,
    [InputPatterns.alias]: /[^A-Za-z0-9.&ñÑáéíóúÁÉÍÓÚ ]/g,
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.slice(0, maxlength);
    const capitalizeValues = ["titularCuenta", "alias"];

    const cleaner = cleanPatterns[pattern as InputPatterns] || null;
    const cleanedValue = cleaner ? rawValue.replace(cleaner, '') : rawValue;

    const treatmentValue = capitalizeValues.includes(name)
      ? cleanedValue?.toCapitalize()
      : cleanedValue;

    field.onChange(onTextProcess ? onTextProcess(treatmentValue) : treatmentValue);
  };


  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.ctrlKey || !pattern) return;

    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
    ];

    const key = e.key;

    if (allowedKeys.includes(key)) return;

    const regex = pattersRegExp[pattern];

    if (!regex || !(regex instanceof RegExp)) return;

    const currentValue = (e.target as HTMLInputElement).value;
    const simulatedValue = currentValue + key;

    if (!regex.test(simulatedValue)) {
      e.preventDefault();
    }

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
        {prefixIcon && <div className="pl-4">{prefixIcon}</div>}
        {prefixText && <div className="pl-3 pr-1">{prefixText}</div>}
        <input
          id={name}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          onPaste={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          disabled={disabled}
          className={classx(
            styles.inputFilled,
            error?.message ? styles.inputFilledError : "",
            prefixText ? "pl-1" : ""
          )}
          {...field}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {leadingIcon && <div className="px-4">{leadingIcon}</div>}
      </div>

      {error && (
        <div
          className={styles.errorMsg}
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",

          }}
        >
          <img src={erroIcon} alt="Error icon" style={{ width: "16px", height: "16px", position: 'relative', top: '-1px' }} />
          <span style={{
            textAlign: 'center'
          }}>{error.message}</span>
        </div>
      )}

    </div>
  );
};
