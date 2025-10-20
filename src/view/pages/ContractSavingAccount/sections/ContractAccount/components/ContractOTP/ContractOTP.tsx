import {
  MessageBubble,
  MessageSenderType,
} from "@/view/pages/ContractSavingAccount/components/MessageBubble";
import {
  IMessageProps,
  IMessageState,
} from "@/view/pages/ContractSavingAccount/interfaces";
import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@/components/Stack";
import { BubbleFilled } from "@/view/pages/ContractSavingAccount/components/BubbleFilled";
import { Button } from "@/view/shared/components";
import { useForm, useWatch } from "react-hook-form";
import useStableBlast from "@/view/shared/hooks/useStableBlast";
import { useContractAccount, useGenerateOTP } from "@/actions/implementations";
import { useCSAStore } from "@/view/pages/ContractSavingAccount/store/useCSA";
import { useToast } from "@/hooks";
import { match } from "ts-pattern";
import { ContractsOTPTypeError } from "@/domain/Entities";
import { AnalyticsService, GTMEventName } from "@/services/analytics/AnalyticsService";
import { Controller } from "react-hook-form";
import cn from "classnames";
import { GeneralValidationModal } from "@/view/pages/ContractSavingAccount/modals";
import { useValidationModalStore } from "@/view/pages/ContractSavingAccount/store/useValidationModalStore";
import BlockOtpimage from "@/view/assets/csa/otpBlock.svg";
import erroIcon from "@/view/assets/activation/information-circle.svg";

