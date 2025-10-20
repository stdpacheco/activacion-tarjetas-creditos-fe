import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { AppBVP } from "./App";
import { store } from "./Store";

import "./index.css";
import "./view/styles/main.scss";

import "./view/utils/prototypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import IonIcon from "@reacticons/ionicons";



const rootNode = document.getElementById("root") as HTMLElement;

const queryClient = new QueryClient();

createRoot(rootNode).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppBVP />
      <Toaster
        icons={{
          error: <IonIcon name="alert-circle" />,
        }}
      />
    </QueryClientProvider>
  </Provider>
);
