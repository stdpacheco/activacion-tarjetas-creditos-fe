import { Stack } from "@/components/Stack";
import { BGAvatar, SideBar } from "@/view/shared/components";
import IconLogo from "@/components/assets/Isotipo.svg";
import IconLogoWhite from "@/components/assets/isotipe-white.svg";
import AuthSection from "./sections/Auth";
import ResumingRequest from "./sections/Auth/components/ResumingRequest/ResumingRequest";
import { AnimatePresence, motion } from "framer-motion";
import { MessageBubble, MessageSenderType } from "./components/MessageBubble";
import { GeneralValidationModal } from "./modals";
import { ActionValidationType, useValidationModalStore } from "./store/useValidationModalStore";
import { useChatUtilStore } from "./hooks/useChatUtils";
import { memo, useEffect, useState } from "react";
import { IonSpinner } from "@ionic/react";
import IonIcon from "@reacticons/ionicons";
import { useHistoryStore } from "./store/useHistoryStore";
import { AnalyticsService, GTMEventName } from "@/services/analytics/AnalyticsService";
import exitActivation from "@/view/assets/csa/exit_activation.svg";


export const ContractSavingAccount = memo(() => {

  useEffect(() => {
    AnalyticsService.sendEvent({

      pasoProceso: GTMEventName.Inicio,
      pageTitle: "ModalBienvenida",
      section: "activación-inicio",

    });

  }, []);

  const { loading } = useChatUtilStore();
  const { loadingHistory } = useHistoryStore();
  const csaValidationModals = useValidationModalStore();
  const [openModal, setOpenModal] = useState(false);

  const [showSidebar] = useState(false);

  return (
    <div
      className={`grid min-h-screen w-full overflow-hidden transition-all duration-300 bg-color-tertiary ${showSidebar ? 'lg:grid-cols-[280px_1fr]' : 'grid-cols-1'
        }`}
    >

      {showSidebar && (
        <SideBar>
          <div className="flex justify-center p-4">
            <p>Contenido del sidebar</p>
          </div>
        </SideBar>
      )}

      <div className="flex flex-col border-l-[0.5px] h-screen">
        <div className="flex justify-between items-center px-4 h-[56px] border-b-[0.5px] bg-color-tertiary-variant">
          <div className="flex items-center">

            <div className="hidden sm:flex items-center">
              <BGAvatar src={IconLogo} size={32} insideSpace={12} />
              <p className="text-md px-2">
                Banco Guayaquil - Portal de activación de tarjetas
              </p>
            </div>


            <div className="sm:hidden flex items-center">
              <button
                className="text-gray-500 text-3xl bg-transparent p-2"
                onClick={() => {
                  setOpenModal(true);
                  useValidationModalStore.getState().openModal({
                    type: "error",
                    actionType: ActionValidationType.Biometric,
                  });
                }}
                aria-label="Volver"
                style={{
                  backdropFilter: "none",
                  backgroundColor: "transparent",
                  WebkitTapHighlightColor: "transparent"
                }}
              >
                ✕
              </button>
            </div>

          </div>

        </div>

        <div className="flex flex-col flex-1 justify-stretch overflow-x-auto p-4 lg:p-20 sm:p-8">
          <div>

            <Stack direction="column" align="center" space={20} paddingY={48}>
              <br />
              <BGAvatar
                src={IconLogoWhite}
                size={80}
                insideSpace={32}
                className="bg-white"
              />

              <h4 className="text-center text-base font-bold">Banco Guayaquil</h4>
              <p className="text-center text-md">

              </p>
              <Stack
                className="text-base w-[100%] sm:w-[100%] md:w-[50%] xl:w-[40%]"
                direction="column"
                align="start"
                space={16}
                paddingY={8}
              >
                <Stack direction="row" align="center" space={24} justify="start">
                  <IonIcon className="text-xl" name="card" />
                  <p>Ten tu tarjeta a la mano para activarla en menos de 3 minutos.</p>{" "}
                </Stack>
                <Stack direction="row" align="center" space={24} justify="start">
                  <IonIcon className="text-xl" name="camera" />
                  <p>
                    Es posible que te pidamos acceso a tu cámara para validar tu identidad. Acepta los permisos para continuar con la activación.
                  </p>{" "}
                </Stack>
              </Stack>
            </Stack>

          </div>

          <Stack direction="column" space={16}>

            <AuthSection
              onComplete={() => {
              }}
            />

            <AnimatePresence>
              <motion.div
                className="min-h-4 h-4"
                ref={(ref) => {
                  if (ref) {
                    ref.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                animate={{
                  scale: loading ? 1 : 0,
                  transformOrigin: "left",
                }}
                initial={{
                  scale: loading ? 0 : 1,
                  transformOrigin: "left",
                }}
              >
                <MessageBubble isLast sender={MessageSenderType.Bot}>
                  <div className="h-1 w-4 relative">
                    <IonSpinner
                      className="absolute left-[-6px] top-[-12px] scale-125"
                      name="dots"
                    />
                  </div>
                </MessageBubble>
              </motion.div>
            </AnimatePresence>
          </Stack>
        </div>
      </div>

      <GeneralValidationModal
        isOpen={openModal}
        {...csaValidationModals.modal}
        title="¿Seguro quieres salir del proceso de activación de tarjeta?"
        description="Si dejas la activación para más tarde, tendrás que ingresar todo de nuevo"
        actionPrimary={{
          text: "Volver",
          onAction: () => {
            setOpenModal(false);
          }
        }}
        actionSecondary={{
          text: "Salir",
          onAction: () => {
            window.location.reload();
          }
        }}
        image={exitActivation}
      />

      {loadingHistory && <ResumingRequest />}
    </div>
  );
});

ContractSavingAccount.displayName = "ContractSavingAccount";
