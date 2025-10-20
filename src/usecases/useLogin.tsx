import { useContext, useEffect, useState } from "react";
import { IUserCredentials } from "../domain/Entities/LoginEntities";

import { useForm } from "react-hook-form";

import { RecoveryContext } from "./contexts/useRecoveryContext";


import { SecureWebStorage, storageConstants } from "@/view/utils";

export const useLogin = () => {
  
  const formHandler = useForm<IUserCredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [stepIndex, setStepIndex] = useState<number>(0);
  const isUsernameEmpty = formHandler.watch("username").length === 0;
  const isPasswordEmpty = formHandler.watch("password").length === 0;
  const isButtonDisabled =
    stepIndex === 0 ? isUsernameEmpty : isUsernameEmpty || isPasswordEmpty;

  const [userBlocked, setUserBlocked] = useState({
    show: false,
    description: "",
  });

  const [showSuccessfulReset, setShowSuccessfulReset] = useState(false);

  const [showExpireAlert, setShowExpireAlert] = useState<boolean>(() => {
    const storage = new SecureWebStorage();
    const value = storage.getItem(storageConstants.SESSION_EXPIRED);

    if (!value) return false;

    return value.toLowerCase() === "true";
  });

  const {
    isSuccessfulReset,
    setIsSuccessfulReset,
    showRecoveredUser,
    setShowRecoveredUser,
    userDecrypted,
    resetContext,
  } = useContext(RecoveryContext);

  const handleStepChange = () => {
    const storage = new SecureWebStorage();

    const usernameValue = formHandler.getValues("username");
    const passwordValue = formHandler.getValues("password");

    setStepIndex(usernameValue.length > 0 && passwordValue.length === 0 ? 1 : stepIndex);

    resetContext();

    setShowExpireAlert(false);
    storage.removeItem(storageConstants.SESSION_EXPIRED);
  };

  const handleLoginClick = async () => {
    
  };

  useEffect(() => {
    setShowSuccessfulReset(isSuccessfulReset);
  }, [isSuccessfulReset]);

  useEffect(() => {
    if (showRecoveredUser && userDecrypted) {
      formHandler.setValue("username", userDecrypted);
    }
  }, [showRecoveredUser, userDecrypted]);

  return {
    handleLoginClick,
    handleStepChange,
    formHandler,
    stepIndex,
    isButtonDisabled,
    setUserBlocked,
    userBlocked,
    showSuccessfulReset,
    setIsSuccessfulReset,
    showRecoveredUser,
    setShowRecoveredUser,
    userDecrypted,
    resetContext,
    showExpireAlert,
  };
};
