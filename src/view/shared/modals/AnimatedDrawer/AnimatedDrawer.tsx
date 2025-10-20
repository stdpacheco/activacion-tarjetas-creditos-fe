import { FC, ReactNode, MouseEventHandler } from "react";
import { motion, AnimatePresence, type Variants, type Target } from "framer-motion";
import { Portal } from "../../components";
import { classx } from "@/view/utils";
import styles from "./animatedDrawer.module.scss";

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const animationsMap = {
  left: {
    hidden: { x: -30 },
    enter: { x: 0 },
  },
  right: {
    hidden: { x: 30 },
    enter: { x: 0 },
  },
  top: {
    hidden: { y: -30 },
    enter: { y: 0 },
  },
  bottom: {
    hidden: { y: 30 },
    enter: { y: 0 },
  },
};

interface AnimatedDrawerProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  contentClass?: string;
  position?: "left" | "right" | "top" | "bottom";
}

export const AnimatedDrawer: FC<AnimatedDrawerProps> = ({
  isOpen,
  children,
  onClose,
  contentClass,
  position,
}) => {
  const handleClose: MouseEventHandler<HTMLElement> = (e) => {
    const { target, currentTarget } = e;

    if (target !== currentTarget) return;
    if (!onClose) return;

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <Portal>
          <div onClick={handleClose} className={styles.drawerWrapper}>
            <motion.div
              className={classx(
                styles.drawerContent,
                contentClass,
                position && styles[position.concat("Drawer")]
              )}
              initial={{
                ...(variants.hidden as Target),
                ...animationsMap[position ?? "left"].hidden,
              }}
              animate={{
                ...variants.enter,
                ...animationsMap[position ?? "left"].enter,
              }}
              exit={{
                ...variants.hidden,
                ...animationsMap[position ?? "left"].hidden,
              }}
            >
              {children}
            </motion.div>
          </div>
        </Portal>
      ) : null}
    </AnimatePresence>
  );
};
