import { Modal } from "@/view/shared/modals";
import styles from "./reset-success-modal.module.scss";
import { FC } from "react";
import { checkmarkCircle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { Button } from "@/view/shared/components";

interface ResetSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetSuccessModal: FC<ResetSuccessProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClass={styles.modalWrapper}>
      <div className={styles.successChangeContainer}>
        <IonIcon className={styles.successChangeIcon} icon={checkmarkCircle} />

        <div className={styles.successChangeContent}>
          <span className={styles.successChangeContentTitle}>
            ¡Cambiaste tu contraseña!
          </span>

          <Button id="entendido_button_success" label="Entendido" onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};
