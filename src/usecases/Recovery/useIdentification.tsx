import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FPhi } from "@facephi/selphi-widget-web";
import { WidgetCheckCapabilities } from "@facephi/selphi-widget-web/types/FPhi.Widget.component";
import { useRecoveryActions } from "@/actions/implementations/useRecoveryActions";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";
import { RecoveryContext } from "../contexts/useRecoveryContext";

export const useIdentification = () => {
  const { getMethodRecovery } = useRecoveryActions();
  const { methodRecovery, setIdentification, cameraStreamRef } =
    useContext(RecoveryContext);
  const [cameraNotAvailable, setCameraNotAvailable] = useState(false);
  const [isLoadingMethodRecovery, setIsLoadingMethodRecovery] = useState<boolean>(false);

  const formCtx = useForm({
    defaultValues: {
      docNumber: "",
    },
  });

  const navigate = useNavigate();
  const { handleSubmit, watch } = formCtx;
  const isDocNumberEmpty = !watch("docNumber")?.trim();

  const getMethodRecoveryPassword = async (data: Record<"docNumber", string>) => {
    try {
      setIsLoadingMethodRecovery(true);
      setIdentification(data.docNumber);

      const hasCamera = await hasCameraAvailable();
      const hasCapabilities = await checkCapabilities();

      setIsLoadingMethodRecovery(false);

      if (!hasCamera || !hasCapabilities) {
        setCameraNotAvailable(true);
        return;
      }

      setCameraNotAvailable(false);

      navigate(`${BASE_PATH}${PublicRoutes.RECOVERY}/${PublicRoutes.VALIDATE_FACEPHI}`);
    } catch (error) {
      setIsLoadingMethodRecovery(false);
      error;
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      cameraStreamRef.current = stream;

      return stream.active;
    } catch (error) {
      error;
      return false;
    }

  };

  const hasCameraAvailable = () => {
    if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
      return requestPermissions();
    }

    return Promise.resolve(false);
  };

  function checkCapabilities(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const capabilities = FPhi.Selphi.CheckCapabilities() as WidgetCheckCapabilities;

      const isReady = Object.values(capabilities).every((item) => item);

      if (isReady) resolve(true);

      resolve(false);
    });
  }

  return {
    formCtx,
    handleSubmit,
    isDocNumberEmpty,
    getMethodRecovery,
    getMethodRecoveryPassword,
    methodRecovery,
    cameraNotAvailable,
    setCameraNotAvailable,
    isLoadingMethodRecovery,
  };
};
