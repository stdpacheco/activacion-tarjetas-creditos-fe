import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserCredentials } from "../../domain/Entities";

const initialState: IUserCredentials = {
  username: "",
  password: "",
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserCredentials>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    clearCredentials: (state) => {
      state.username = "";
      state.password = "";
    },
  },
});

export const { setCredentials, clearCredentials } = credentialsSlice.actions;
export default credentialsSlice.reducer;
