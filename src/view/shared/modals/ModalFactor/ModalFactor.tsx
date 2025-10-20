import { FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { lockClosed } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { Modal } from "@/view/shared/modals";
import { ErrorMessage, InputOtp } from "@/view/shared/components";
import { useAppSelector } from "@/hooks";
import { IDobleFactor } from "@/domain/Entities";
import styles from "./modalFactor.module.scss";

interface ModalFactorProps {
  isOpen: boolean;
  onClose: () => void;
  formCtx: UseFormReturn<IDobleFactor>;
  isDisabledOtp: boolean;
  contactType?: string;
  errorMsg?: string;
}

export const ModalFactor: FC<ModalFactorProps> = ({
  isOpen,
  onClose,
  formCtx,
  isDisabledOtp,
  contactType,
  errorMsg,
}) => {
  const user = useAppSelector((state) => state.user);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        formCtx.reset();
        onClose();
      }}
      contentClass={styles.modalWrapper}
    >
      <FormProvider {...formCtx}>
        <form className={styles.formOtp} onSubmit={(e) => e.preventDefault()}>
          <span>
            <IonIcon className={styles.formOtpLockIcon} icon={lockClosed} />
          </span>

          <div className={styles.formOtpTitle}>
            <span>Te enviamos un mensaje</span>
          </div>

          <div className={styles.formOtpInfoText}>
            Ingresa el código de seguridad enviado a{" "}
            {contactType ?? user.correo?.toMaskEmail()}
          </div>

          <div className={styles.formOtpValidate}>
            La validez de tu código es de 3 minutos
          </div>

          <div className={styles.formOtpOtp}>
            <InputOtp name="factorVerificar" isDisabled={isDisabledOtp} />
          </div>

          {errorMsg && <ErrorMessage message={errorMsg} />}

          <div className={styles.formOtpTextBottomOtp}>
            <span className={styles.formOtpTextBottomOtpQuestion}>
              ¿Recibiste el código?{" "}
              <span className={styles.formOtpTextBottomOtpNewOtp}>
                Solicita un nuevo código
              </span>
            </span>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
