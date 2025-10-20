import { FC } from "react";
import Lottie from "lottie-react";
import { Portal } from "@/view/shared/components";
import styles from "./spinner.module.scss";

interface Props {
  isLoading: boolean;
  type?: "BG" | "circle";
}

export const Spinner: FC<Props> = ({ isLoading, type = "BG" }) => {
  if (isLoading) {
    return (
      <Portal>
        <div className={styles.overlay}>
          {type === "BG" ? (
            <Lottie animationData={""} className={styles.bgSpinner} />
          ) : (
            <div className={styles.spinner}></div>
          )}
        </div>
      </Portal>
    );
  }
};
