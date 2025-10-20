import { Link } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import styles from "./identification.module.scss";
import { Button, Spinner } from "@/view/shared/components";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";
import { TextInput } from "@/view/shared/components/TextInput/TextInput";
import { useIdentification } from "@/usecases/Recovery/useIdentification";
import { CameraNotAvailable } from "../../modals/CameraNotAvailable/CameraNotAvailable";

const Identification = () => {
  const {
    formCtx,
    handleSubmit,
    isDocNumberEmpty,
    cameraNotAvailable,
    setCameraNotAvailable,
    isLoadingMethodRecovery,
    getMethodRecoveryPassword,
  } = useIdentification();

  return (
    <>
      <Spinner isLoading={isLoadingMethodRecovery} />

      <div className={styles.header}>
        <Link to={`${BASE_PATH}${PublicRoutes.LOGIN}`}>
          <IonIcon icon={arrowBack} className={styles.headerIcon} />
        </Link>

        <h1>¿Olvidaste tu usuario o contraseña?</h1>
      </div>

      <FormProvider {...formCtx}>
        <form className={styles.form} onSubmit={handleSubmit(getMethodRecoveryPassword)}>
          <TextInput
            label="Ingresa tu identificación"
            name="docNumber"
            options={{ required: true }}
          />

          <Button
            isSubmit
            id="recovery_btn"
            label="Continuar"
            disabled={isDocNumberEmpty}
          />
        </form>
      </FormProvider>

      <CameraNotAvailable
        isOpen={cameraNotAvailable}
        onClose={() => setCameraNotAvailable(false)}
      />
    </>
  );
};

export default Identification;
