import { FC } from "react";
import styles from "./progress-bar.module.scss";

interface ProgressBarProps {
  value: number;
  backgroundColor: string;
  progressColor: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  backgroundColor,
  progressColor,
}) => {
  const progressWidth = Math.max(0, Math.min(100, value));

  const containerStyle = {
    backgroundColor,
  };

  const progressStyle = {
    width: `${progressWidth}%`,
    backgroundColor: progressColor,
  };

  return (
    <div className={styles.progressBarContainer} style={containerStyle}>
      <div className={styles.progressBar} style={progressStyle}></div>
    </div>
  );
};
