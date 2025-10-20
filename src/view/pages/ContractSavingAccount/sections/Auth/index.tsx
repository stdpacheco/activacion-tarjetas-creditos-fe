import {
  forwardRef,
  Fragment,
  memo,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { Stack } from "@/components/Stack";
import {
  Biometric,
  FingerprintCode,
  IDNumber,
  SingleActionMessage,
} from "./components";
import { IMessage, ISeptionProps } from "../../interfaces";
import { MessageSenderType, MessageType } from "../../types";
import { MessageBubble } from "../../components/MessageBubble";
import { useChatUtilStore } from "../../hooks/useChatUtils";
const toast = useToast();
import { AnalyticsService, GTMEventName } from "@/services/analytics/AnalyticsService";
import { useCSAStore } from "../../store/useCSA";

import { ContractOTP, FinishContract } from "../ContractAccount/components/index";
import { useContractAccount } from "@/actions/implementations";
import { useToast } from "@/hooks";


const AuthSection = memo(
  forwardRef<HTMLDivElement, PropsWithChildren<ISeptionProps>>(({ }, ref?) => {
    const chatUtils = useChatUtilStore();
    const [showMessages, setShowMessages] = useState<IMessage[]>([]);

    const contractAccount = useContractAccount();
    const grettingMessages: IMessage[] = [
      {
        sender: MessageSenderType.Bot,
        type: MessageType.Interactive,
        IC: (
          <SingleActionMessage
            textBody="¡Hola! Vamos a activar tu tarjeta 😊"
            textButton="Empezar"
            onAction={() => {

              chatUtils.passToMessages({
                from: [
                  {
                    type: MessageType.Text,
                    text: "Empezar",
                    sender: MessageSenderType.User,
                    isLast: true,
                  },
                  ...IDMessages,
                ],
                to: (value) => setShowMessages((state) => [...state, value]),
              });
            }}
          />
        ),
      },
    ];

    const IDMessages: IMessage[] = [
      {
        id: "msgs-id",
        text: "Primero necesitamos validar tu identidad 👀",
        type: MessageType.Text,
      },
      {
        type: MessageType.Interactive,
        IC: (
          <IDNumber
            onEdit={() => {
              setShowMessages((state) => state.slice(0, 4));
            }}
            onComplete={() => {
              chatUtils.passToMessages<IMessage>({
                from: FingerprintMessages,
                to: (value) => setShowMessages((state) => [...state,
                {
                  ...value,
                  text: value.text?.toReplaceAll("nickname", useCSAStore.getState().firstName.toCapitalize())
                }
                ]),
              });
            }}
          />
        ),
      },
    ];

    const FingerprintMessages: IMessage[] = [
      {
        text: `Listo ✨ Ten la tarjeta que quieres activar a la mano`,
        type: MessageType.Text,
        sender: MessageSenderType.Bot,
      },
      {
        type: MessageType.Interactive,
        IC: (
          <FingerprintCode
            onEdit={() => {
              setShowMessages((state) => state.slice(0, 6));
            }}
            onComplete={() => {


              const tipoProducto = useCSAStore.getState().tipoIdentification;
              const tipoTarjeta = useCSAStore.getState().tipotarjeta;
              const tipoIdentificacionValida = useCSAStore.getState().currentCard.data[0].tipoIdentificacion!;


              const celularQuemado = "0993217495";
              const realCelular = localStorage.getItem("CSA_PHONE_NUMBER");
              const celularCompleto = realCelular || celularQuemado;
              const ultimos4Digitos = celularCompleto.slice(-4);
              const celularmsg = `Te enviaremos un código de seguridad al celular terminado en ${ultimos4Digitos}`;


              const PersonalMessages: IMessage[] = [
                {
                  text: `Nos falta un paso más para activar tu Tarjeta de ${tipoTarjeta.toLowerCase().toCapitalize()} ✨`,
                  type: MessageType.Text,
                  sender: MessageSenderType.Bot,
                },
                {
                  type: MessageType.Interactive,
                  IC: (
                    <SingleActionMessage
                      textButton="Enviar Código"
                      textBody={celularmsg}
                      onAction={() => {

                        const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
                        const marca = useCSAStore.getState().currentCard.data[0].marca!;
                        const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;


                        AnalyticsService.sendEvent({

                          pasoProceso: GTMEventName.IngresoOTPPaso5,
                          pageTitle: "Ingreso otp",
                          tipoTarjeta: useCSAStore.getState().tipotarjeta![0],
                          section: "activación-modal-ingreso-otp",
                          marca_afinidad: `${marca}-${afinidad}`,
                          tipoUsuario: tipoUsuario === 'A' ? 'A' : 'P',

                        });

                        setShowMessages((state) => state.slice(0, -1));

                        chatUtils.passToMessages<IMessage>({
                          from: [
                            {
                              type: MessageType.Interactive,
                              IC: (

                                <ContractOTP
                                  onComplete={(_code: string) => {
                                    chatUtils.passToMessages<IMessage>({
                                      from: successContractMessages,
                                      to: (message) => setShowMessages((state) => [...state, message]),
                                    });
                                  }}
                                />
                              ),
                            },
                          ],
                          to: (message) => setShowMessages((state) => [...state, message]),
                        });
                      }}
                      className="min-w-[20dvw] p-3"
                    />
                  ),
                },

              ];

              const siguienteMensajes = ((tipoProducto == "PASAPORTE" && tipoIdentificacionValida == "P") || tipoTarjeta == "Débito")
                ? PersonalMessages
                : BiometricMessages;

              chatUtils.passToMessages<IMessage>({
                from: siguienteMensajes,
                to: (value) => setShowMessages((state) => [
                  ...state,
                  {
                    ...value,
                    text: value.text
                      ?.toReplaceAll("nickname", useCSAStore.getState().firstName.toCapitalize())
                      ?.toReplaceAll("celularmsg", localStorage.getItem("CSA_PHONE_NUMBER")!),
                  },
                ]),
                onComplete: () => { },
              });

            }}
          />
        ),
      },
    ];

    const BiometricMessages: IMessage[] = [
      {
        type: MessageType.Interactive,
        IC: (

          <Biometric

            textBody="Ahora vamos a tomarte una foto rápida para continuar 📷"

            onEditIdentication={() => {
              setShowMessages((state) => {
                const searchIndex = state.findIndex((s) => s.id == "msgs-id");
                return [...state.slice(-1, searchIndex)];
              });
              chatUtils.passToMessages({
                from: IDMessages,
                to: (value) => setShowMessages((state) => [...state, value]),
              });
            }}

            onComplete={() => {
              contractAccount.mutate(
                {
                  identificacion: useCSAStore.getState().identification,
                  digito: useCSAStore.getState().last6DigitsCard,
                  canal: "NEOWEB",
                  otp: ""
                },
                {
                  onSuccess: () => {
                    chatUtils.passToMessages<IMessage>({
                      from: successContractMessages,
                      to: (value) =>
                        setShowMessages((state) => [
                          ...state,
                          {
                            ...value,
                            text: value.text?.toReplaceAll("nickname", useCSAStore.getState().firstName.toCapitalize()),
                          },
                        ]),
                    });
                  },
                  onError: () => {

                    toast.error({
                      title: "Error al activar la tarjeta",
                      description: "Por favor, intenta nuevamente más tarde.",
                      duration: 5000,
                    });

                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  },
                }
              );

            }}
          />
        ),
      },

    ];

    const successContractMessages: IMessage[] = [
      {
        type: MessageType.Interactive,
        IC: <FinishContract onComplete={() => { }} />,
      },
    ];


    useEffect(() => {
      if (showMessages.length == 0) {
        chatUtils.passToMessages<IMessage>({
          from: grettingMessages,
          to: (value) => {
            setShowMessages((message) => [...message, value]);
          },
          delay: 1000,
        });
      }
    }, []);

    return (
      <div className="relative" ref={ref}>

        <Stack direction="column" space={16}>
          {showMessages.map((msg, index) => {
            return msg?.type == MessageType.Text ? (
              <MessageBubble
                key={index}
                sender={msg.sender ?? MessageSenderType.Bot}
                text={msg.text}
                isLast={msg.isLast}
              />
            ) : (
              <Fragment key={index}>{msg.IC}</Fragment>
            );
          })}
        </Stack>
      </div>
    );

  })
);

export default AuthSection;