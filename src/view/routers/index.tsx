import { RouteObject, createBrowserRouter } from "react-router-dom";
import { BASE_PATH } from "./Config";
import { PublicRoute } from "./PublicRoute";
import { RecoveryContextProvider } from "@/usecases/contexts/useRecoveryContext";
import { ContractSavingAccount } from "../pages/ContractSavingAccount";

const routes: Array<RouteObject> = [
  {
    path: BASE_PATH,
    element: (
      <RecoveryContextProvider>
        <PublicRoute />
      </RecoveryContextProvider>
    ),
    children: [
      {
        index: true,
        path: BASE_PATH,
        element: <ContractSavingAccount />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
