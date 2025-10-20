import { PendienteActivacionResponse } from "@/domain/Entities";
import { create } from "zustand";

interface ICSA {
  token: string;
  setToken: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  identification: string;
  setIdentification: (value: string) => void;
  tipoIdentification: string;
  setTipoIdentification: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  fingerprintCode: string;
  setFingerprintCode: (value: string) => void;
  idRecord: string;
  setIdRecord: (value: string) => void;
  idRequest: string;
  setIdRequest: (value: string) => void;
  isClient: boolean;
  guid: string;
  setGuid: (guid: string) => void;
  bgAlertContract: boolean;
  setBgAlertContract: (value: boolean) => void;
  secureContract: boolean;
  setSecureContract: (value: boolean) => void;
  alertAmount: string;
  setAlertAmount: (value: string) => void;
  secureAmount: string;
  setSecureAmount: (value: string) => void;
  tokenExpiration: number;
  setTokenExpiration: (value: number) => void;
  tokenExpired: boolean;
  setTokenExpired: (value: boolean) => void;
  hasRecentContract: boolean;
  setHasRecentContract: (value: boolean) => void;
  currentCard: PendienteActivacionResponse,
  setCurrentCard: (value: any) => void;
  last6DigitsCard: string;
  setLast6DigitsCard: (value: string) => void;
  tipotarjeta: string;
  setTipotarjeta: (value: string) => void;
  nombreTarjeta: string;
  setnombreTarjeta: (value: string) => void;
  idSolicitud: string;
  setIdSolicitud: (value: string) => void;
}

const INITIAL_STORE: ICSA = {
  isClient: false,
  firstName: "",
  setFirstName: (_) => { },
  identification: "",
  setIdentification: (_) => { },
  tipoIdentification: "",
  setTipoIdentification: (_) => { },
  email: "",
  setEmail: (_) => { },
  phoneNumber: "",
  setPhoneNumber: (_) => { },
  fingerprintCode: "",
  setFingerprintCode: (_) => { },
  idRecord: "",
  setIdRecord: (_) => { },
  idRequest: "",
  setIdRequest: (_) => { },
  guid: "",
  setGuid: (_) => { },
  bgAlertContract: false,
  setBgAlertContract: (_) => { },
  secureContract: false,
  setSecureContract: (_) => { },
  alertAmount: "",
  setAlertAmount: (_) => { },
  secureAmount: "",
  setSecureAmount: (_) => { },
  tokenExpiration: 0,
  setTokenExpiration: (_) => { },
  tokenExpired: false,
  setTokenExpired: (_) => { },
  hasRecentContract: false,
  setHasRecentContract: (_) => { },
  currentCard: {
    traceid: "",
    success: false,
    collection: false,
    count: 0,
    data: {
      empresa: "",
      mensajeError: "",
      nombres: "",
      clte: "",
      estado: null,
      fechaAperturaToLower: null,
      identificacion: "",
      adicional1: "",
      adicional2: "",
      adicional3: "",
      tarjetaToLower: null,
      tipoIdentificacion: "",
      tipoTarjetaToLower: null,
      afinidad: "",
      alias: "",
      celular: null,
      correoElectronico: null,
      cuentaAhorro: "",
      cuentaCorriente: "",
      estadoPlastico: "",
      expira: "",
      fechaAperturaToUpper: "",
      fechaImpresion: "",
      numeroExpediente: "",
      razonGenera: "",
      solicitudPreAprobada: "",
      tarjetaToUpper: "",
      tipoBin: "",
      tipoPlastico: "",
      tipoTarjetaToUpper: "",
      ubicacion: "",
      campaniaSolicitud: "",
      canalSolicitud: "",
      estadoSolicitud: "",
      fechaEmision: "",
      fechaSolicitud: "",
      marca: "",
      numeroSolicitud: "",
      offSet: "",
    },
    error: undefined,
  },
  setCurrentCard: (_) => { },
  last6DigitsCard: "",
  setLast6DigitsCard: (_) => { },
  tipotarjeta: "",
  setTipotarjeta: (_) => { },
  nombreTarjeta: "",
  setnombreTarjeta: (_) => { },
  idSolicitud: "",
  setIdSolicitud: (_) => { },
  token: "",
  setToken: (_) => { },
};

export const useCSAStore = create<ICSA>()((set, _get) => ({
  ...INITIAL_STORE,
  setFirstName: (value) => set({ firstName: value }),
  setIdentification: (value) => set({ identification: value }),
  setTipoIdentification(tab: string) {
    set({ tipoIdentification: tab });
  },
  setEmail: (value) => set({ email: value }),
  setPhoneNumber: (value) => set({ phoneNumber: value }),
  setFingerprintCode: (value) => set({ fingerprintCode: value }),
  setIdRecord: (value) => set({ idRecord: value }),
  setIdRequest: (value) => set({ idRequest: value }),
  setGuid: (value) => set({ guid: value }),
  setBgAlertContract: (value) => set({ bgAlertContract: value }),
  setSecureContract: (value) => set({ secureContract: value }),
  setAlertAmount: (value) => set({ alertAmount: value }),
  setSecureAmount: (value) => set({ secureAmount: value }),
  setTokenExpiration: (value) => set({ tokenExpiration: value }),
  setTokenExpired: (value) => set({ tokenExpired: value }),
  setHasRecentContract: (value) => set({ hasRecentContract: value }),
  setCurrentCard: (value) => set({ currentCard: value }),
  setTipotarjeta: (value) => set({ tipotarjeta: value }),
  setnombreTarjeta: (value) => set({ nombreTarjeta: value }),
  setIdSolicitud: (value: string) => set({ idSolicitud: value }),
  setToken: (value: string) => set({ token: value }),
}));
