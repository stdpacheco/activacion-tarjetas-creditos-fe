import {
  IOtpLogin,
  IGeneralApiResponse,
  IUserCredentials,
  IUserData,
  TokenUser,
  IUserPreferences,
} from "../../domain/Entities";

export interface ILoginActionsRepository {
  getLoginData: (
    userCredentials: IUserCredentials
  ) => Promise<IGeneralApiResponse<IUserData>>;
  getOtpData: (otpData: IOtpLogin) => Promise<IGeneralApiResponse<TokenUser>>;
  setUserCredentials: (credentials: IUserCredentials) => void;
  setUserData: (userData: IUserData) => void;
  setUserPreferences: (userPreferences: IUserPreferences) => void;
}
