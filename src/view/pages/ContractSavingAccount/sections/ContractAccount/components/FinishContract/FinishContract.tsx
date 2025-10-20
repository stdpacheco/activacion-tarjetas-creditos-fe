import { Stack } from "@/components/Stack";
import {
  MessageBubble,
  MessageSenderType,
} from "@/view/pages/ContractSavingAccount/components/MessageBubble";
import { IMessageProps } from "@/view/pages/ContractSavingAccount/interfaces";
import { Button } from "@/view/shared/components";
import IonIcon from "@reacticons/ionicons";
import { FC, memo, useEffect, useMemo } from "react";
import successContract from "@/components/assets/animation_success_contract.json";
import Lottie from "lottie-react";
import styles from "./finishContract.module.scss";
import { useToast } from "@/hooks";
import {
  ContractResponse,
  ContractSAAPIResponse,
  ContractsAccountCodeType,

} from "@/domain/Entities";
import useStableBlast from "@/view/shared/hooks/useStableBlast";
import { useCSAStore } from "@/view/pages/ContractSavingAccount/store/useCSA";
import ExternalClientBanner from "@/components/assets/external_clients_banner.svg";
import { useJobInformationStore } from "../../../JobInformation/store/useJobInformationStore";
import { AnalyticsService, GTMEventName } from "@/services/analytics/AnalyticsService";
import CreditImage from "@/view/assets/activation/Hand_Credit.png";
import DebitImage from "@/view/assets/activation/Hand_Debit.png";
import mobileImage from "@/view/assets/activation/celulares.png";

interface propsFinish extends IMessageProps {
  name?: string
}

