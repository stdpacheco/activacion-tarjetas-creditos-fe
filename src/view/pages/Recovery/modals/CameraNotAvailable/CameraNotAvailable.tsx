import { FC, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { camera } from "ionicons/icons";
import { Button } from "@/view/shared/components";
import { Modal } from "@/view/shared/modals";
import styles from "./camera-not-available.module.scss";
interface CameraNotAvailableProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CameraNotAvailable: FC<CameraNotAvailableProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
   
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
     
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} contentClass={styles.modalWrapper}>
      <div className={styles.wrapper}>
        <IonIcon className={styles.icon} icon={camera} />

        <div className={styles.content}>
          <span className={styles.title}>Tu dispositivo no tiene cámara</span>

          <p className={styles.paragraph}>
            Para continuar con el proceso ingresa desde un dispositivo que tenga cámara o
            acercate a una de nuestras agencias
          </p>

          <Button id="entendido_camera_btn" label="Entendido" onClick={handleClose} />

          <a
            className={styles.link}
            href="https://apps.bancoguayaquil.com/SolicitaTurnoEnAgencia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agenda una cita en agencias
          </a>
        </div>
      </div>
    </Modal>
  );
};
