import { create } from "zustand";

import maxAttemptsBiometric from "@/view/assets/csa/max_attempts_biometric.svg";
import debitCard from "@/view/assets/csa/general_debit_card.svg";
import agenciesDocs from "@/view/assets/csa/agencies_docs.svg";
import internalPolicies from "@/view/assets/csa/internal_policies.svg";
import photoNotExists from "@/view/assets/csa/photo_not_exists.svg";
import errorConnection from "@/view/assets/csa/error_connection.svg";
import processInProgress from "@/view/assets/csa/process_in_progress.svg";
import exitActivation from "@/view/assets/csa/exit_activation.svg";

import { match } from "ts-pattern";
import {
  CSABiometricValidationType,
  CSAManagePersonInfoValidationType,
  CSAPreValidationValiationType,
} from "@/domain/Entities";


export const enum ActionValidationType {
  PreValidation,
  FingerprintCode,
  Biometric,
  ManagePersonInfo,
  General,
  Other,
}

interface IValidationModal {
  title: string;
  description: string;
  image: string;
  actionPrimary: {
    text: string;
    onAction: () => void;
  };
  actionSecondary?: {
    text: string;
    onAction: () => void;
  };
}

interface IValidationState {
  modal?: IValidationModal;
  openModal: (params: {
    type?: number | string;
    actionType: ActionValidationType;
  }) => void;
  closeModal: () => void;
}

