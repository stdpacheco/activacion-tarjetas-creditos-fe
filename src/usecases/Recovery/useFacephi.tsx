import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  GuideComponent1,
  GuideComponent2,
} from "@/view/pages/Recovery/components/Guide/Guide";

export const useFacephi = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const stepsComponents = [GuideComponent1, GuideComponent2];
  const [guidesSteps, setGuidesSteps] = useState<FC[]>(stepsComponents);
  const [showTerms, setShowTerms] = useState<boolean>(false);

  const { control, watch, setValue } = useForm();

  const nextStep = () => {
    const hasMoreItems = currentStep <= stepsComponents.length - 1;

    if (hasMoreItems) {
      setGuidesSteps(stepsComponents.slice(currentStep, currentStep + 1));
      setCurrentStep(currentStep + 1);
    }
  };

  const validCheckTerms = watch("checkTerms") as boolean;

  const handleContinue = () => {
    if (currentStep > 1 && validCheckTerms) {
      setShowWidget(true);
      return;
    }

    nextStep();
  };

  const previousStep = () => {
    setGuidesSteps(stepsComponents.slice(0, 1));
    setCurrentStep(1);
    setValue("checkTerms", false);
  };

  const dotSteps: Record<"id" | "event", any>[] = [
    { id: 1, event: previousStep },
    { id: 2, event: nextStep },
  ];

  return {
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
  };
};
