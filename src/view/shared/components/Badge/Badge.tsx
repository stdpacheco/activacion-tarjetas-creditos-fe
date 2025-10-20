import { FC } from "react";
import styles from "./badge.module.scss";
import { classx } from "@/view/utils";

interface BadgeProps {
  label: string;
  status: "success" | "error" | "info";
  className?: string;
}

export const Badge: FC<BadgeProps> = ({ label, status, className }) => {
  const badgeStatus: Record<typeof status, string> = {
    success: styles.badgeSuccess,
    error: styles.badgeError,
    info: styles.badgeInfo,
  };

  return (
    <div className={classx(styles.badge, badgeStatus[status], className)}>
      <small className={styles.badgeLabel}>{label}</small>
    </div>
  );
};
