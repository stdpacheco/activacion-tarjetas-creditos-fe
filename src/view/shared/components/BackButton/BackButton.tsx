import { FC } from "react";
import { IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { classx } from "@/view/utils";
import styles from "./backButton.module.scss";

interface BackButtonProps {
  title: string;
  className?: string;
  titleClass?: string;
  onBack?: () => void;
}

export const BackButton: FC<BackButtonProps> = ({
  title,
  className,
  titleClass,
  onBack,
}) => {
  return (
    <button
      type="button"
      aria-label="Go back"
      className={classx(styles.backButton, className)}
      onClick={onBack}
    >
      <IonIcon icon={chevronBack} className={styles.backButtonIcon} />

      <span className={classx(styles.backButtonTitle, titleClass)}>{title}</span>
    </button>
  );
};
