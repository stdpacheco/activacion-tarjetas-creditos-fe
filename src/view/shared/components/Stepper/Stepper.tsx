import { FC, useState, forwardRef, useImperativeHandle } from "react";
import { StepFCProps, StepperRef } from "@/domain/MiscInterfaces/Stepper";

interface StepperProps {
  steps: FC<StepFCProps>[];
}

export const Stepper = forwardRef<StepperRef, StepperProps>(({ steps }, ref) => {
  const [currentStep, setCurrentStep] = useState(0);
  const CurrentStepFC = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const setStep = (step: number) => {
    if (step < steps.length) {
      setCurrentStep(step);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      handleNext,
      handlePrev,
      setStep,
    }),
    [currentStep]
  );

  return (
    <CurrentStepFC
      onNext={handleNext}
      onPrev={handlePrev}
      currentStepIndex={currentStep}
      setStep={setStep}
    />
  );
});
