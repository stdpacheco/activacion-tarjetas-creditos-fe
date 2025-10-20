import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";
import styles from "./facephi.module.scss";
import { Button } from "@/view/shared/components";
import { FacephiWidget } from "../../components/FacephiWidget/FacephiWidget";
import { classx } from "@/view/utils/classListUtil";
import { Checkbox } from "@/view/shared/components/Checkbox/Checkbox";
import { TermsModal } from "../../modals/TermsModal/TermsModal";
import { useFacephi } from "@/usecases/Recovery/useFacephi";

const Facephi = () => {
  const {
    showWidget,
    setShowWidget,
    currentStep,
    dotSteps,
    control,
    setShowTerms,
    showTerms,
    handleContinue,
    validCheckTerms,
    guidesSteps,
  } = useFacephi();

  return (
    <>
      <div className={styles.header}>
        <Link to={`${BASE_PATH}${PublicRoutes.LOGIN}`}>
          <IonIcon icon={arrowBack} className={styles.headerIcon} />
        </Link>

        <h1>Valida tu identidad</h1>

        <small className={styles.headerInfo}>
          Usaremos tu cámara para finalizar esta validación
        </small>
      </div>

      {!showWidget ? (
        <div className={styles.biometricGuide}>
          <AnimatePresence initial={false} mode="wait">
            {guidesSteps.slice(0, currentStep).map((StepItem, idx) => (
              <StepItem key={idx} />
            ))}
          </AnimatePresence>

          <div className={styles.dotStep}>
            {dotSteps.map(({ id, event }) => (
              <button
                key={id}
                onClick={event}
                className={styles.dotBtn}
                title={`Paso ${id}`}
                aria-label={`Paso ${id}`}
              >
                <span
                  key={id}
                  className={classx(
                    styles.dotItem,
                    id === currentStep ? styles.dotItemActive : ""
                  )}
                />
              </button>
            ))}
          </div>

          {currentStep > 1 && (
            <Checkbox
              control={control}
              name="checkTerms"
              label={
                <>
                  He leído y aceptado los{" "}
                  <button className={styles.termsBtn} onClick={() => setShowTerms(true)}>
                    <span className={styles.termsLink}>términos de uso</span>
                  </button>
                </>
              }
            />
          )}

          <Button
            id="biometric_step_btn"
            label={currentStep === 1 ? "Continuar" : "Empezar"}
            disabled={currentStep > 1 && !validCheckTerms}
            onClick={handleContinue}
          />
        </div>
      ) : (
        <FacephiWidget
          isCaptureStarted={showWidget}
          setIsCaptureStarted={setShowWidget}
        />
      )}

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
};

export default Facephi;
