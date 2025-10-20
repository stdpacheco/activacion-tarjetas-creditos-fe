import { FC } from "react";
import { IonIcon } from "@ionic/react";
import { filter } from "ionicons/icons";
import { classx } from "@/view/utils";
import styles from "./filter.module.scss";

interface FilterProps {
  name: string;
  count?: number;
  active?: boolean;
  title?: string;
  onFiltered?: () => void;
}

export const Filter: FC<FilterProps> = ({
  name,
  count = 0,
  active,
  title,
  onFiltered,
}) => {
  return (
    <div
      className={classx(styles.filterWrapper, active && styles.filterActive)}
      title={title}
      onClick={onFiltered}
    >
      <span
        className={classx(
          styles.filterIconWrapper,
          active && styles.filterIconWrapperActive
        )}
      >
        <IonIcon
          icon={filter}
          className={classx(styles.filterIcon, active && styles.filterIconActive)}
        />
      </span>

      <span className={styles.filterLabel}>
        {name} ({count})
      </span>
    </div>
  );
};
