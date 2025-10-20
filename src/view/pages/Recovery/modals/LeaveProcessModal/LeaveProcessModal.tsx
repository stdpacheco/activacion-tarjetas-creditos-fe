import { Modal } from "@/view/shared/modals";
import styles from "./leave-process-modal.module.scss";
import { FC } from "react";
import { warning } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { Button } from "@/view/shared/components";
import { Link } from "react-router-dom";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";

interface LeaveProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaveProcessModal: FC<LeaveProcessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClass={styles.modalWrapper}>
      <div className={styles.leaveProcessContainer}>
        <IonIcon className={styles.leaveProcessIcon} icon={warning} />

        <div className={styles.leaveProcessContent}>
          <span className={styles.leaveProcessContentTitle}>
            ¿Quieres abandonar el proceso?
          </span>

          <p>
            Al abandonar, se perderá tu progreso en el proceso de recuperación de
            contraseña.
          </p>

          <Button
            onClick={onClose}
            id="continue_button_process"
            label="No, quiero continuar con el proceso"
          />

          <Link
            className={styles.leaveProcessContentReturnLogin}
            to={`${BASE_PATH}${PublicRoutes.LOGIN}`}
          >
            Sí, quiero abandonar el proceso
          </Link>
        </div>
      </div>
    </Modal>
  );
};
