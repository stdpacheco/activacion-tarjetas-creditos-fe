import {
  ContractSAAPIResponse,
  ContractSABiometricSecurityRequest,
  ContractSavingAccountGenericRequest,
  ContractResponse,
  ActivarTarjetaRequest,
  getInfoPersonaRequest,
  PersonaResponse,
  ApiErrorResponse,
  ContractSavingGeneraOTPRequestV1,
  ContractSavingValidaOtpRequestV1,
  ActivarTarjetaOTPRequest,
  VariablesTarjetaRequest,
} from "@/domain/Entities";
import Http from "./http/Http";
import { CSAMessages } from "./messages/CSAMessages";
import { SecureWebStorage, storageConstants } from "@/view/utils";
import UAParser from "ua-parser-js";
import { useCSAStore } from "@/view/pages/ContractSavingAccount/store/useCSA";
import { AnalyticsService, GTMEventName } from "./analytics/AnalyticsService";
import { CrearExpedienteRequest } from "@/actions/implementations";
import { ActionValidationType, useValidationModalStore } from "@/view/pages/ContractSavingAccount/store/useValidationModalStore";

const channel = "NEOWEB";
const productName = "activacion-tarjeta";


const baseUrlAuth = import.meta.env.VITE_AUTHORIZATION_BASE_URL;

const templateActTC = "Tu código para activar tu tarjeta es @@Otp@@, si no realizaste esta transacción llámanos";

const detectDeviceType = () =>
  /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent) ? "Mobile" : "Desktop";


export const getToken = async (identificacion: string): Promise<boolean> => {
  const url = baseUrlAuth + "hd-onboarding/v1/Seguridades/token";

  const response = await Http.get(url, {

    headers: {
      'accept': 'application/json',
      'identificacion': identificacion,
      'tipo': 'client_credentials',
      'tipoProceso': import.meta.env.VITE_TOKEN_KEY,
    }

  });

  useCSAStore.setState((_) => ({
    token: response.data?.data?.acceso ?? "",
  }));

  if (response.status === 200) {
    return true;
  }
  return false;
};


