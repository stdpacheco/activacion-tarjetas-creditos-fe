import SentryService from "@/services/Sentry/SentryService";
import { create } from "zustand";

export enum CSAProccessStepType {
  Personal = "datos-personales",
  Work = "datos-laborales",
  DebitCard = "datos-tarjeta-debito",
  Contract = "contratar-cuenta",
  Account = "cuenta-contratada",
}

interface CSAStepState {
  currentStep: CSAProccessStepType;
  setStep: (step: CSAProccessStepType) => void;
}

export const useStepStore = create<CSAStepState>()((set, _) => {
  const INIT_STATE: CSAStepState = {
    currentStep: CSAProccessStepType.Personal,
    setStep: (value) => {
      set((state) => {
        if (state.currentStep !== value) {
          SentryService.startTransaction(value, "loadSection");
          return { currentStep: value };
        }
        return state;
      });
    },
  };
  return INIT_STATE;
});
