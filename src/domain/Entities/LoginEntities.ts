export interface IUserCredentials {
  username: string;
  password: string;
}

export interface IOtpLogin {
  token: string;
  username: string;
  password: string;
}

export interface IUserData {
  cedula: string;
  tipoIdentificacion: string;
  nombre: string;
  correo: string;
  celular: string;
  medioContacto: string;
  guid?: string;
  preferencias?: IUserPreferences;
}

export interface IOtpForm {
  otp: string;
}

export interface TokenUser {
  accessToken: string;
  refreshToken: string;
  preferencias?: IUserPreferences;
}

export interface ITokenBody {
  Username: string;
  Cedula: string;
  AccessToken: string;
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  contratos: string;
  jti: string;
  Guid: string;
}

export interface INewPassword {
  newPassword: string;
}

export interface IUserPreferences {
  avatar: string;
  fechaActualizacionAvatar: string;
  guidActualizacionAvatar: string;
  identificacion: string;
  nickname: string;
}