export const getInfoPersona = async (
  request: getInfoPersonaRequest
): Promise<any> => {
  const url = baseUrlAuth + "hd-onboarding/v1/tarjetas-credito/personas";
  const token = useCSAStore.getState().token;
  try {
    const response = await Http.get(String(url), {
      headers: {
        Accept: "application/json",
        identificacion: request.identificacion,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      const errorResponsedat: ApiErrorResponse = {
        code: Number(response.status),
        traceid: "",
        message: "Error al obtener la información de la persona",
        errors: [
          {
            code: Number(response.status),
            message: "Error al obtener la información de la persona",
          },
        ],
      }

      if (response.status === 404) {

        AnalyticsService.sendEvent({
          pageTitle: "Validacion Identificacion",
          pasoProceso: GTMEventName.ErrorValidacion,
          proceso: "Activacion",
          section: "Service",
          mensajeError: "Error en el servicio de obtener getInfoPersona",
          descripcion: "Error en el servicio de obtener getInfoPersona",
          codigoError: "404",
        });

      } else

        if (response.status === 500) {

          AnalyticsService.sendEvent({
            pageTitle: "Validacion Identificacion",
            pasoProceso: GTMEventName.ErrorValidacion,
            proceso: "Activacion",
            section: "Datos personales",
            mensajeError: errorResponsedat.message,
            descripcion: errorResponsedat.message,
            codigoError: "500",

          });

        }
      return errorResponsedat;
    }


    return response.data as PersonaResponse;

  } catch (error) {

    useValidationModalStore.getState().openModal({
      type: "error",
      actionType: ActionValidationType.General,
    });

    AnalyticsService.sendEvent({
      pasoProceso: GTMEventName.ServicioError,
      proceso: "Activacion",
      pageTitle: "validar-" + useCSAStore.getState().tipoIdentification,
      section: "Datos personales",
      mensajeError: "Error en el servicio de obtener getInfoPersona",
      descripcion: "Error en el servicio de obtener getInfoPersona",
      codigoError: "500"
    });
    throw error;
  }

};

export const biometricSecurity = async (request: ContractSABiometricSecurityRequest) => {

  const parser = new UAParser(navigator.userAgent).getResult();
  const token = useCSAStore.getState().token;
  const bodyRequest: ContractSavingAccountGenericRequest = {

    origen: {
      canal: channel,
      identificacion: request.identification,
      direccionIp: "192.168.1.1"
    },

    data: {
      dactilar: request.fingerprintCode ?? "",
      producto: productName,
      navegadorWeb: parser.browser.name,
      dispositivoOrigen: parser.device.type ?? detectDeviceType(),
      versionOrigen: parser.browser.version,
      tieneCamara: "S",
      fotoTokenizada: request.tokenizedPhoto ?? "",
      idProducto: import.meta.env.VITE_ID_PRODUCTO_TC
    },

    idSolicitud: useCSAStore.getState().idSolicitud ?? "",

  };

  const storage = new SecureWebStorage();
  storage.setItem(storageConstants.ACCESS_TOKEN, "");

  const response = await Http.post<
    ContractSAAPIResponse<any>
  >(baseUrlAuth + "hd-onboarding/v1/Seguridades/biometria", bodyRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useCSAStore.setState((_) => ({
    idSolicitud: response.data?.data?.idSolicitud ?? "",
  }));

  if (response.data?.data?.dataTransaccion?.codigoResponse != 0 || response.data?.code != "000") {


    const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
    const marca = useCSAStore.getState().currentCard.data[0].marca!;
    const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

    AnalyticsService.sendEvent({
      pasoProceso: GTMEventName.ErrorBiometria,
      proceso: "Activacion",
      section: "Biometria",
      mensajeError: response.data?.data?.dataTransaccion?.messageResponse,
      descripcion: response.data?.data?.dataTransaccion?.messageResponse,
      codigoError: response.data?.data?.dataTransaccion?.codigoResponse,
      tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
      marca_afinidad: `${marca}-${afinidad}`,
      tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
    });

    if (response.data?.data?.dataTransaccion?.codigoResponse) {
      throw new Error(response.data?.data?.dataTransaccion?.messageResponse ?? "Error en el servicio de biometría");

    } else {
      throw new Error(response.data?.errors?.[0]?.message ?? "Usuario bloqueado");
    }

  }

  const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
  const marca = useCSAStore.getState().currentCard.data[0].marca!;
  const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;


  AnalyticsService.sendEvent({

    pasoProceso: GTMEventName.CodigoSeguridadPaso4,
    pageTitle: "Foto biometria validada",
    tipo_Tarjeta: useCSAStore.getState().tipotarjeta![0],
    section: "activación-modal-foto-validad",
    marca_afinidad: `${marca}-${afinidad}`,
    tipo_Usuario: tipoUsuario === 'A' ? 'A' : 'P',

  });

  return response.data;

};



export const obtenerPendientesActivacion = async (request: ActivarTarjetaRequest) => {
  const url = baseUrlAuth + "hd-onboarding/v1/tarjetas/pendiente-activacion";

  const token = useCSAStore.getState().token;

  try {
    const response = await Http.post(url, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {

    useValidationModalStore.getState().openModal({
      type: "error",
      actionType: ActionValidationType.General,
    });

    throw error;
  }
};

export const crearExpediente = async (request: CrearExpedienteRequest) => {
  const url = baseUrlAuth + 'hd-onboarding/v1/expedientes/crear-expediente';

  const token = useCSAStore.getState().token;

  try {
    const response = await Http.post(url, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {

    useValidationModalStore.getState().openModal({
      type: "error",
      actionType: ActionValidationType.General,
    });

    const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
    const marca = useCSAStore.getState().currentCard.data[0].marca!;
    const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

    AnalyticsService.sendEvent({
      pageTitle: "ServiceError",
      pasoProceso: GTMEventName.ServicioError,
      section: "Service",
      proceso: "Activacion",
      mensajeError: "Error en el servicio de crearExpediente",
      descripcion: "Error en el servicio de crearExpediente",
      codigoError: "400",
      tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
      marca_afinidad: `${marca}-${afinidad}`,
      tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
    });

    throw error;
  }
};

export const getPendientesActivacion = async (request: {
  canal: string;
  digito: string;
  identificacion: string;
}) => {
  const url = baseUrlAuth + "hd-onboarding/v1/tarjetas/pendiente-activacion";
  const token = useCSAStore.getState().token;

  const response = await Http.get(url, {
    headers: {
      "canal": request.canal,
      "digito": request.digito,
      "identificacion": request.identificacion,
      "accept": "application/json",
      "Accept-Language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "Referer": "http://localhost:9502/swagger/index.html",
      "Authorization": `Bearer ${token}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44",
    },
  });


  return response.data;
};

export const getPersonasNeo = async (identificacion: string) => {
  const url = baseUrlAuth + "hd-onboarding/v1/tarjetas-credito/personas-neo";
  const token = useCSAStore.getState().token;

  const response = await Http.get(url, {
    headers: {
      "accept": "application/json",
      "identificacion": identificacion,
      "Authorization": `Bearer ${token}`,
    }
  });

  return response.data;
};

export const generateOTP = async (request: {
  llaveOTP: string,
  ivOTP: string,
  aplicacion: string,
  servicio: string,
  canal: string,
  opidOTP: string,
  terminal: string,
  identificacion: string,
  tipoIdentificacion: string,
  notificacion: string,
  smsOpid: string,
  smsOrigen: string,
  emailOrigen: string,
  emailAsunto: string,
  template: string
}
) => {


  const url: string = baseUrlAuth + "hd-onboarding/v1/tarjetas-credito/genera-otp";
  const token = useCSAStore.getState().token;

  const bodyRequest: ContractSavingGeneraOTPRequestV1 = {
    llaveOTP: "",
    ivOTP: "",
    aplicacion: "",
    servicio: "",
    canal: "",
    opidOTP: "",
    terminal: "",
    identificacion: request.identificacion,
    tipoIdentificacion: request.tipoIdentificacion,
    notificacion: "",
    smsOpid: "",
    smsOrigen: "",
    emailOrigen: "",
    emailAsunto: "",
    template: templateActTC
  };

  const response1 = await Http.post(url, bodyRequest,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token}`,
      }
    }
  );


  if (response1.status != 200) {
    const error = Error();
    //error.name = String(response.statusText);
    error.name = String(response1.status);
    error.message = CSAMessages.General.ErrorGeneral;
    throw error;

  }
  return {
    //code: response.data.data.data.codigoRetorno,
    code: (response1.data.code) ? 0 : 1,
    data: response1.data,
    //message: response.data.data.data.mensaje,
    message: response1.statusText,
  };
};

export const contractAccount = async (request: ActivarTarjetaOTPRequest) => {
  const tipoTarjeta = useCSAStore.getState().tipotarjeta;
  const token = useCSAStore.getState().token;

  const bodyRequestAct: VariablesTarjetaRequest = {
    identificacion: request.identificacion,
    digito: request.digito,
    canal: channel
  };

  const urlActDebito = baseUrlAuth + "hd-onboarding/v1/tarjetas/activar-tarjeta-debito";
  let urlActivacion = baseUrlAuth + "hd-onboarding/v1/tarjetas/activar-tarjeta-credito";

  if (tipoTarjeta === "Débito" || (tipoTarjeta === "Crédito" && request.identificacion.length != 10)) {
    const urlOTP = baseUrlAuth + "hd-onboarding/v1/tarjetas-credito/valida-otp";

    const bodyRequest: ContractSavingValidaOtpRequestV1 = {
      llaveOTP: "",
      ivOTP: "",
      aplicacion: "",
      servicio: "",
      canal: "",
      opidOTP: "",
      terminal: "",
      identificacion: request.identificacion,
      tipoIdentificacion: request.identificacion.length === 10 ? "C" : "P",
      otp: request.otp
    };

    const responseOTP = await Http.post(urlOTP, bodyRequest, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (responseOTP.status !== 200) {
      const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
      const marca = useCSAStore.getState().currentCard.data[0].marca!;
      const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;
      AnalyticsService.sendEvent({
        pasoProceso: GTMEventName.ErrorOTP,
        section: "Otp",
        proceso: "Activacion",
        mensajeError: "El código ingresado no es válido. Verifica que esté bien escrito.",
        descripcion: "El código ingresado no es válido. Verifica que esté bien escrito.",
        codigoError: responseOTP.status.toString(),
        tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
        marca_afinidad: `${marca}-${afinidad}`,
        tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
      });
      throw new Error(`Error en validación OTP: ${responseOTP.status}`);
    }

    urlActivacion = urlActDebito;
  }

  const responseActivacion = await Http.post(urlActivacion, bodyRequestAct, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (responseActivacion.status !== 200) {
    const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
    const marca = useCSAStore.getState().currentCard.data[0].marca!;
    const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;
    AnalyticsService.sendEvent({
      pasoProceso: GTMEventName.ActivacionNoExitosa,
      section: "Biometria",
      mensajeError: "Error en activación de tarjeta.",
      descripcion: "Error en activación de tarjeta.",
      codigoError: responseActivacion.status.toString(),
      tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
      marca_afinidad: `${marca}-${afinidad}`,
      tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
    });
    throw new Error(`Error en activación de tarjeta`);
  }


  const expedienteRequest = {
    identificacion: request.identificacion,
    idProducto: (useCSAStore.getState().tipotarjeta === "Crédito" ? import.meta.env.VITE_ID_PRODUCTO_TC : import.meta.env.VITE_ID_PRODUCTO_TD),
  };

  await crearExpediente(expedienteRequest);

  const responseRet: ContractSAAPIResponse<ContractResponse> = {
    code: 20,
    message: "OK",
    data: {
      numeroCuenta: "Activacion Realizada",
      horaActivacion: ""
    },
  };

  return responseRet.data;
};
