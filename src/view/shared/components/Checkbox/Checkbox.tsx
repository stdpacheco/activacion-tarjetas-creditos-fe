import { ReactNode } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import styles from "./checkbox.module.scss";
import clsx from "clsx";

interface CheckboxProps<T extends FieldValues> {
  label: string | ReactNode;
  name: Path<T>;
  control: Control<T>;
}

export const Checkbox = <T extends FieldValues>({
  label,
  name,
  control,
}: CheckboxProps<T>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className={styles.checkGroup}>
      <label htmlFor={name} className={clsx(styles.label, "flex items-center")}>
        <input
          id={name}
          type="checkbox"
          autoComplete="off"
          {...field}
          checked={!field.value ? false : field.value}
        />
        {label}
      </label>
    </div>
  );
};
