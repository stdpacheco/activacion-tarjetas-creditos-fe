import { FC } from "react";
import { motion, type Variants } from "framer-motion";
import { IonIcon } from "@ionic/react";
import { checkmarkCircle, alertCircle, informationCircle } from "ionicons/icons";
import styles from "./alert.module.scss";
import { classx } from "@/view/utils";

const variants: Variants = {
  hidden: {
    y: -10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

interface AlertProps {
  title: string;
  message: string;
  status: "success" | "error" | "info";
  icon?: string;
  className?: string;
}

export const Alert: FC<AlertProps> = ({ title, message, status, icon, className }) => {
  const alertStatus: Record<typeof status, string> = {
    success: styles.alertSuccess,
    error: styles.alertError,
    info: styles.alertInfo,
  };

  const alertIcons: Record<typeof status, string> = {
    success: checkmarkCircle,
    error: alertCircle,
    info: informationCircle,
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={classx(styles.alert, alertStatus[status], className)}
    >
      <div className={styles.alertIconContainer}>
        <IonIcon icon={icon ?? alertIcons[status]} className={styles.alertIcon} />
      </div>

      <div className={styles.alertContent}>
        <span className={styles.alertTitle}>{title}</span>

        <p className={styles.alertMsg}>{message}</p>
      </div>
    </motion.div>
  );
};