export const ContractOTP: FC<IMessageProps> = memo((props) => {
  props;
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const otpForm = useForm<{ otp: string }>({ defaultValues: { otp: "" } });
  const reenvioCountRef = useRef(0);
  const [showSolicitarNuevo, setShowSolicitarNuevo] = useState(false);
  const otpValue = useWatch({
    control: otpForm.control,
    name: "otp",
  });

  const MAX_INTENTOS = 4;
  const TIEMPO_EXPIRACION_MIN = 5;
  const intentosFallidosRef = useRef(0);
  const fechaGeneracionOTPRef = useRef(new Date());

  const [messageState, setMessageState] = useStableBlast<IMessageState>({
    editMode: true,
    hasExecuteOnce: false,
  });

  const generateOTP = useGenerateOTP();
  const toast = useToast();
  const contractAccount = useContractAccount();
  const textResendButton = useMemo(() => {
    if (!canResend && !showSolicitarNuevo) {
      return `Reenviar código en 00:${String(countdown).padStart(2, "0")}`;
    }

    if (showSolicitarNuevo) {
      return "Solicitar uno nuevo";
    }

    const errorType = contractAccount.error?.name;

    return match(errorType)
      .with(ContractsOTPTypeError.IncorrectInputCode, () => "No me llegó el código")
      .when(
        (type) =>
          type === ContractsOTPTypeError.LimitIntends ||
          type === ContractsOTPTypeError.NumLimitIncorrectInputCode ||
          type === ContractsOTPTypeError.TimeExpired,
        () => "Solicitar uno nuevo"
      )
      .otherwise(() => "Solicitar uno nuevo");
  }, [contractAccount.error?.name, canResend, countdown, showSolicitarNuevo]);
  const handleReGenerateOTP = () => {
    setCanResend(false);
    setCountdown(59);
    setShowSolicitarNuevo(false);
    reenvioCountRef.current += 1;
    const afinidad = useCSAStore.getState().currentCard.data[0].afinidad!;
    const marca = useCSAStore.getState().currentCard.data[0].marca!;
    const tipoUsuario = useCSAStore.getState().currentCard.data[0].tipoTarjetaToUpper!;

    intentosFallidosRef.current = 0;
    fechaGeneracionOTPRef.current = new Date();

    if (reenvioCountRef.current > 1) {
      AnalyticsService.sendEvent({
        pasoProceso: GTMEventName.ReenviarCodigo,
        pageTitle: "Reenvio Otp",
        tipo_Tarjeta: useCSAStore.getState().tipotarjeta![0],
        section: "activación-modal-reenvio-otp",
        marca_afinidad: `${marca}-${afinidad}`,
        tipo_usuario: tipoUsuario === 'A' ? 'A' : 'P',
      });
    }


    generateOTP.mutate(
      {
        llaveOTP: "",
        ivOTP: "",
        aplicacion: "",
        servicio: "",
        canal: "",
        opidOTP: "",
        terminal: "",
        identificacion: useCSAStore.getState().identification,
        tipoIdentificacion: useCSAStore.getState().identification.trim().length == 10 ? "C" : "P",
        notificacion: "",
        smsOpid: "",
        smsOrigen: "",
        emailOrigen: "",
        emailAsunto: "",
        template: ""
      },
      {
        onSuccess: () => {
          otpForm.setValue("otp", "");
          otpForm.clearErrors();
        },
        onError: (err) => {
          toast.error({ description: err.message });
        },
      }
    );

  };

  useEffect(() => {
    setMessageState({
      editMode: true,
      hasExecuteOnce: false,
    });
    setCanResend(false);
    setCountdown(59);

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [generateOTP.isSuccess]);

  useEffect(() => {
    otpForm.clearErrors();
  }, [otpForm.watch("otp")]);

  useEffect(() => {
    !generateOTP.isPending && handleReGenerateOTP();
    setCanResend(false);
    setCountdown(59);

  }, []);

  useEffect(() => {
    const { identification } = useCSAStore.getState();
    const bloqueoKey = `BLOCK_${identification}`;
    const storedBlock = localStorage.getItem(bloqueoKey);

    if (storedBlock) {
      try {
        const parsedBlock = JSON.parse(storedBlock);
        const fechaBloqueo = new Date(parsedBlock.fecha);
        const ahora = new Date();
        const minutosPasados = (ahora.getTime() - fechaBloqueo.getTime()) / (1000 * 60);

        if (minutosPasados >= 25) {
          localStorage.removeItem(bloqueoKey);
          intentosFallidosRef.current = 0;
          fechaGeneracionOTPRef.current = new Date();
          otpForm.reset();
          setDeleteRequestModal(false);
          setCountdown(59);
          setCanResend(false);
        } else {
          setDeleteRequestModal(true);
        }
      } catch (error) {

        localStorage.removeItem(bloqueoKey);
      }
    }
  }, []);

  const handleContinue = () => {
    const ahora = new Date();
    const minutosPasados =
      (ahora.getTime() - fechaGeneracionOTPRef.current.getTime()) / (1000 * 60);
    if (minutosPasados > TIEMPO_EXPIRACION_MIN) {
      otpForm.setError("otp", {
        message:
          "Expiró el tiempo para ingresar el código que te enviamos. Solicita uno nuevo para continuar.",
      });
      return;
    }
    const { identification, last6DigitsCard } = useCSAStore.getState();
    contractAccount.mutate(
      {
        identificacion: identification,
        digito: last6DigitsCard,
        canal: "",
        otp: otpForm.getValues("otp")
      },
      {
        onSuccess: () => {

          setMessageState({ editMode: false });
          props.onComplete();
        },
        onError: () => {
          intentosFallidosRef.current++;
          const bloqueoKey = `BLOCK_${useCSAStore.getState().identification}`;
          if (intentosFallidosRef.current >= MAX_INTENTOS) {
            const yaReenvioTresVeces = reenvioCountRef.current >= 3;

            setShowSolicitarNuevo(true);
            if (yaReenvioTresVeces) {
              if (!localStorage.getItem(bloqueoKey)) {
                const bloqueoData = {
                  fecha: new Date().toISOString(),
                  cedula: useCSAStore.getState().identification,
                };
                localStorage.setItem(bloqueoKey, JSON.stringify(bloqueoData));
              }

              setDeleteRequestModal(true);
            }

            otpForm.setError("otp", {
              message:
                "Has excedido el límite de intentos con un código incorrecto. Solicita uno nuevo para continuar.",
            });


          } else {
            otpForm.setError("otp", {
              message: "El código ingresado no es válido. Verifica que esté bien escrito.",
            });

          }
        },
      }
    );
  };

  const csaValidationModals = useValidationModalStore();
  const [deleteRequestModal, setDeleteRequestModal] = useState(false);

  return (
    <>
      <GeneralValidationModal
        isOpen={deleteRequestModal}
        {...csaValidationModals.modal}
        title="Código de seguridad ingresado incorrectamente varias veces"
        description="Por favor, vuelve a intentarlo en 30 minutos"
        actionPrimary={{
          text: "Cerrar",
          onAction: () => {
            setDeleteRequestModal(false)
            window.location.reload();
          }
        }}
        image={BlockOtpimage}
      />

      <MessageBubble
        sender={messageState.editMode ? MessageSenderType.Bot : MessageSenderType.User}
        ref={(ref) =>
          ref &&
          setTimeout(() => {
            ref.scrollIntoView({ behavior: "smooth" });
          }, 1000)
        }
      >
        {messageState.editMode ? (
          <Stack direction="column" space={16} paddingY={8}>
            <Stack direction="column">
              <strong>
                {`Ingresa el código que te enviamos al ${localStorage.getItem("CSA_PHONE_NUMBER")}`}
              </strong>
              <p className="text-base">
                Código de seguridad
              </p>
            </Stack>
            <Controller
              name="otp"
              control={otpForm.control}
              rules={{

              }}
              render={({ field, fieldState: { error } }) => (
                <Stack direction="column" space={4} className="items-center sm:items-start">
                  <OtpInputVisual
                    value={field.value || ""}
                    onChange={field.onChange}
                    numInputs={6}
                    disabled={generateOTP.isPending || contractAccount.isPending}
                    hasError={!!error}
                    name={field.name}
                    aria-label="Código de seguridad OTP de 6 dígitos"
                  />
                  {error && (
                    <p className="text-red-500 text-xs px-1 self-start flex items-center gap-1">
                      <img
                        src={erroIcon}
                        alt="Error icon"
                        style={{ width: "16px", height: "16px", position: "relative", top: "-1px" }}
                      />
                      {error.message || "El código ingresado no es válido. Verifica que esté bien escrito."}
                    </p>
                  )}
                </Stack>
              )}
            />

            <Button
              size="sm"
              label="Activar tarjeta"
              disabled={otpValue.length < 6 || contractAccount.isPending || !!otpForm.getFieldState("otp").error}
              showSpinner={contractAccount.isPending}
              onClick={handleContinue}
            />
            <Button
              className="text-link bg-white font-normal underline"
              size="sm"
              disabled={!canResend && !showSolicitarNuevo}
              showSpinner={generateOTP.isPending}
              onClick={handleReGenerateOTP}
              label={textResendButton}
            />
          </Stack>
        ) : (
          <BubbleFilled fileds={[{ name: "Autorización", value: "Código validado" }]} />
        )}
      </MessageBubble>
    </>
  );
});

interface OtpInputVisualProps {
  value: string;
  onChange: (value: string) => void;
  numInputs?: number;
  disabled?: boolean;
  hasError?: boolean;
  name?: string;
  'aria-label'?: string;
}

const OtpInputVisual: React.FC<OtpInputVisualProps> = ({
  value = "",
  onChange,
  numInputs = 6,
  disabled = false,
  hasError = false,
  name = "otp",
  "aria-label": ariaLabel = "One time password"
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, "").slice(0, numInputs);
    onChange(newValue);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/\D/g, "")
      .slice(0, numInputs);
    onChange(pastedData);
  };


  const handleBoxClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div className="relative w-full max-w-[358px]" onClick={handleBoxClick}>


      <div className="flex w-full justify-between items-center gap-2 sm:gap-3">
        {[...Array(numInputs)].map((_, index) => {
          const char = value[index];
          const isFilled = char !== undefined && char !== '';

          return (
            <div
              key={index}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center",
                "text-2xl font-nunito-sans font-normal",
                "border",
                disabled
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : hasError
                    ? "bg-red-50 border-red-500 text-red-700"
                    : isFocused && index === value.length
                      ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500"
                      : isFilled
                        ? "bg-gray-100 border-gray-300 text-gray-800"
                        : "bg-gray-100 border-gray-300 text-gray-400"
              )}
              style={{

              }}
            >

              {isFilled ? char : ''}


            </div>
          );
        })}
      </div>


      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        name={name}
        aria-label={ariaLabel}
        value={value}
        placeholder={`${Math.floor(Math.random() * 9) + 1}`}
        onChange={handleInputChange}
        onPaste={handlePaste}
        maxLength={numInputs}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "absolute inset-0 w-full h-full bg-transparent border-none outline-none opacity-0",
          "text-[1px] text-transparent",
          "caret-transparent",
          disabled ? "cursor-not-allowed" : "cursor-text"
        )}
        autoComplete="one-time-code"
        autoFocus
      />
    </div>
  );
};
