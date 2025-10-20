/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_ENTORNO: "LOCAL" | "DEV" | "PROD";
  readonly VITE_HEAP_ID: string;
  readonly VITE_GUID_API: string;
  readonly VITE_HTTP_TIMEOUT: string;
  readonly VITE_BASE_PATH: string;
  readonly VITE_CRYPTO_KEY: string;
  readonly VITE_AUTHORIZATION_BASE_URL: string;
  readonly VITE_PHOTO_TEMPLATE_RAW: string;
  readonly VITE_GTM_ID: string;
  readonly VITE_ID_PRODUCTO_TC: string;
  readonly VITE_ID_PRODUCTO_TD: string;
  readonly VITE_OTP_KEY: string;
  readonly VITE_OTP_IV: string;
}
