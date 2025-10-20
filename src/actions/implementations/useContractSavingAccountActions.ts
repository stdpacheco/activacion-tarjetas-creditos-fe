import { useMutation, QueryClient } from '@tanstack/react-query';
import {
  biometricSecurity,
  contractAccount,
  generateOTP,
  obtenerPendientesActivacion,
  getPendientesActivacion,
  getInfoPersona,
  crearExpediente,
  getPersonasNeo,
} from '@/services/ContractSavingAccountService';
import { mutationKeys } from '@/view/pages/ContractSavingAccount/constants';
import {
  ContractBiometricSecurityType,
  ActivarTarjetaRequest,
  getInfoPersonaRequest,
  ActivarTarjetaOTPRequest,
} from '@/domain/Entities';
import { useCSAStore } from '@/view/pages/ContractSavingAccount/store/useCSA';
import { AnalyticsService, GTMEventName } from '@/services/analytics/AnalyticsService';
import { getSafeFirstName } from '../helpers/names';
const csaStore = useCSAStore.getState();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

export const useBiometricSecurity = () => {
  return useMutation({
    mutationKey: mutationKeys.biometricSecurity,
    mutationFn: async (req: {
      identification: string;
      fingerprintCode?: string;
      tokenizedPhoto?: string;
      type: ContractBiometricSecurityType;
    }) => {
      const response = await biometricSecurity(req);
      return response;
    },
    onSuccess: (data) => {
      const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
      const marca = useCSAStore.getState().currentCard.data[0].marca!;
      const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

      AnalyticsService.sendEvent({
        pasoProceso: GTMEventName.BiometriaPaso3,
        pageTitle: 'Biometria Paso 3',
        section: 'activación-biometria-paso-3',
        tipo_Tarjeta: useCSAStore.getState().tipotarjeta![0],
        marca_afinidad: `${marca}-${afinidad}`,
        tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
      });

      queryClient.setQueryData(mutationKeys.biometricSecurity, data);
    },
    onError: (error) => {
      const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
      const marca = useCSAStore.getState().currentCard.data[0].marca!;
      const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

      AnalyticsService.sendEvent({
        pageTitle: 'ServiceError',
        pasoProceso: GTMEventName.ServicioError,
        section: 'Service',
        proceso: 'Activacion',
        mensajeError: error.message,
        descripcion: error.message,
        codigoError: '400',
        tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
        marca_afinidad: `${marca}-${afinidad}`,
        tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
      });
      throw error;
    },
  });
};

export const usePendientesActivarTarjeta = () => {
  return useMutation({
    mutationKey: mutationKeys.activateCreditCard,
    mutationFn: async (req: ActivarTarjetaRequest) => {
      const responseAux = await obtenerPendientesActivacion(req);
      return responseAux.data;
    },
    onSuccess: (data) => {
      csaStore.setCurrentCard(data);
      queryClient.setQueryData(mutationKeys.activateCreditCard, data);
    },
    onError: (error) => {
      const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
      const marca = useCSAStore.getState().currentCard.data[0].marca!;
      const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

      AnalyticsService.sendEvent({
        pageTitle: 'ServiceError',
        pasoProceso: GTMEventName.ServicioError,
        section: 'Service',
        proceso: 'Activacion',
        mensajeError: error.message,
        descripcion: error.message,
        codigoError: '400',
        tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
        marca_afinidad: `${marca}-${afinidad}`,
        tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
      });
      throw error;
    },
  });
};

export interface CrearExpedienteRequest {
  identificacion: string;
  idProducto: string;
  idOficina?: string;
  idCanal?: string;
}

export const useCrearExpediente = () => {
  return useMutation({
    mutationKey: mutationKeys.expendiente,
    mutationFn: async (req: CrearExpedienteRequest) => {
      const response = await crearExpediente(req);
      return response.data;
    },
    onSuccess: () => {},
    onError: (error) => {
      const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
      const marca = useCSAStore.getState().currentCard.data[0].marca!;
      const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

      AnalyticsService.sendEvent({
        pageTitle: 'ServiceError',
        pasoProceso: GTMEventName.ServicioError,
        section: 'Service',
        proceso: 'Activacion',
        mensajeError: error.message,
        descripcion: error.message,
        codigoError: '400',
        tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
        marca_afinidad: `${marca}-${afinidad}`,
        tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
      });

      throw error;
    },
  });
};

