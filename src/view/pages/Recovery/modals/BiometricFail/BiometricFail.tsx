import { FC, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import styles from "./biometric-fail.module.scss";
import { Modal } from "@/view/shared/modals";
import { Button } from "@/view/shared/components";
import { Link, useNavigate } from "react-router-dom";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";
interface BiometricFailProps {
  isOpen: boolean;
}

export const BiometricFail: FC<BiometricFailProps> = ({ isOpen }) => {

  const navigate = useNavigate();
  const handleNavigate = () => {

    navigate(`${BASE_PATH}${PublicRoutes.RECOVERY}/${PublicRoutes.VALIDATE_FACEPHI}`, {
      replace: true,
    });
  };

  const handleAlternativeIdentification = () => { };

  useEffect(() => {
    if (isOpen) {

    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} contentClass={styles.modalWrapper}>
      <div className={styles.wrapper}>
        <IonIcon className={styles.icon} icon={personCircle} />

        <div className={styles.content}>
          <span className={styles.title}>
            No pudimos validar tu identidad en nuestros registros
          </span>

          <Button
            id="intentar_nuevo_btn"
            label="Intenta de nuevo"
            onClick={handleNavigate}
          />

          <Link
            className={styles.link}
            to={`${BASE_PATH}${PublicRoutes.RECOVERY}`}
            onClick={handleAlternativeIdentification}
          >
            Intenta con otra identificación
          </Link>
        </div>
      </div>
    </Modal>
  );
};
