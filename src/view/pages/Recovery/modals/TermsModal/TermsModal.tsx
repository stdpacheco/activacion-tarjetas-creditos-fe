import { Modal } from "@/view/shared/modals";
import styles from "./terms-modals.module.scss";
import { FC, useEffect } from "react";
import { documentText } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { Button } from "@/view/shared/components";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
   
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} contentClass={styles.modalWrapper}>
      <div className={styles.termsContainer}>
        <IonIcon className={styles.termsIcon} icon={documentText} />

        <div className={styles.termsContent}>
          <span className={styles.termsContentTitle}>Términos de uso</span>

          <p>
            Autorizo a Banco Guayaquil S.A. ("Banco") a capturar mis patrones o datos
            biométricos, incluídas mis retinas y/o iris, para que los registre y almacene
            en sus bases de datos, archivos o sistemas con la siguiente finalidad: (1)
            valide mi identidad para el ingreso y operación de sus canales
            transaccionales; (2) valide mi identidad y consentimiento al momento de
            contratar u ordenar productos o servicios del Banco o de terceros ofertados en
            los canales del Banco
          </p>

          <Button id="entendido_button" label="Entendido" onClick={handleClose} />
        </div>
      </div>
    </Modal>
  );
};
