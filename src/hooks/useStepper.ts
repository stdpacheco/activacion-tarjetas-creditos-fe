import { useRef, RefObject } from "react";
import { StepperRef } from "@/domain/MiscInterfaces/Stepper";

interface UseStepperReturn {
  stepperRef: RefObject<StepperRef>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  setStep: (step: number) => void;
}

export const useStepper = (): UseStepperReturn => {
  const stepperRef = useRef<StepperRef>(null);

  const goToNextStep = () => {
    if (!stepperRef.current) return;

    stepperRef.current.handleNext();
  };

  const goToPrevStep = () => {
    if (!stepperRef.current) return;

    stepperRef.current.handlePrev();
  };

  const setStep = (step: number) => {
    if (!stepperRef.current) return;

    stepperRef.current.setStep(step);
  };

  return {
    stepperRef,
    goToNextStep,
    goToPrevStep,
    setStep,
  };
};
