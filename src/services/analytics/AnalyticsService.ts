import { useCSAStore } from "@/view/pages/ContractSavingAccount/store/useCSA";
import { useHistoryStore } from "@/view/pages/ContractSavingAccount/store/useHistoryStore";
import TagManager from "react-gtm-module";

export enum GTMTypeEvent {
  Tap = "Tap",
  View = "View",
  ServiceError = "ServiceError",
  LocalError = "LocalError",
  ServiceValidation = "ServiceValidation",
}

interface GTMDataEvent {

  event: string;
  application: string;
  userID: string;
  channel: string;
  type: GTMTypeEvent;
  targetText: string;
  pageTitle: string;
  section: string;
  guid: string;
  idRecord: string
  tipoTarjeta: string
  tipoUsuario: string
  marca_afinidad: string

}

export enum GTMEventName {

  Inicio = "AT_inicio",
  Validacion = "AT_validacion",
  EmpezarBiometria = "AT_empezar_biometria",
  GuiaBiometria = "AT_guia_bioemtria",
  BiometriaPaso3 = "AT_biometria_paso3",
  CodigoSeguridadPaso4 = "AT_codigoSeguridadTitular_Paso4",
  IngresoOTPPaso5 = "AT_ingreso_OTP_paso5",
  ReenviarCodigo = "AT_reenviar_codigo",
  FinPaso6 = "AT_Fin_Paso6",
  ErrorValidacion = "TC_error_validacion",
  ErrorOTP = "TC_error_OTP",
  ActivacionNoExitosa = "TC_activacion_noexitosa",
  ErrorBiometria = "TC_error_biometria",
  ServicioError = "TC_servicio_error",
}


const getCommonTrackingProps = () => {
  return {
    canal: 'Online',

  };
};


export class AnalyticsService {
  static sendEvent = (
    dataEvent: Partial<GTMDataEvent | Record<string, string | boolean>>
  ) => {
    const historyStore = useHistoryStore.getState();
    if (historyStore.loadingHistory) return;

    const dataLayer = {
      event: "eventoDataLayerNeoDigital2",
      application: "Activacion",
      site_version: "V2",
      ...getCommonTrackingProps(),
      ...dataEvent,
    };

    console.log("Track event JG: ", JSON.parse(JSON.stringify(dataLayer)));

    TagManager.dataLayer({
      dataLayer: JSON.parse(JSON.stringify(dataLayer)),
    });


  };

  static sendError = (errorData: {
    type: GTMTypeEvent;
    message: string;
    status?: string;
    endpoint?: string;
    method?: string;
    responseCode?: string;
    stack?: string;
  }) => {

    const { idRecord, guid } = useCSAStore.getState();

    const dataLayer = {
      event: "EventoDataLayerContratacionCA",
      application: "CuentaAhorroDigital",
      channel: "Online",
      idRecord: idRecord !== "" ? idRecord : undefined,
      guid: guid !== "" ? guid : undefined,
      ...errorData,
    };

    if (import.meta.env.VITE_REACT_APP_ENTORNO === "LOCAL") {
      console.log("Track error event: ", JSON.parse(JSON.stringify(dataLayer)));
    }

    TagManager.dataLayer({
      dataLayer: JSON.parse(JSON.stringify(dataLayer)),
    });

  };
}