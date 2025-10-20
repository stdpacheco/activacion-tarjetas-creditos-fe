import { INewPassword } from "@/domain/Entities";
import { useContext, useState } from "react";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  IFacephiFactorRequest,
  IFacephiFactorResponse,
} from "@/domain/Entities/RecoveryEntities";
import { useRecoveryActions } from "@/actions/implementations/useRecoveryActions";
import { RecoveryContext } from "../contexts/useRecoveryContext";
import { analyticsService } from "heap-library";
import { AnalyticsEvent } from "@/services/analytics/AnalyticsConstants";
import axios from "axios";
import { RecoveryType } from "@/view/pages/Recovery/enums/recovery.enum";

export const useNewPwd = () => {
  const VIEW = "Nueva contraseña";
  const { getFacephiValidate } = useRecoveryActions();
  const { base64Image, identification, setNewPassword, setShowBiometricFail } =
    useContext(RecoveryContext);

  const [showModalLeaveProcess, setShowModalLeaveProcess] = useState(false);
  const [isLoadingValidation, setIsLoadingValidation] = useState<boolean>(false);

  const formCtx = useForm<INewPassword>({
    defaultValues: {
      newPassword: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { handleSubmit, watch, formState } = formCtx;

  const isNewPasswordDisable = !watch("newPassword").trim() || !formState.isValid;

  const validateNewPassword = async (data: Record<"newPassword", string>) => {
    await validateFacephi(RecoveryType.PASSWORD);
    setNewPassword(data.newPassword);

    navigate(`${BASE_PATH}${PublicRoutes.RECOVERY}/${PublicRoutes.VALIDATE_FACTOR}`);
  };

  const validateFacephi = async (type: RecoveryType) => {
    try {
      setIsLoadingValidation(true);
      setShowBiometricFail(false);

      const dataFacephi: IFacephiFactorRequest = {
        tipo: type,
        foto: base64Image,
        identificacion: identification,
      };

      const response: IFacephiFactorResponse = await getFacephiValidate(dataFacephi);

      if (response.mensaje !== "GENERADO") {
        setIsLoadingValidation(false);
        return;
      }

      analyticsService.registrarEvento(AnalyticsEvent.Servicio.Exitoso, {
        name: "Validar identidad facephi",
        view: VIEW,
      });

      setIsLoadingValidation(false);
    } catch (error) {
      if (!axios.isAxiosError(error)) return;

      const message = error.response?.data?.message;

      analyticsService.registrarEvento(AnalyticsEvent.Servicio.Error, {
        code: error.response?.data.code,
        message,
        name: "Validar identidad facephi",
        view: VIEW,
      });

      setShowBiometricFail(true);
      setIsLoadingValidation(false);
    }
  };

  return {
    setShowModalLeaveProcess,
    formCtx,
    handleSubmit,
    validateNewPassword,
    isNewPasswordDisable,
    showModalLeaveProcess,
    isLoadingValidation,
    validateFacephi,
  };
};
