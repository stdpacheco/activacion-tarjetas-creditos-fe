import { FC, ReactNode, forwardRef } from "react";
import { motion, Variants } from "framer-motion";
import { classx } from "@/view/utils";
import styles from "./card-outline.module.scss";

const variants: Variants = {
  hidden: {
    x: 30,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeIn" },
  },
  exit: {
    x: -30,
    opacity: 0,
  },
};

interface CardOutlineProps {
  children: ReactNode;
  className?: string;
}

type AnimatedCardOutlineProps = CardOutlineProps & {
  keyMotion?: string;
};

export const CardOutline: FC<CardOutlineProps> = ({ children, className }) => {
  return <div className={classx(styles.cardOutline, className)}>{children}</div>;
};

export const AnimatedCardOutline = forwardRef<HTMLDivElement, AnimatedCardOutlineProps>(
  ({ keyMotion, children, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={classx(styles.cardOutline, className)}
        key={keyMotion}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    );
  }
);
