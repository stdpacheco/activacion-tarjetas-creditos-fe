import { FC, useEffect, useState } from "react";
import { Modal } from "@/view/shared/modals";
import styles from "./alert-modal.module.scss";
import { Button } from "@/view/shared/components";
import AlertIcon from "@/components/assets/alert-icon.svg";
import { Stack } from "@/components/Stack";
import IonIcon from "@reacticons/ionicons";

interface AlertTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  timeRemaining?: number;
}

export const 
AlertTokenModal: FC<AlertTokenModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  timeRemaining = 0,
}) => {
  const [isExpiringSoon, setIsExpiringSoon] = useState(timeRemaining > 0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    setIsExpiringSoon(timeRemaining > 0);
  }, [timeRemaining]);

  return (
    <Modal
      isOpen={isOpen}
      closeOutside={false}
      contentClass="sm:w-[90%] lg:w-[35%] h-auto max-h-[95dvh]"
    >
      <div className="relative px-5">
        {isExpiringSoon && (
          <IonIcon
            onClick={onClose}
            className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800"
            size="large"
            name="close-outline"
          />
        )}
        <Stack direction="column" align="center" space={10} paddingY={16}>
          <div className={styles.icon}>
            <img src={AlertIcon} alt="Alert Icon" width={48} />
          </div>
          <h2 className={styles.title}>
            {isExpiringSoon ? (
              <>
                Tu sesión terminará en{" "}
                <span className={styles.time}>{formatTime(timeRemaining)}</span>
              </>
            ) : (
              "Tu sesión ha terminado"
            )}
          </h2>
          <p className={styles.message} aria-live="polite">
            {isExpiringSoon
              ? "Por seguridad, tu sesión se cerrará pronto. Te recomendamos continuar con la creación de tu cuenta desde donde te quedaste."
              : "Por seguridad, necesitamos verificar tu identidad para que puedas seguir creando tu cuenta."}
          </p>
          <div className="w-full md:w-[70%]">
            {isExpiringSoon ? (
              <Button onClick={onClose} label="Continuar" />
            ) : (
              <Button onClick={onContinue} label="Continuar" />
            )}
          </div>
        </Stack>
      </div>
    </Modal>
  );
};
