import { Modal } from "@/view/shared/modals";
import IonIcon from "@reacticons/ionicons";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ChicoBiometriaOne from "@/view/assets/guide_biometrics/guide1.png";
import ChicoBiometriaTwo from "@/view/assets/guide_biometrics/guide2.png";
import { useEffect, useRef, useState } from "react";
import { FacephiWidget } from "../../Recovery/components/FacephiWidget/FacephiWidget";
import { useBiometricSecurity } from "@/actions/implementations";
import {
  ContractBiometricSecurityType,

} from "@/domain/Entities";
import { useCSAStore } from "../store/useCSA";
import photoNotExists from "@/view/assets/csa/photo_not_exists.svg";

import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { useToast } from "@/hooks";
import { Button } from "@/view/shared/components";
import { Stack } from "@/components/Stack";
import { Edit } from "akar-icons";
import { AnalyticsService, GTMEventName } from "@/services/analytics/AnalyticsService";
import { GeneralValidationModal } from "./GeneralValidationModal";

interface FacephiValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (firstName?: string) => void;
  onEditIdentification: () => void;
  reAuthenticate: boolean;
}

export const FacephiValidationModal = (props: FacephiValidationModalProps) => {
  const swiperRef = useRef<SwiperRef>(null);
  const validationBiometric = useBiometricSecurity();

  const [showWidget, setShowWhidget] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useToast();
  const [deleteRequestModal, setDeleteRequestModal] = useState(false);
  const csaStore = useCSAStore();
  const [envioEvento, setEnvioEvento] = useState(0);
  const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
  const marca = useCSAStore.getState().currentCard.data[0].marca!;
  const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

  const handleValidateBiometric = async (image: string) => {
    setEnvioEvento(envioEvento + 1);
    if (envioEvento > 0) {
      AnalyticsService.sendEvent({
        pasoProceso: GTMEventName.BiometriaPaso3,
        pageTitle: "Biometria Paso 3",
        section: "activación-biometria-paso-3",
        tipo_Tarjeta: useCSAStore.getState().tipotarjeta![0],
        marca_afinidad: `${marca}-${afinidad}`,
        tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
      });
    }

    validationBiometric.mutate(
      {
        identification: csaStore?.identification ?? "",
        fingerprintCode: csaStore?.fingerprintCode ?? "",
        tokenizedPhoto: image,
        type: ContractBiometricSecurityType.biometric,
      },
      {
        onSettled: (data, error) => {

          if (error) {
            const mensaje = error.message?.toLowerCase() ?? "";


            const contieneBloqueo = mensaje.includes("bloqueado");
            const desactualizado = mensaje.includes("desactualizada");
            const intentosMatch = mensaje.match(/intento[s]?\s*(\d+)/i);
            const intentosFallidosMatch = mensaje.match(/intentos?\s+fallidos:\s*(\d+)/i);
            const intentosRestantesMatch = mensaje.match(/intentos?\s+restantes:\s*(\d+)/i);
            const intentos = intentosRestantesMatch?.[1] ?? intentosFallidosMatch?.[1] ?? intentosMatch?.[1];


            if (desactualizado) {
              setDeleteRequestModal(true);
            } else {
              if (contieneBloqueo) {
                toast.error({
                  title: error.message.split(".")[0],
                  description: error.message.split(".")[1],
                });

              }

              if (intentos === "1") {
                toast.error({
                  title: error.message.split(".")[0],
                  description: error.message.split(".")[1],
                });
              } else {
                if (!contieneBloqueo) {
                  toast.error({
                    title: error.message.split(".")[0],
                    description: error.message.split(".")[1],
                  });
                }
              }
            }




            return;

          }

          props.onComplete(data?.data?.datosPersona?.nombre1?.toCapitalize() ?? "");
        },
      }
    );
  };

  useEffect(() => {
    const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
    const marca = useCSAStore.getState().currentCard.data[0].marca!;
    const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;
    AnalyticsService.sendEvent({

      pasoProceso: GTMEventName.EmpezarBiometria,
      pageTitle: "ModalInicioBieometria",
      tipo_Tarjeta: useCSAStore.getState().tipotarjeta![0],
      section: "activación-modal-inicio-biometria",
      marca_afinidad: `${marca}-${afinidad}`,
      tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
    });

  }, []);

  return (
    <>
      <GeneralValidationModal
        isOpen={deleteRequestModal}
        title="No tenemos tu foto actualizada en nuestro sistema"
        description="Por tu seguridad, escríbenos a WhatsApp para continuar con la activación de tu tarjeta"
        actionPrimary={{
          text: "Abrir WhatsApp",
          onAction: () => {
            window
              .open(
                "https://api.whatsapp.com/send?phone=593983730100&text=Hola,%20necesito%20ayuda%20de%20un%20asesor%20para%20abrir%20mi%20Cuenta%20de%20Ahorros%20desde%20el%20App",
                "_blank"
              )
              ?.focus();
          },
        }}
        actionSecondary={{
          text: "Salir",
          onAction: () => {
            location.reload();
          },
        }}
        image={photoNotExists}
      />
      {!deleteRequestModal && (
        <Modal
          isOpen={props.isOpen}
          onClose={props.onClose}
          contentClass={`max-w-[100%] lg:h-auto md:h-auto  sm:max-w-[100%] md:max-w-[70%] lg:max-w-[30%] grid ${showWidget ? "items-start" : ""
            }`}
        >
          <div>
            <div className="border-b-[0.5px]">
              <div className="flex justify-between items-center content-center">
                <h1 className="text-start p-4 text-base flex flex-wrap items-center">
                  Validaremos la identidad de la cédula{" "}
                  <span className="flex items-center ml-1">
                    <strong>{csaStore.identification ?? ""}</strong>
                    <Edit
                      className="mx-1 text-link cursor-pointer"
                      size={16}
                      onClick={() =>
                        !validationBiometric.isPending && props.onEditIdentification()
                      }
                    />
                  </span>
                </h1>

                <IonIcon
                  onClick={() => !validationBiometric.isPending && props.onClose()}
                  className="cursor-pointer"
                  size="large"
                  name="close-outline"
                />
              </div>
            </div>
          </div>
          {!showWidget ? (
            <div className="p-4 grid max-h-[80vh] overflow-auto scrollBar">
              <Swiper
                className="max-w-[70%] sm:max-w-[70%] md:max-w-[70%] lg:max-w-[80%]"
                ref={swiperRef}
                modules={[Navigation]}
                pagination={{ clickable: true }}
                onSlideChange={(e) => {
                  setActiveIndex(e.activeIndex);
                }}
              >
                <SwiperSlide
                  onLoad={

                    () => {
                      const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
                      const marca = useCSAStore.getState().currentCard.data[0].marca!;
                      const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;


                      AnalyticsService.sendEvent({

                        pasoProceso: GTMEventName.GuiaBiometria,
                        pageTitle: "Guia Biometria",
                        tipoTarjeta: useCSAStore.getState().tipotarjeta![0],
                        section: "activación-modal-guia-biometria",
                        marca_afinidad: `${marca}-${afinidad}`,
                        tipoUsuario: tipoUsuario === 'A' ? 'A' : 'P',

                      });
                    }
                  }>
                  <Stack direction="column" space={16} align="center" justify="center">
                    <div className="flex justify-center">
                      <img
                        className="w-[100%] lg:w-[60%] md:w-[70%] rounded-[50%]"
                        src={ChicoBiometriaOne}
                      />
                    </div>
                    <h1 className="font-bold text-center">
                      Ubica tu rostro frente a la cámara
                    </h1>
                    <p className="text-base text-center">
                      Mantén los ojos abiertos y evita usar lentes o gafas.
                    </p>
                  </Stack>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="grid gap-4 justify-center  text-center">
                    <div className="flex justify-center p-2">
                      <img
                        className="w-[100%] lg:w-[60%] md:w-[70%] rounded-[50%]"
                        src={ChicoBiometriaTwo}
                      />
                    </div>
                    <h1 className="font-bold">Ubica tu rostro frente a la cámara</h1>
                    <p className="text-base">
                      Busca un lugar iluminado y evita ponerte de espaldas a la luz.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="grid grid-flow-col justify-center gap-1 p-4">
                {[0, 1].map((_value, id) => {
                  return (
                    <span
                      key={id}
                      className={`rounded-full ${activeIndex == id ? "bg-primary" : "bg-color-tertiary"
                        } w-2 h-2`}
                    ></span>
                  );
                })}
              </div>
              <div>
                <Accordion className="bg-color-tertiary-variant rounded-lg">
                  <AccordionItem
                    header={(state) => {
                      return (
                        <>
                          <p className="font-bold text-base">Términos de uso</p>
                          <IonIcon
                            name="chevron-down"
                            className={`ml-auto transition-transform duration-200 ease-out ${state.state.isEnter && "rotate-180"
                              }`}
                          />
                        </>
                      );
                    }}
                    buttonProps={{
                      className: ({ isEnter }) =>
                        `flex w-full p-4 text-left rounded-lg hover:bg-color-tertiary ${isEnter && "bg-color-tertiary-variant"
                        }`,
                    }}
                    contentProps={{
                      className: "transition-height duration-200 ease-out",
                    }}
                    panelProps={{ className: "p-4" }}
                  >
                    <p className="text-base opacity-50">
                      Autorizo a Banco Guayaquil S.A. ("Banco") a capturar mis patrones o
                      datos biométricos, incluídas mis retinas y/o iris, para que los registre
                      y almacene en sus bases de datos, archivos o sistemas con la siguiente
                      finalidad: (1) valide mi identidad para el ingreso y operación de sus
                      canales transaccionales; (2) valide mi identidad y consentimiento al
                      momento de contratar u ordenar productos o servicios del Banco o de
                      terceros ofertados en los canales del Banco
                    </p>
                  </AccordionItem>
                </Accordion>
                <div className="py-4 lg:px-[20%] md:px-[20%]">
                  <Button
                    disabled={validationBiometric.isPending}
                    onClick={() => {
                      if (swiperRef.current?.swiper?.isEnd) {
                        setShowWhidget(true);
                        return;
                      }
                      swiperRef.current?.swiper.slideNext();
                    }}
                    showSpinner={validationBiometric.isPending}
                    size="sm"
                    label="Continuar"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 grid justify-center items-center">
              <FacephiWidget
                isCaptureStarted={showWidget}
                setImageTokenize={handleValidateBiometric}
                setIsCaptureStarted={setShowWhidget}
              />
            </div>
          )}
        </Modal>
      )}
    </>
  );

};
