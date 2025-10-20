import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "./tooltip.module.scss";

interface TooltipProps {
  elementRef: RefObject<HTMLElement>;
  children: ReactNode;
}

type Position = {
  top?: number;
  left?: number;
  width?: number;
};

const variants: Variants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0.9,
    opacity: 0,
  },
};

export const Tooltip: FC<TooltipProps> = ({ elementRef, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current || !tooltipRef.current) return;
    if (!isVisible) return;

    const { top, height, left } = elementRef.current.getBoundingClientRect();
    const tooltipDimen = tooltipRef.current.getBoundingClientRect();

    const topOffset = top + (height - tooltipDimen.height) / 2;
    const leftOffset = left - tooltipDimen.width - tooltipDimen.width * 0.2;

    setPosition({
      ...position,
      top: topOffset,
      left: leftOffset,
    });
  }, [isVisible]);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleEnter = () => {
      setIsVisible(true);
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    elementRef.current.addEventListener("mouseenter", handleEnter);
    elementRef.current.addEventListener("mouseleave", handleLeave);

    return () => {
      elementRef.current?.removeEventListener("mouseenter", handleEnter);
      elementRef.current?.addEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          variants={variants}
          className={styles.tooltipContainer}
          initial="hidden"
          animate="enter"
          exit="exit"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
