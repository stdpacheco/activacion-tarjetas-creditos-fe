import Http from "./http/Http";
import {
  IFacephiFactorRequest,
  IMethodRecoveryRequest,
  IMethodRecoveryResponse,
  IResetPasswordRequest,
  IResetUserRequest,
} from "@/domain/Entities/RecoveryEntities";
import { IGeneralApiResponse } from "@/domain/Entities";

export const getMethodRecoveryService = async (data: IMethodRecoveryRequest) => {
  const url = "/authentication/v1/info-process";

  const response = await Http.post<IGeneralApiResponse<IMethodRecoveryResponse>>(
    url,
    data
  );
  return response.data.data;
};

export const getFacephiValidateService = async (data: IFacephiFactorRequest) => {
  const url = "/authentication/v1/facephi-factor";

  const response = await Http.post(url, data);
  return response.data.data;
};

export const resetPasswordService = async (data: IResetPasswordRequest) => {
  const url = "/authentication/v1/reset-password";

  const response = await Http.post(url, data);
  return response.data.data;
};

export const resetUserService = async (data: IResetUserRequest) => {
  const url = "/authentication/v1/reset-user";

  const response = await Http.post(url, data);
  return response.data.data;
};
