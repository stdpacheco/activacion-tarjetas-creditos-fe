import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenUser } from "../../domain/Entities";

const initialState: TokenUser = {
  accessToken: "",
  refreshToken: "",
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenUser>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: () => {
      return initialState;
    },
  },
});

export const { setTokens, clearTokens } = tokensSlice.actions;
export default tokensSlice.reducer;
