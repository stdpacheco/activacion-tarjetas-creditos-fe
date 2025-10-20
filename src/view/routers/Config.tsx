export const BASE_PATH = import.meta.env.VITE_BASE_PATH ?? "/";

export const PublicRoutes = {
  CONTRACT_SAVING_ACCOUNT: "/",
  LOGIN: "login",
  RECOVERY: "",
  VALIDATE_FACEPHI: "",
  RECOVER_METHOD: "",
  VALIDATE_FACTOR: "",
  NEW_PASSWORD: "",
};

export const PrivateRoutes = {
  RESUME: "biometria",
  PREFERENCES: "",
  PAY_SERVICES: "",
};
