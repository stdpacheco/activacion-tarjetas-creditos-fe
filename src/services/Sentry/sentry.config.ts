
const developmentEnvs: string[] = ["LOCAL", "DEV"];
const currentEnv = import.meta.env.VITE_REACT_APP_ENTORNO || "LOCAL";
const version = import.meta.env.VITE_VERSION || "0.0.0";

interface SentryConfig {
  dsn: string;
  environment: string;
  release: string;
  integrations: any[];
  ignoreErrors: string[];
  sampleRate: number;
  replaysSessionSampleRate: number;
  replaysOnErrorSampleRate: number;
  tracesSampleRate: number;
  debug: boolean;
}

export const devSettings: Partial<SentryConfig> = {
  dsn: import.meta.env.VITE_SENTRY_DSN || "",
  environment: currentEnv,
  release: `NEOWEB_3.0@${version}`,
  ignoreErrors: ["Ingrese biometria", "Ingrese codigo dactilar"],
  sampleRate: 0.5,
  replaysSessionSampleRate: 0.5,
  replaysOnErrorSampleRate: 0.5,
  tracesSampleRate: 0.5,
};

export const prodSettings: Partial<SentryConfig> = {
  dsn: import.meta.env.VITE_SENTRY_DSN || "",
  environment: currentEnv,
  release: `NEOWEB_3.0${version}`,
  ignoreErrors: [
    "Ingrese biometria",
    "Ingrese codigo dactilar",
    "No hubo Informacion del Response, Consulta sin Datos",
  ],
  sampleRate: 0.2,
  replaysSessionSampleRate: 0.2,
  replaysOnErrorSampleRate: 0.2,
  tracesSampleRate: 0.2,
};

export const sentryConfig: Partial<SentryConfig> = developmentEnvs.includes(currentEnv)
  ? devSettings
  : prodSettings;
