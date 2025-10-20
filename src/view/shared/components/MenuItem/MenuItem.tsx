import { FC } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import styles from "./menu-item.module.scss";
import { classx } from "@/view/utils/classListUtil";

interface Props {
  to: string;
  icon: string;
  label?: string;
  active?: boolean;
}

export const MenuItem: FC<Props> = ({ to, icon, label, active }) => {
  return (
    <Link
      id={label?.toLowerCase()}
      to={to}
      title={label}
      className={classx(styles.menuItem, active && styles.active)}
    >
      <IonIcon icon={icon} className={styles.menuIcon} />
    </Link>
  );
};
