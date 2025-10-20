import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { storageConstants } from "./constants";
import { SecureWebStorage } from "./SecureWebStorage";

const generateFingerprint = async (): Promise<string> => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
};

export const loadFingerprint = async (): Promise<string> => {
  const storage = new SecureWebStorage();

  const fpKey = storageConstants.FINGERPRINT;
  const fingerprintStored = storage.getItem(fpKey);

  if (!fingerprintStored) {
    const fp = await generateFingerprint();

    storage.setItem(fpKey, fp);
    return fp;
  }

  return fingerprintStored;
};
