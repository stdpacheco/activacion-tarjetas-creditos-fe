import { configureStore, Middleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import credentialsReducer from "./Slices/credentialsSlice";
import userReducer from "./Slices/userSlice";
import { SecureWebStorage, storageConstants } from "@/view/utils";

const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);

  const storage = new SecureWebStorage();
  const userActions = [
    "user/setUser",
    "user/setGuid",
    "user/setPreferences",
    "user/clearUser",
  ];

  if (userActions.includes(action.type)) {
    const data = store.getState()?.user;
    storage.setItem(storageConstants.USER_LOGGED_DATA, data);
  }
  
};

const rootReducer = combineReducers({
  credentials: credentialsReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
