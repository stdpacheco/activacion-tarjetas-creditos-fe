import { FC, ChangeEvent } from "react";
import { IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";
import { classx } from "@/view/utils";
import styles from "./input-search.module.scss";

interface InputSearchProps {
  className?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export const InputSearch: FC<InputSearchProps> = ({
  className,
  placeholder,
  onChange,
  onClick,
}) => {
  return (
    <div className={classx(styles.inputSearchWrapper, className)}>
      <label
        htmlFor="inputSearch"
        className={styles.inputSearchIconWrapper}
        aria-label="icon search"
      >
        <IonIcon icon={search} className={styles.inputSearchIcon} />
      </label>

      <input
        type="search"
        id="inputSearch"
        autoComplete="off"
        placeholder={placeholder ?? "Búsqueda"}
        onChange={onChange}
        onClick={onClick}
        className={styles.inputSearch}
      />
    </div>
  );
};