export const useValidationModalStore = create<IValidationState>()((set, get) => {
  const preValidationModals: {
    [key: string | number]: IValidationModal | undefined;
  } = {
    [CSAPreValidationValiationType.MaxAttemptsBiometrics]: {
      title: "Llegaste al máximo de intentos de verificación de identidad",
      description: "Por favor, vuelve a intentarlo en 24 horas.",
      image: maxAttemptsBiometric,
      actionPrimary: {
        text: "Cerrar",
        onAction: () => {
          get().closeModal();
        },
      },
    },
    [CSAPreValidationValiationType.ClientWait]: {
      title: "Ya tienes una solicitud en curso",
      description:
        "Aún estamos procesando una solicitud anterior. Por favor intenta abrir una cuenta más tarde",
      image: processInProgress,
      actionPrimary: {
        text: "Cerrar",
        onAction: () => {
          get().closeModal();
        },
      },
    },
  };
  const biometricModals: {
    [key: string | number]: IValidationModal | undefined;
  } = {
    [CSABiometricValidationType.MaxAttemptsBiometrics]: {
      title: "Llegaste al máximo de intentos de verificación de identidad",
      description: "Por favor, vuelve a intentarlo en 24 horas.",
      image: maxAttemptsBiometric,
      actionPrimary: {
        text: "Cerrar",
        onAction: () => {
          location.reload();
        },
      },
    },
    [CSABiometricValidationType.CardToWithDraw]: {
      title: "Tienes una Tarjeta de Débito por retirar",
      description:
        "Para abrir una cuenta nueva, primero retira en cualquier agencia la Mastercard Debit que tienes pendiente",
      image: debitCard,
      actionPrimary: {
        text: "Encontrar mi agencia más cercana",
        onAction: () => {
          window
            .open("https://bancoguayaquil.azurewebsites.net/bancos", "_blank")
            ?.focus();
        },
      },
      actionSecondary: {
        text: "Finalizar activación",
        onAction: () => {
          location.reload();
        },
      },
    },
    [CSABiometricValidationType.LimitOfAccount]: {
      title: "Has superado el límite de cuentas que puedes abrir en línea",
      description: " Para abrir una cuenta más, por favor acércate a una agencia",
      image: agenciesDocs,
      actionPrimary: {
        text: "Encontrar mi agencia más cercana",
        onAction: () => {
          window
            .open("https://bancoguayaquil.azurewebsites.net/bancos", "_blank")
            ?.focus();
        },
      },
      actionSecondary: {
        text: "Finalizar activación",
        onAction: () => {
          window.location.reload();
        },
      },
    },
    [CSABiometricValidationType.MinYearsOld]: {
      title: "Para abrir una cuenta en línea, debes tener mínimo 18 años",
      description: "Por favor, acércate a una agencia con tu representante legal",
      image: internalPolicies,
      actionPrimary: {
        text: "Encontrar mi agencia más cercana",
        onAction: () => {
          window.open("https://bancoguayaquil.azurewebsites.net/bancos", "_blank");
        },
      },
      actionSecondary: {
        text: "Finalizar activación",
        onAction: () => {
          location.reload();
        },
      },
    },
    [CSABiometricValidationType.PhotoNotObtained]: {
      title: "No tenemos tu foto actualizada en nuestro sistema",
      description:
        "Por tu seguridad, escríbenos a WhatsApp para continuar con la apertura de tu cuenta",
      image: photoNotExists,
      actionPrimary: {
        text: "Abrir WhatsApp",
        onAction: () => {
          window
            .open(
              "https://api.whatsapp.com/send?phone=593983730100&text=Hola,%20necesito%20ayuda%20de%20un%20asesor%20para%20abrir%20mi%20Cuenta%20de%20Ahorros%20desde%20el%20App",
              "_blank"
            )
            ?.focus();
        },
      },

      actionSecondary: {
        text: "Finalizar activación",
        onAction: () => {
          location.reload();
        },
      },
    },
  };

  const managePersonInfoModals: {
    [key: string | number]: IValidationModal | undefined;
  } = {
    [CSAManagePersonInfoValidationType.InternalPolicies]: {
      title: "Necesitamos revisar algunos datos contigo en persona",
      description:
        "Para confirmar el cumplimiento de nuestras políticas internas, verificamos que nuestros clientes no tengan baja calificación crediticia y que no figuren en listas del CONSEP.",
      image: internalPolicies,
      actionPrimary: {
        text: "Encontrar mi agencia más cercana",
        onAction: () => {
          window
            .open("https://bancoguayaquil.azurewebsites.net/bancos", "_blank")
            ?.focus();
        },
      },
      actionSecondary: {
        text: "Finalizar activación",
        onAction: () => {
          window.location.reload();
        },
      },
    },
  };

  const generalModals: {
    [key: string | number]: IValidationModal | undefined;
  } = {
    ["error"]: {
      title: "¿Seguro quieres salir del proceso de activación de tarjeta?",
      description: "Si dejas la activación para más tarde, tendrás que ingresar todo de nuevo",
      image: exitActivation,
      actionPrimary: {
        text: "Cerrar",
        onAction: () => {
          get().closeModal();
        },
      },
    },
    ["errorReload"]: {
      title: "Estamos solucionando un error en nuestra conexión",
      description: "Por favor, vuelve a intentar en unos minutos",
      image: errorConnection,
      actionPrimary: {
        text: "Finalizar activación",
        onAction: () => {
          location.reload();
        },
      },
    },
  };

  const otherModals: {
    [key: string | number]: IValidationModal | undefined;
  } = {
    ["accountOpenedToday"]: {
      title: "Ya abriste una Cuenta de Ahorros hoy",
      description: "¿Quieres abrir otra cuenta?",
      image: internalPolicies,
      actionPrimary: {
        text: "Abrir otra cuenta",
        onAction: () => {
          get().closeModal();
        },
      },
      actionSecondary: {
        text: "Finalizar proceso",
        onAction: () => {
          location.reload();
        },
      },
    },
  };

  return {
    openModal: (params) => {
      match(params.actionType)
        .with(ActionValidationType.PreValidation, () => {
          set({
            modal: params.type ? preValidationModals[params.type] : undefined,
          });
        })
        .with(ActionValidationType.Biometric, () => {
          set({
            modal: params.type ? biometricModals[params.type] : undefined,
          });
        })
        .with(ActionValidationType.ManagePersonInfo, () => {
          set({
            modal: params.type ? managePersonInfoModals[params.type] : undefined,
          });
        })
        .with(ActionValidationType.General, () => {
          set({
            modal: params.type ? generalModals[params.type] : undefined,
          });
        })
        .with(ActionValidationType.Other, () => {
          set({
            modal: params.type ? otherModals[params.type] : undefined,
          });
        }
        );
    },
    closeModal: () => {
      set({ modal: undefined });
    },
  };
});
