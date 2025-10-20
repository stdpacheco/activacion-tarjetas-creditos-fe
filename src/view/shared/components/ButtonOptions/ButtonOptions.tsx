import {
  FieldValues,
  Control,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { ErrorMessage } from "@/view/shared/components";
import { classx } from "@/view/utils";
import styles from "./buttonOptions.module.scss";

interface ButtonOptionsProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: Path<T>;
  options: Record<"label" | "value", string>[];
  className?: string;
  rules?: RegisterOptions;
}

export const ButtonOptions = <T extends FieldValues>({
  label,
  options,
  name,
  control,
  className,
  rules,
}: ButtonOptionsProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className={styles.buttonOptionsWrapper}>
      <span className={styles.label}>{label}</span>

      <div className={classx(className ?? styles.optionsGroup)}>
        {options.map(({ label, value }) => (
          <button
            type="button"
            key={label}
            id={`${name}_${value}`}
            onClick={() => field.onChange(value)}
            className={classx(
              styles.optionItem,
              field.value === value && styles.optionItemActive
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <ErrorMessage message={error.message ?? ""} className={styles.errorMsg} />
      )}
    </div>
  );
};
