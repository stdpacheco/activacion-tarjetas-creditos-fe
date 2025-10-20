import { FC, useRef, useState, useContext } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { IonIcon } from "@ionic/react";
import { copy, checkmarkCircle } from "ionicons/icons";
import styles from "./recovered-user.module.scss";
import { Modal } from "@/view/shared/modals";
import { Button } from "@/view/shared/components";
import { RecoveryContext } from "@/usecases/contexts/useRecoveryContext";

interface RecoveredUserProps {
  isOpen: boolean;
  onClose: () => void;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    rotate: 50,
  },
  enter: {
    opacity: 1,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    rotate: -45,
  },
};

export const RecoveredUser: FC<RecoveredUserProps> = ({ isOpen, onClose }) => {
  const usernameRef = useRef<HTMLSpanElement>(null);
  const { userDecrypted } = useContext(RecoveryContext);
  const [userCopied, setUserCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      setUserCopied(false);
      if (!navigator.clipboard || !usernameRef.current) return;

      const usernameValue = usernameRef.current.textContent;
      if (!usernameValue) return;

      await navigator.clipboard.writeText(usernameValue);
      setUserCopied(true);
    } catch (error) {
      setUserCopied(false);
    }
  };

  const IonIconAnimate = motion(IonIcon);

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClass={styles.modalWrapper}>
      <div className={styles.wrapper}>
        <span className={styles.title}>Tu usuario es</span>

        <div className={styles.userInfo}>
          <span ref={usernameRef}>{userDecrypted}</span>

          <button
            type="button"
            className={styles.copyIcon}
            onClick={copyToClipboard}
            title="Copiar al clipboard"
            aria-label="Copiar al clipboard"
          >
            <AnimatePresence initial={false} mode="wait">
              {userCopied ? (
                <IonIconAnimate
                  className={styles.copySuccess}
                  icon={checkmarkCircle}
                  variants={variants}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                />
              ) : (
                <IonIconAnimate
                  icon={copy}
                  variants={variants}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                />
              )}
            </AnimatePresence>
          </button>
        </div>

        <Button id="entendido_btn" label="Entendido" onClick={onClose} />
      </div>
    </Modal>
  );
};
