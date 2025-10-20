import { FC } from "react";
import { Portal } from "@/view/shared/components";
import { classx } from "@/view/utils/classListUtil";
import styles from "./drawer.module.scss";

interface DrawerProps {
  isOpen: boolean;
  position: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  showOverlay?: boolean;
}

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  children,
  position,
  showOverlay = true,
}) => {
  return (
    <Portal>
      {showOverlay && isOpen && <div className={styles.drawerOverlay} />}

      <div className={classx(styles.drawer, isOpen && styles[position.concat("Drawer")])}>
        <div className={classx(styles.drawerContent, !isOpen && styles.drawerHidden)}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
