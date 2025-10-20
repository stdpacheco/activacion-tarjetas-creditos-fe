import { FC } from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./guide.module.scss";

const variants: Variants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 30,
    opacity: 0,
  },
};

export const GuideComponent1: FC = () => {
  return (
    <motion.div
      className={styles.guideContainer}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      <img src={""} alt="Guia 1" className={styles.guideImg} draggable={false} />

      <div className={styles.guideContent}>
        <b>Ubica tu rostro frente a la cámara</b>

        <span className={styles.guideInfo}>No uses lentes, gafas ni mascarilla</span>
      </div>
    </motion.div>
  );
};

export const GuideComponent2: FC = () => {
  return (
    <motion.div
      className={styles.guideContainer}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      <img src={""} alt="Guia 2" className={styles.guideImg} draggable={false} />

      <div className={styles.guideContent}>
        <b>Para identificarte</b>

        <span className={styles.guideInfo}>
          El lugar debe estar iluminado y no debes estar en contra luz.
        </span>
      </div>
    </motion.div>
  );
};
