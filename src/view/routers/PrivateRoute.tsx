import { Navigate, Outlet } from "react-router-dom";
import { IonGrid } from "@ionic/react";
import { Toaster } from "sonner";
import { BASE_PATH, PublicRoutes } from "./Config";
import { SideBar } from "../shared/components/SideBar";
import { SecureWebStorage, storageConstants } from "../utils";

export const PrivateRoute = () => {
  const storage = new SecureWebStorage();
  const token = storage.getItem(storageConstants.ACCESS_TOKEN);
  const isUserAuthenticated = !!token;

  return (
    <>
      {!isUserAuthenticated ? (
        <Navigate to={`${BASE_PATH}${PublicRoutes.LOGIN}`} />
      ) : (
        <main className="main-wrapper">
          <SideBar />

          <IonGrid className="grid">
            <Outlet />
          </IonGrid>
        </main>
      )}

      <Toaster position="top-right" richColors />
    </>
  );
};
