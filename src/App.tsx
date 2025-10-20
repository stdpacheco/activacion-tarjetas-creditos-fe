import { useEffect } from "react";
import { heapLoader, analyticsService } from "heap-library";
import { RouterProvider } from "react-router-dom";
import { router } from "./view/routers";
import { loadFingerprint } from "./view/utils";
import { useAppSelector } from "./hooks";
import "swiper/css";
import "swiper/css/navigation";
import TagManager from "react-gtm-module";


export const AppBVP = () => {
  const userGuid = useAppSelector((state) => state.user.guid);
  const tagManagerArgs = {
    gtmId: import.meta.env.VITE_GTM_ID,
  };

  const initUserGuid = (guid: string) => {
    try {
      if (guid) {
        analyticsService.registrarIdentify(guid);
      }
    } catch (e) {
      e;
    }
  };

  useEffect(() => {
    if (userGuid) {
      initUserGuid(userGuid);
    }
  }, [userGuid]);

  useEffect(() => {
    heapLoader.initialize(import.meta.env.VITE_HEAP_ID);
    TagManager.initialize(tagManagerArgs);
    loadFingerprint();

  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
