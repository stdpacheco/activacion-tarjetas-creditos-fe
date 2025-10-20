import {
  IFacephiFactorRequest,
  IFacephiFactorResponse,
  IMethodRecoveryRequest,
  IMethodRecoveryResponse,
  IResetPasswordRequest,
  IResetResponse,
  IResetUserRequest,
  IResetUserResponse,
} from "@/domain/Entities/RecoveryEntities";
import {
  getFacephiValidateService,
  getMethodRecoveryService,
  resetPasswordService,
  resetUserService,
} from "@/services/RecoveryServices";

export const useRecoveryActions = () => {
  const getMethodRecovery = async (
    data: IMethodRecoveryRequest
  ): Promise<IMethodRecoveryResponse | undefined> => await getMethodRecoveryService(data);

  const getFacephiValidate = async (
    data: IFacephiFactorRequest
  ): Promise<IFacephiFactorResponse> => await getFacephiValidateService(data);

  const resetPassword = async (data: IResetPasswordRequest): Promise<IResetResponse> =>
    await resetPasswordService(data);

  const resetUser = async (data: IResetUserRequest): Promise<IResetUserResponse> =>
    await resetUserService(data);

  return {
    getMethodRecovery,
    getFacephiValidate,
    resetPassword,
    resetUser,
  };
};
