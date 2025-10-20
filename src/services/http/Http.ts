import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { needRefreshToken } from "@/actions/helpers/RefreshTokenValidations";
import { refreshToken } from "../LoginService";
import {
  SecureWebStorage,
  getSafeNumber,
  loadFingerprint,
  storageConstants,
} from "@/view/utils";
import { ForgeUtils } from "@/view/utils/ForgeUtils";

import * as Sentry from "@sentry/react";

export interface CustomInternalAxiosRequestConfig<T = any>
  extends InternalAxiosRequestConfig<T> {
  sentrySpan?: Sentry.Span;
}

const URL_BACK = import.meta.env.VITE_REACT_APP_API_BACK;

const Http = axios.create({
  baseURL: URL_BACK,
});

const requestInterceptor = async (
  req: CustomInternalAxiosRequestConfig
): Promise<CustomInternalAxiosRequestConfig> => {
  const storage = new SecureWebStorage();
  const token = storage.getItem(storageConstants.ACCESS_TOKEN) ?? "";
  const fingerPrint = storage.getItem(storageConstants.FINGERPRINT);
  const httpTimeout = getSafeNumber(import.meta.env.VITE_HTTP_TIMEOUT);

  req.timeout = httpTimeout;

  req.headers.set("Version", import.meta.env.VITE_VERSION ?? "");
  req.headers.set("Content-Type", "application/json;charset=UTF-8");




  if (["LOCAL"].includes(import.meta.env.VITE_REACT_APP_ENTORNO)) {
    console.group(`Send request: ${req.url?.toReplaceAll(req.baseURL ?? "", "")}`);
  }


  req.data = encryptBodyRequest(req);


  const fpDefault = await loadFingerprint();
  req.headers.set("FingerPrint", fingerPrint ?? fpDefault);

  if (token) {
    req.headers.setAuthorization(`Bearer ${token}`);
    if (needRefreshToken(token)) {
      const res = await refreshToken();
      if (res) {
        storage.setItem(storageConstants.ACCESS_TOKEN, res.data.accessToken);
        storage.setItem(storageConstants.REFRESH_TOKEN, res.data.refreshToken);
        req.headers.setAuthorization(`Bearer ${res.data.accessToken}`);
      }
    }
  }


  return req;
};

const errorInterceptor = (error: AxiosError) => {
  const status = error.response?.status || error.status || 500;
  const method = error.config?.method?.toUpperCase() || "UNKNOWN";
  const endpoint =
    error.config?.url?.replace(error.config.baseURL ?? "", "") || "UNKNOWN";

  const config = error.config as CustomInternalAxiosRequestConfig;
  if (config?.sentrySpan) {
    config.sentrySpan.end();
  }

  Sentry.captureEvent({
    message: error.message || "Request Error",
    level: "error",
    tags: {
      endpoint,
      method,
      status,
      stack: error.stack,
    },
    type: "replay_event",
  });


  if (status === 401) {
    const storage = new SecureWebStorage();
    storage.setItem(storageConstants.ACCESS_TOKEN, "");
    storage.setItem(storageConstants.SESSION_EXPIRED, "true");
  }

  if (["LOCAL"].includes(import.meta.env.VITE_REACT_APP_ENTORNO)) {
    console.groupEnd();
  }

  return Promise.resolve(error.response ?? { ...error, status: 500, code: "ERROR" });
};

const responseInterceptor = (res: AxiosResponse): AxiosResponse => {

  const requestUrl = res.config.url || "";

  const config = res.config as CustomInternalAxiosRequestConfig;

  if (config.sentrySpan) {
    config.sentrySpan.end();
  }

  let decryptedData: any;
  function keysToLowerCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(keysToLowerCase);
    } else if (obj !== null && typeof obj === "object") {
      return Object.keys(obj).reduce((acc, key) => {
        const lowerKey = key.charAt(0).toLowerCase() + key.slice(1); // primera minúscula
        acc[lowerKey] = keysToLowerCase(obj[key]);
        return acc;
      }, {} as any);
    }
    return obj;
  }
  if (res.status === 200) {

    decryptedData = JSON.parse(ForgeUtils.decryptJWE(res.data.data));
    decryptedData = keysToLowerCase(decryptedData);
    res.data = decryptedData;

    if (decryptedData.code !== 0) {

      const endpoint = requestUrl || res.config.baseURL || "";
      const method = res.config.method?.toUpperCase() || "";

      Sentry.captureEvent({
        message: decryptedData.message || decryptedData || "Service validation",
        level: "info",
        tags: {
          endpoint,
          method,
          responseCode: decryptedData.code || "",
        },
      });

    }
  }
  return res;
};



const encryptBodyRequest = (request: CustomInternalAxiosRequestConfig<any>) => {
  const allowedMethods = ["POST", "PUT", "PATCH"];
  const notAllowedEnvs: string[] = [];
  const method = request.method?.toUpperCase() as string;

  if (
    allowedMethods.includes(method) &&
    request.data &&
    !notAllowedEnvs.includes(import.meta.env.VITE_REACT_APP_ENTORNO)
  ) {
    return {
      data: ForgeUtils.generateJWE(JSON.stringify(request.data)),
    };
  }

  return request.data;
};

Http.interceptors.request.use(requestInterceptor);
Http.interceptors.response.use(responseInterceptor, errorInterceptor);

export default Http;