import { FC, memo, useEffect, useRef, useState } from "react";
import { Stack } from "@/components/Stack";
import {
  MessageBubble,
  MessageSenderType,
} from "@/view/pages/ContractSavingAccount/components/MessageBubble";
import {
  IMessageProps,
  IMessageState,
} from "@/view/pages/ContractSavingAccount/interfaces";
import { FacephiValidationModal } from "@/view/pages/ContractSavingAccount/modals";
import IonIcon from "@reacticons/ionicons";
import useStableBlast from "@/view/shared/hooks/useStableBlast";
import { Button } from "@/view/shared/components";

import { AlertTokenModal } from "@/view/pages/Recovery/modals/AlertModal/AlertModal";
import { useCSAStore } from "@/view/pages/ContractSavingAccount/store/useCSA";
import { SecureWebStorage, storageConstants } from "@/view/utils";
import { useToast } from "@/hooks";
import {
  CSAProccessStepType,
  useStepStore,
} from "@/view/pages/ContractSavingAccount/store/useStepStore";

interface Props extends IMessageProps {
  onEditIdentication: () => void;
  textBody?: string | React.ReactNode;
}

export const Biometric: FC<Props> = memo((props) => {
  const [openBiometric, setOpenBiometric] = useState(false);
  const [showBtnContinue, setShowBtnContinue] = useState(true);
  const [messageState, setMessageState] = useStableBlast<IMessageState>({
    editMode: true,
    hasExecuteOnce: false,
  });
  const [startTimer, setStartTimer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);

  const storage = new SecureWebStorage();
  const csaStore = useCSAStore();
  const { currentStep } = useStepStore();
  const toast = useToast();
  const bubbleRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialExpiration = useRef<number>(0);

  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.scrollIntoView({ behavior: "smooth" });
    }

  }, [openBiometric]);

  useEffect(() => {
    const expiration = Math.max(
      0,
      Math.round(csaStore.tokenExpiration - Math.floor(Date.now() / 1000))
    );
    setTimeRemaining(expiration);
    initialExpiration.current = expiration;
  }, [csaStore.tokenExpiration]);

  useEffect(() => {

    if (startTimer && initialExpiration.current > 0) {
      intervalRef.current = setInterval(() => {
        const secondsLeft = Math.max(
          0,
          Math.round(csaStore.tokenExpiration - Math.floor(Date.now() / 1000))
        );

        if (secondsLeft == Math.round(initialExpiration.current * 0.25)) {
          setOpenAlert(true);
        }

        if (secondsLeft <= 0) {
          setOpenAlert(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        setTimeRemaining(secondsLeft);
      }, 1000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [startTimer, csaStore.tokenExpiration]);

  const handleOpenBiometric = () => {

    setOpenBiometric(true);
  };

  return (
    <>
      <MessageBubble
        sender={MessageSenderType.Bot}
        className="min-w-[10dvw] p-7"
        ref={bubbleRef}
      >
        <Stack direction="column" space={16} className="min-w-[10dvw] p-7">
          {props.textBody && (
            typeof props.textBody === 'string'
              ? <p className="text-base">{props.textBody}</p>
              : props.textBody
          )}
          {showBtnContinue && (
            <Button label="Continuar" onClick={handleOpenBiometric} />
          )}
        </Stack>

      </MessageBubble>

      {!messageState.editMode && (
        <MessageBubble
          ref={(ref) => {
            if (ref) ref.scrollIntoView({ behavior: "smooth" });
          }}
          sender={MessageSenderType.User}
          section="GuiaBiometría"
        >
          <div className="flex justify-between items-center">
            <Stack direction="column">
              <strong className="text-base text-start">Foto</strong>
              <p className="text-base text-start">Identidad confirmada</p>
            </Stack>
            <IonIcon className="text-success pl-8 text-2xl" name="checkmark-circle" />
          </div>
        </MessageBubble>
      )}

      <FacephiValidationModal
        isOpen={openBiometric}
        onEditIdentification={props.onEditIdentication}
        onClose={() => setOpenBiometric(false)}
        onComplete={(firstName) => {
          setStartTimer(true);


          if (!openAlert) {
            setShowBtnContinue(false);
            setMessageState({ editMode: false });
            props.onComplete(firstName);

          } else {
            setOpenAlert(false);
            toast.success({
              title: "Tu identidad fue verificada exitosamente",
              description: "Continúa creando tu cuenta",
              icon: <IonIcon name="checkmark-circle" />,
            });

          }

          setOpenBiometric(false);
        }}
        reAuthenticate={openAlert}
      />
      <AlertTokenModal
        isOpen={openAlert && currentStep != CSAProccessStepType.Account}
        onClose={() => {
          setOpenAlert(false);
        }}
        onContinue={() => {

          storage.removeItem(storageConstants.ACCESS_TOKEN);
          setStartTimer(false);
          setOpenBiometric(true);
        }}
        timeRemaining={timeRemaining}
      />
    </>
  );
});
