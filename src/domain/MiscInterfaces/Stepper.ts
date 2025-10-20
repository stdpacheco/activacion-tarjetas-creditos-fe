export interface StepFCProps {
  onNext: () => void;
  onPrev: () => void;
  currentStepIndex: number;
  setStep: (step: number) => void;
}

export interface StepperRef {
  handleNext: () => void;
  handlePrev: () => void;
  setStep: (step: number) => void;
}
