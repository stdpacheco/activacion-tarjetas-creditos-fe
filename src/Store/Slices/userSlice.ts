import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserData, IUserPreferences } from "../../domain/Entities";
import { SecureWebStorage, storageConstants } from "@/view/utils";

const defaultState: IUserData = {
  nombre: "",
  cedula: "",
  correo: "",
  celular: "",
  medioContacto: "",
  guid: "",
  preferencias: undefined,
  tipoIdentificacion: "",
};

const initialState: IUserData = (() => {
  const storage = new SecureWebStorage();

  const persistedState = storage.getItem(storageConstants.USER_LOGGED_DATA);

  if (persistedState) {
    return JSON.parse(persistedState) as IUserData;
  }

  return defaultState;
})();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setGuid: (state, action: PayloadAction<string>) => {
      state.guid = action.payload;
    },
    clearUser: () => {
      return defaultState;
    },
    setPreferences: (state, action: PayloadAction<IUserPreferences>) => {
      state.preferencias = action.payload;
    },
  },
});

export const { setUser, clearUser, setGuid, setPreferences } = userSlice.actions;
export default userSlice.reducer;
