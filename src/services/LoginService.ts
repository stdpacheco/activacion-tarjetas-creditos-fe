import Http from "./http/Http";
import axios, { AxiosHeaders } from "axios";
import { IOtpLogin, IUserCredentials } from "../domain/Entities";
import { SecureWebStorage, storageConstants } from "@/view/utils";
import { BASE_PATH, PublicRoutes } from "@/view/routers/Config";

export const login = async (data: IUserCredentials) => {
  const info = {
    Username: data.username,
    Password: data.password,
  };
  const url = "/authentication/v1/try-login";
  const response = await Http.post(url, info);
  return response.data;
};

export const otpAutheticathion = async (data: IOtpLogin) => {
  const url = "/authentication/v1/double-factor";

  const response = await Http.post(url, data);
  return response.data;
};

export const refreshToken = async () => {
  const storage = new SecureWebStorage();
  const URL_BACK = import.meta.env.VITE_REACT_APP_API_BACK;
  const url = URL_BACK + "/authentication/v1/renew-token";

  const token = storage.getItem(storageConstants.ACCESS_TOKEN) ?? "";
  const refreshToken = storage.getItem(storageConstants.REFRESH_TOKEN) ?? "";
  const fingerPrint = storage.getItem(storageConstants.FINGERPRINT) ?? "";

  const headers = new AxiosHeaders();

  headers.setAuthorization(`Bearer ${token}`);
  headers.set("refreshToken", refreshToken);
  headers.set("FingerPrint", fingerPrint);
  headers.set("Version", import.meta.env.VITE_VERSION ?? "");

  const response = await axios.post(url, null, { headers });

  if (response.status === 200) return response;

  if (response.status === 500) {
    location.replace(BASE_PATH.concat(PublicRoutes.LOGIN));
  }
};
