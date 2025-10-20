import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from "react";
import { RecoveryType } from "@/view/pages/Recovery/enums/recovery.enum";

interface IRecoveryContext {
  identification: string;
  methodRecovery: number | null;
  base64Image: string;
  newPassword: string;
  isFacePhiValidationPassed: boolean;
  isSuccessfulReset: boolean;
  recoveryType: RecoveryType | null;
  showRecoveredUser: boolean;
  userDecrypted: string;
  showBiometricFail: boolean;
  cameraStreamRef: MutableRefObject<MediaStream | null>;
  setMethodRecovery: Dispatch<SetStateAction<number | null>>;
  setBase64Image: Dispatch<SetStateAction<string>>;
  setIdentification: Dispatch<SetStateAction<string>>;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setIsFacePhiValidationPassed: Dispatch<SetStateAction<boolean>>;
  setIsSuccessfulReset: Dispatch<SetStateAction<boolean>>;
  setRecoveryType: Dispatch<SetStateAction<RecoveryType | null>>;
  setShowRecoveredUser: Dispatch<SetStateAction<boolean>>;
  setUserDecrypted: Dispatch<SetStateAction<string>>;
  setShowBiometricFail: Dispatch<SetStateAction<boolean>>;
  resetContext: () => void;
}

export const RecoveryContext = createContext<IRecoveryContext>({
  identification: "",
  methodRecovery: null,
  base64Image: "",
  newPassword: "",
  isFacePhiValidationPassed: false,
  isSuccessfulReset: false,
  recoveryType: null,
  showRecoveredUser: false,
  userDecrypted: "",
  showBiometricFail: false,
  cameraStreamRef: {} as MutableRefObject<MediaStream>,
  setMethodRecovery: () => {},
  setBase64Image: () => {},
  setIdentification: () => {},
  setNewPassword: () => {},
  setIsFacePhiValidationPassed: () => {},
  setIsSuccessfulReset: () => {},
  setRecoveryType: () => {},
  setShowRecoveredUser: () => {},
  setUserDecrypted: () => {},
  setShowBiometricFail: () => {},
  resetContext: () => {},
});

export const RecoveryContextProvider = (props: { children: JSX.Element }) => {
  const [identification, setIdentification] = useState<string>("");
  const [methodRecovery, setMethodRecovery] = useState<number | null>(null);
  const [base64Image, setBase64Image] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isFacePhiValidationPassed, setIsFacePhiValidationPassed] = useState(false);
  const [isSuccessfulReset, setIsSuccessfulReset] = useState(false);
  const [recoveryType, setRecoveryType] = useState<RecoveryType | null>(null);
  const [showRecoveredUser, setShowRecoveredUser] = useState<boolean>(false);
  const [userDecrypted, setUserDecrypted] = useState<string>("");
  const [showBiometricFail, setShowBiometricFail] = useState<boolean>(false);

  const cameraStreamRef = useRef<MediaStream | null>(null);

  const resetContext = () => {
    setIdentification("");
    setMethodRecovery(null);
    setBase64Image("");
    setNewPassword("");
    setIsFacePhiValidationPassed(false);
    setIsSuccessfulReset(false);
    setRecoveryType(null);
    setShowRecoveredUser(false);
    setUserDecrypted("");
    setShowBiometricFail(false);
  };

  return (
    <RecoveryContext.Provider
      value={{
        identification,
        methodRecovery,
        base64Image,
        newPassword,
        isSuccessfulReset,
        cameraStreamRef,
        isFacePhiValidationPassed,
        showRecoveredUser,
        userDecrypted,
        showBiometricFail,
        setIdentification,
        setMethodRecovery,
        setBase64Image,
        setNewPassword,
        setIsFacePhiValidationPassed,
        setIsSuccessfulReset,
        recoveryType,
        setRecoveryType,
        setShowRecoveredUser,
        setUserDecrypted,
        setShowBiometricFail,
        resetContext,
      }}
    >
      {props.children}
    </RecoveryContext.Provider>
  );
};
