import { FC, ReactNode, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Portal } from "../../components";
import { classx } from "@/view/utils/classListUtil";
import styles from "./modal.module.scss";

const variants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
    scale: 0.9,
  },
  enter: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    y: 30,
    opacity: 0,
    scale: 0.9,
  },
};

const mobileVariants: Variants = {
  hidden: {
    y: "30%",
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: "30%",
    opacity: 0,
  },
};

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  showOverlay?: boolean;
  onClose?: () => void;
  contentClass?: string;
  className?: string;
  closeOutside?: boolean;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  showOverlay = true,
  onClose,
  contentClass,
  className,
  closeOutside = true,
}) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const mouseDownInsideRef = useRef(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!isOpen) return;

      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        mouseDownInsideRef.current = true;
      } else {
        mouseDownInsideRef.current = false;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isOpen || !closeOutside) return;

      if (!mouseDownInsideRef.current && onClose) {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <Portal>
          <div
            className={classx(
              styles.wrapper,
              showOverlay && styles.overlay,
              className && className
            )}
          >
            <motion.div
              ref={modalRef}
              className={classx(styles.modalContent, contentClass)}
              variants={isMobile ? mobileVariants : variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={isMobile ? { type: "tween" } : undefined}
            >
              {children}
            </motion.div>
          </div>
        </Portal>
      ) : null}
    </AnimatePresence>
  );
};
