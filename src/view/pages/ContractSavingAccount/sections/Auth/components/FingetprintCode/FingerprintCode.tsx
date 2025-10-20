import { FC, memo, useEffect, useRef, useState } from "react";
import { MessageBubble, MessageSenderType } from "../../../../components/MessageBubble";
import { Stack } from "@/components/Stack";
import { useForm } from "react-hook-form";
import { Button, InputFilled } from "@/view/shared/components";
import { IMessageProps } from "@/view/pages/ContractSavingAccount/interfaces";
import { useBiometricSecurity, useGetPendientesActivarTarjeta, } from "@/actions/implementations";
import { useCSAStore } from "@/view/pages/ContractSavingAccount/store/useCSA";
import useStableBlast from "@/view/shared/hooks/useStableBlast";
import { BubbleFilled } from "@/view/pages/ContractSavingAccount/components/BubbleFilled";
import { InputPatterns } from "@/view/utils";

interface IStateMessage {
  editMode: boolean;
  hasExecuteOnce: boolean;
}

export const FingerprintCode: FC<IMessageProps> = memo((props) => {
  const formFingerprintCode = useForm<{
    fingerpintCode: string;
  }>({

  });
  const [messageState, setMessageState] = useStableBlast<IStateMessage>({
    editMode: true,
    hasExecuteOnce: false,
  });
  const fingerpintCode = useBiometricSecurity();
  const getPendientesActivar = useGetPendientesActivarTarjeta();


  const code = formFingerprintCode.watch("fingerpintCode");
  useEffect(() => {
    if (blockedByError) {
      setBlockedByError(false);
      formFingerprintCode.clearErrors("fingerpintCode");
    }
  }, [code]);
  const [blockedByError, setBlockedByError] = useState(false);
  const disabledContinue = !/^\d{6}$/.test(formFingerprintCode.watch("fingerpintCode"));
  const [showLoadingService, setshowLoadingService] = useState(false);
  const csaStore = useCSAStore();
  const IDRef = useRef<HTMLDivElement | null>(null);

  const handleContinue = async () => {

    const seiDigito = String(formFingerprintCode.getValues("fingerpintCode"));
    const token = useCSAStore.getState().token;

    setshowLoadingService(true);

    useCSAStore.setState((_) => ({
      last6DigitsCard: seiDigito
    }));


    if (token.length > 1) {
      getPendientesActivar.mutate(
        {
          identificacion: csaStore.identification,
          digito: seiDigito,
          canal: "WEB"
        },
        {
          onSuccess: (data) => {
            setshowLoadingService(false);
            if (data?.code != 0) {

              formFingerprintCode.setError("fingerpintCode", {
                message: `No se pudo validar la tarjeta. Intenta nuevamente.`,
              });

              setBlockedByError(true);
              return;

            }

            csaStore.setLast6DigitsCard(formFingerprintCode.getValues("fingerpintCode"));
            csaStore.setCurrentCard(data);
            csaStore.setPhoneNumber(data.data[0].celular);


            if (data?.data?.[0]?.razonGenera.includes("DB")) {
              useCSAStore.getState().setTipotarjeta("Débito");
            } else {
              useCSAStore.getState().setTipotarjeta("Crédito");
            }

            !messageState.hasExecuteOnce && props.onComplete();
            setMessageState({ editMode: false, hasExecuteOnce: true });

          },

          onError: (err) => {
            setshowLoadingService(false);
            formFingerprintCode.setError("fingerpintCode", {
              message: err.message,
            });
            return;
          },
        }
      );
    } else {

      formFingerprintCode.setError("fingerpintCode", {
        message: `En este momento no tienes activaciones pendientes.`,
      });

      setshowLoadingService(false);

    }

  };


  return (
    <MessageBubble
      ref={(ref) => {
        if (ref) {
          setTimeout(() => ref.scrollIntoView({ behavior: "smooth" }), 100);
        }
      }}
      sender={messageState.editMode ? MessageSenderType.Bot : MessageSenderType.User}
      isLast
    >
      {messageState.editMode ? (
        <Stack direction="column" space={16}>

          <div>
            <InputFilled
              label="Escribe los 6 últimos dígitos de la tarjeta que quieres activar"
              control={formFingerprintCode.control}
              maxlength={6}
              rules={{
                pattern: {
                  value: RegExp("/^[a-zA-Z0-9]{6}$"),
                  message: "dígitos incorrectos",
                },
              }}
              name="fingerpintCode"
              pattern={InputPatterns.number}
              placeholder="Ej:123456"
              onTextProcess={(text) => text.toUpperCase()}
            />
          </div>
          <div className="px-2">
            <Button
              disabled={disabledContinue || fingerpintCode.isPending || blockedByError}
              onClick={handleContinue}
              showSpinner={showLoadingService}
              label="Continuar"
              size="sm"

            />
          </div>
        </Stack>
      ) : (
        <BubbleFilled
          editable={true}
          fileds={[{
            name: (() => {
              const razonGenera = useCSAStore.getState().currentCard?.data?.[0]?.razonGenera;

              if (!razonGenera) return "Tarjeta de Crédito";

              return razonGenera.toLowerCase().includes("db")
                ? "Tarjeta de Débito"
                : "Tarjeta de Crédito";
            })(),
            value: formFingerprintCode.getValues("fingerpintCode"),

          }]}
          onEdit={() => {
            props.onEdit && props.onEdit();
            setMessageState({
              editMode: true,
              hasExecuteOnce: props.onEdit == undefined,
            });
            IDRef.current?.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              IDRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        />
      )}
    </MessageBubble>
  );
});
