import { useContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { RecoveryContext } from "../contexts/useRecoveryContext";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";

export const useRecoveryProtected = (): boolean => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { pathname } = useLocation();

  const { RECOVERY, VALIDATE_FACEPHI, RECOVER_METHOD, VALIDATE_FACTOR, NEW_PASSWORD } =
    PublicRoutes;

  const { identification, base64Image, recoveryType } = useContext(RecoveryContext);

  const validateRoute = useCallback(() => {
    setIsAuthorized(false);

    const authConditions: Record<string, boolean | string | null> = {
      [`${BASE_PATH}${RECOVERY}`]: true,
      [`${BASE_PATH}${RECOVERY}/${VALIDATE_FACEPHI}`]: identification,
      [`${BASE_PATH}${RECOVERY}/${RECOVER_METHOD}`]: identification || base64Image,
      [`${BASE_PATH}${RECOVERY}/${NEW_PASSWORD}`]:
        identification || base64Image || recoveryType,
      [`${BASE_PATH}${RECOVERY}/${VALIDATE_FACTOR}`]:
        identification || base64Image || recoveryType,
    };

    if (authConditions[pathname]) {
      setIsAuthorized(true);
    }
  }, [pathname]);

  useEffect(() => {
    validateRoute();
  }, [pathname]);

  return isAuthorized;
};
