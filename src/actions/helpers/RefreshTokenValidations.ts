import { SecureWebStorage, storageConstants } from "@/view/utils";
import { getActualTimestamp, getTokenDecode } from "./TokenDecode";

const storage = new SecureWebStorage();
type validationType = "token" | "local";

const setValidationType = (validation: validationType) => {
  if (validation === "local") {
    const actualTimestamp = getActualTimestamp();
    storage.setItem(storageConstants.TOKEN_GETTED, actualTimestamp.toString());
  }

  storage.setItem(storageConstants.VALIDATION_TYPE, validation);
};

const getLocalTokenGettedTime = (): number =>
  Number(storage.getItem(storageConstants.VALIDATION_TYPE) ?? 0);

const getValidationType = (): validationType => {
  return storage.getItem(storageConstants.VALIDATION_TYPE) as validationType;
};

const defineTokenExpirationModel = (token: string) => {
  const decodedToken = getTokenDecode(token);
  const actualTimestamp = getActualTimestamp();
  const diffTimeLocalToBack = decodedToken.nbf - actualTimestamp;

  if (diffTimeLocalToBack > 60 || diffTimeLocalToBack < -60) {
    setValidationType("local");
  } else {
    setValidationType("token");
  }
};

const needRefreshToken = (token: string): boolean => {
  const validationType = getValidationType();
  const actualTimestamp = getActualTimestamp();
  const decodedToken = getTokenDecode(token);

  if (validationType === "token") {
    if (decodedToken.exp - actualTimestamp < 60) return true;
    return false;
  } else {
    const gettedTime = getLocalTokenGettedTime();
    const elapsedTime = gettedTime - actualTimestamp;
    const shouldLiveToken = decodedToken.exp - decodedToken.nbf;

    if (shouldLiveToken - elapsedTime < 60) return true;
    return false;
  }
};

export { needRefreshToken, defineTokenExpirationModel };
