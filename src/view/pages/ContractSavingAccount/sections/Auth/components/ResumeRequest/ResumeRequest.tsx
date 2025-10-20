import { FC, memo, useEffect, useRef } from "react";
import { MessageBubble, MessageSenderType } from "../../../../components/MessageBubble";
import { Stack } from "@/components/Stack";
import { Button } from "@/view/shared/components";
import { IMessageProps } from "@/view/pages/ContractSavingAccount/interfaces";
export const ResumeRequest: FC<IMessageProps> = memo((props) => {
  const IDRef = useRef<HTMLDivElement | null>(null);

  const handleContinue = () => {
   

    props.onComplete();
  };

  useEffect(() => {
    
  }, []);

  return (
    <MessageBubble
      ref={(ref) => {
        if (ref) {
          IDRef.current = ref;
          IDRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }}
      sender={MessageSenderType.Bot}
      isLast
    >
      <Stack direction="column" space={8} paddingY={8}>
        <strong>Encontramos una solicitud con datos que llenaste previamente</strong>

        <p className="text-base">
          Continúa desde donde te quedaste y obtén tu Cuenta de Ahorros en pocos minutos
        </p>

        <div className="px-2 pt-4">
          <Button size="sm" onClick={handleContinue} label="Continuar" />
        </div>
      </Stack>
    </MessageBubble>
  );
});
