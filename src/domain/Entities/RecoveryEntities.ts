import { RecoveryType } from "@/view/pages/Recovery/enums/recovery.enum";

export interface IMethodRecoveryRequest {
  canal: string;
  identificacion: string;
}

export interface IMethodRecoveryResponse {
  mode: number;
}

export interface IFacephiFactorRequest {
  tipo: RecoveryType;
  identificacion: string;
  foto: string;
}

export interface IFacephiFactorResponse {
  identificacion: string;
  mensaje: string;
}

export interface IResetPasswordRequest {
  nuevoPassword: string;
  identificacion: string;
  otp: string;
}

export interface IResetResponse {
  mensaje: string;
}

export interface IResetUserResponse {
  username: string;
}

export interface IResetUserRequest {
  identificacion: string;
  otp: string;
}