export const FinishContract: FC<propsFinish> = memo((_props) => {
  const svgBackgroundUrl = "data:image/svg+xml;utf8,%3Csvg width='138' height='127' viewBox='0 0 138 127' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath id='Intersect' fill-rule='evenodd' clip-rule='evenodd' d='M68.6833 127H54.9756L0.413574 72.3633L31.1215 41.6133L61.8294 72.3633L133.731 0.363281H137.774V57.8143L68.6833 127Z' fill='white' fill-opacity='0.12'/%3E%3C/svg%3E";
  const toast = useToast();

  const [contractDetails, _] = useStableBlast<
    ContractSAAPIResponse<ContractResponse> | undefined
  >(undefined);
  const csaStore = useCSAStore.getState();
  const getDetailContents = useMemo(() => {
    const details = {
      [ContractsAccountCodeType.Online]: {
        title: "¡Todo listo! Tu cuenta está activa",
        description:
          "Copia y comparte tu número de cuenta, agrega dinero y alcanza tus metas más rápido",
        numberAccount: contractDetails?.data?.numeroCuenta ?? "",
        showAnimation: true,
      },
      [ContractsAccountCodeType.GluedAccount]: {
        title: "En unos minutos pordrás usar tu cuenta de ahorros",
        description:
          "Por favor, espera 5 minutos y vuelve para crear tu usuario y contraseña.",
        numberAccount: contractDetails?.data?.numeroCuenta ?? "",
        showAnimation: false,
      },
      [ContractsAccountCodeType.CreateAccountNextDay]: {
        title:
          "Tu Cuenta de Ahorros se creó y estará lista para usar a partir de las 07:00 AM ⌛",
        description: "Enviaremos tu contrato y número de cuenta a tu mail.",
        numberAccount: undefined,
        showAnimation: false,
      },
      ["default"]: {
        title: "",
        description: "",
        numberAccount: "",
        showAnimation: false,
      },
    };
    return details[contractDetails?.code as keyof typeof details] ?? details["default"];
  }, [contractDetails]);

  const { hasExternalResidence } = useJobInformationStore();

  const handleLogIn = () => {

    window.open(
      "https://bancavirtual.bancoguayaquil.com/BMultiPersonas/indexAlternativoP.html",
      "_blank"
    );
  };

  const handleFinish = () => {
    window.location.reload();
  };

  const handleCopyClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info({ description: "Número de cuenta copiado correctamente" });
    } catch (err) {
      if (err instanceof Error) {
        toast.error({ description: err.message });
      }
    }
  };

  const getCardImageByBinAndAffinity = (): any => {

    const tipoTarjeta = useCSAStore.getState().tipotarjeta;

    if (tipoTarjeta === "Débito") {
      return DebitImage;
    }
    return CreditImage;

  }

  useEffect(() => {

    const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
    const marca = useCSAStore.getState().currentCard.data[0].marca!;
    const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;
    AnalyticsService.sendEvent({
      pasoProceso: GTMEventName.FinPaso6,
      pageTitle: "Activación de Tarjeta exitosa",
      tipo_tarjeta: useCSAStore.getState().tipotarjeta![0],
      section: "FinishContract",
      marca_afinidad: `${marca}-${afinidad}`,
      tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
    });

  }, []);

  useEffect(() => {
    csaStore.setTokenExpiration(0);
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 300000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <MessageBubble
      className="!m-0 !p-0"
      key={`success-contract-${contractDetails?.code}`}
      sender={MessageSenderType.Bot}
      ref={(ref) => ref && ref.scrollIntoView({ behavior: "smooth" })}
      isLast
    >
      {getDetailContents.showAnimation ? (
        hasExternalResidence ? (
          <img src={ExternalClientBanner} alt="External Client Banner" className="w-full" />
        ) : (
          <Lottie
            className={styles.lottieAnimation}
            animationData={successContract}
            loop
            autoplay
          />
        )
      ) : null}
      <Stack direction="column" space={24} paddingY={16} paddingX={16}>
        <div>
          <strong>{getDetailContents.title}</strong>
          <p className="text-base">{getDetailContents.description}</p>
        </div>
        {getDetailContents.numberAccount && (
          <div className="flex justify-center">
            <Stack
              className="rounded-3xl bg-gray-100 w-[80%]"
              direction="row"
              space={8}
              justify="center"
              align="center"
            >
              <strong className="my-2 text-2xl text-gray-700">
                {getDetailContents.numberAccount}
              </strong>
              <IonIcon
                onClick={() => handleCopyClipboard(getDetailContents.numberAccount)}
                className="text-link scale-125"
                name="copy-outline"
              />
            </Stack>
          </div>
        )}
        <Stack direction="column" space={16} paddingX={16}>
          {getDetailContents.numberAccount && !hasExternalResidence ? (
            <>
              <Button
                size="sm"
                label="Crear usuario y contraseña"
                onClick={handleLogIn}
              />
              <Button
                onClick={handleFinish}
                className="bg-white text-link font-normal"
                label="Cerrar"
                size="sm"
              />
            </>
          ) : (
            <>

              <div className="max-w-screen-md mx-auto rounded-lg font-sans overflow-hidden">
                <div
                  className="relative overflow-hidden py-4 px-4 sm:py-6 sm:px-6 lg:px-8 bg-[#D2006E] bg-no-repeat bg-right-bottom rounded-t-lg"
                  style={{ backgroundImage: `url("${svgBackgroundUrl}")` }}
                >
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-white text-left leading-snug">
                    Tu Tarjeta de {useCSAStore.getState().tipotarjeta.toLocaleLowerCase().toCapitalize()} terminada en {useCSAStore.getState().last6DigitsCard.slice(-4)} está activa
                  </h1>
                </div>

                <div className="p-3 sm:p-4 bg-[#2A244F] text-white flex flex-col items-center pl-4">
                  <h5 className="text-sm sm:pl-2 sm:text-base mb-3 text-left leading-relaxed">
                    {`${useCSAStore.getState().nombreTarjeta}, empieza a usar tu Tarjeta de ${useCSAStore.getState().tipotarjeta.toLocaleLowerCase().toCapitalize()} hecha especialmente para ti`}
                  </h5>

                  <div className="w-full mt-2 flex justify-center">
                    <img
                      src={getCardImageByBinAndAffinity()}
                      alt="Imagen tarjeta"
                      className="w-full max-w-[170px] sm:max-w-sm h-auto object-cover object-center block rounded-xl"
                    />
                  </div>

                  <div className="p-3 mt-4 rounded-md bg-[#1D1836] w-full">
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-center text-white">
                      Lleva el control de tu tarjeta
                    </h4>

                    <div className="flex flex-row gap-4 items-start justify-between w-full">
                      <div className="flex-1 text-left">
                        <p className="mb-3 text-gray-300 text-xs sm:text-sm leading-snug font-medium">
                          Conoce tu promedio mensual, consulta tus fechas de corte y tus transacciones en tiempo real.
                        </p>
                      </div>

                      <div className="w-20 sm:w-24 flex-shrink-0 h-auto sm:h-20">
                        <img
                          src={mobileImage}
                          alt="App mobile preview"
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>

                    </div>
                    <a
                      href="https://onelink.to/9jrts9?&?"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1.5 px-3 bg-white text-gray-900 rounded-md hover:bg-gray-200 transition text-xs font-bold"
                    >
                      Descarga la App
                    </a>
                  </div>
                </div>
              </div>


            </>
          )}
        </Stack>
      </Stack>
    </MessageBubble>
  );
});