export const useGetPendientesActivarTarjeta = () => {
  return useMutation({
    mutationKey: mutationKeys.activacionTarjetaGeneral,
    mutationFn: (req: ActivarTarjetaRequest) => getPendientesActivacion(req),
    onSuccess: async (data) => {
      if (data.code == 0) {
        csaStore.setCurrentCard(data);
      }
    },
    onError: () => {
      AnalyticsService.sendEvent({
        pageTitle: 'Validacion Digitos',
        pasoProceso: GTMEventName.ErrorValidacion,
        proceso: 'Activacion',
        section: 'Datos personales',
        mensajeError: 'Error en el servicio de obtener getPendientesActivacion',
        descripcion: 'Error en el servicio de obtener getPendientesActivacion',
        codigoError: '404',
        type: GTMEventName.ServicioError,
      });
      queryClient.invalidateQueries({
        queryKey: mutationKeys.activacionTarjetaGeneral,
      });
    },
  });
};

export const useObtenerDatosCedula = () => {
  return useMutation({
    mutationKey: mutationKeys.activacionTarjetaGeneral,
    mutationFn: (req: getInfoPersonaRequest) => getInfoPersona(req),
    onSuccess: async (data) => {
      if (!data.success || !data.data) {
        return;
      }

      useCSAStore.getState().setnombreTarjeta(getSafeFirstName(data?.data?.nombres));

      try {
        const responseNeo = await getPersonasNeo(data.data.identificacion!);
        if (responseNeo.code === 0 && responseNeo.data) {
          const persona = responseNeo.data;
          const numeroCelular = persona.data.datosPersona.celular;
          localStorage.setItem('CSA_PHONE_NUMBER', numeroCelular);
          queryClient.setQueryData(mutationKeys.activacionTarjetaGeneral, data);
        }
      } catch (error) {
        const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
        const marca = useCSAStore.getState().currentCard.data[0].marca!;
        const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

        AnalyticsService.sendEvent({
          pageTitle: 'ServiceError',
          pasoProceso: GTMEventName.ServicioError,
          section: 'Service',
          proceso: 'Activacion',
          mensajeError: 'Error en el servicio de obtener getPersonasNeo',
          descripcion: 'Error en el servicio de obtener getPersonasNeo',
          codigoError: '400',
          tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
          marca_afinidad: `${marca}-${afinidad}`,
          tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
        });
      }
    },
    onError: () => {},
  });
};

export const useGenerateOTP = () => {
  return useMutation({
    mutationKey: mutationKeys.generateOTP,
    mutationFn: (request: {
      llaveOTP: string;
      ivOTP: string;
      aplicacion: string;
      servicio: string;
      canal: string;
      opidOTP: string;
      terminal: string;
      identificacion: string;
      tipoIdentificacion: string;
      notificacion: string;
      smsOpid: string;
      smsOrigen: string;
      emailOrigen: string;
      emailAsunto: string;
      template: string;
    }) => generateOTP(request),
    onSuccess: (data) => {
      queryClient.setQueryData(mutationKeys.generateOTP, data);
    },
    onError: (error: any) => {
      const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
      const marca = useCSAStore.getState().currentCard.data[0].marca!;
      const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

      AnalyticsService.sendEvent({
        pageTitle: 'ServiceError',
        pasoProceso: GTMEventName.ServicioError,
        section: 'Service',
        proceso: 'Activacion',
        mensajeError: 'Error al generar OTP',
        descripcion: 'Error al generar OTP',
        codigoError: error.status?.toString(),
        tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
        marca_afinidad: `${marca}-${afinidad}`,
        tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
      });

      queryClient.invalidateQueries({
        queryKey: mutationKeys.generateOTP,
      });
    },
  });
};

export const useContractAccount = () => {
  return useMutation({
    mutationKey: mutationKeys.contractAccount,
    mutationFn: (request: ActivarTarjetaOTPRequest) => contractAccount(request),
    onSuccess: (data) => {
      csaStore.setIdentification('');
      csaStore.setTipoIdentification('');
      queryClient.setQueryData(mutationKeys.contractAccount, data);
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: mutationKeys.contractAccount,
      });
    },
  });
};
