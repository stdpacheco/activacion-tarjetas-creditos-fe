import { useEffect } from "react";
import {
  MessageBubble,
  MessageSenderType,
} from "@/view/pages/ContractSavingAccount/components/MessageBubble";
import {
  IMessageProps,
  IMessageState,
} from "@/view/pages/ContractSavingAccount/interfaces";
import { FC, memo } from "react";
import { Stack } from "@/components/Stack";
import { Button, InputFilled } from "@/view/shared/components";
import { useForm } from "react-hook-form";
import { useJobInformationStore } from "../../store/useJobInformationStore";
import {
  CSAProccessStepType,
  useStepStore,
} from "@/view/pages/ContractSavingAccount/store/useStepStore";
import { BubbleFilled } from "@/view/pages/ContractSavingAccount/components/BubbleFilled";
import useStableBlast from "@/view/shared/hooks/useStableBlast";
import { useHistoryStore } from "@/view/pages/ContractSavingAccount/store/useHistoryStore";
import { ContractStepStatus, HistoryFields } from "@/domain/Entities";

export const EnterpriseName: FC<IMessageProps> = memo((props) => {
  const { control, watch, getValues, setValue } = useForm<{
    enterpriseName: string;
  }>({
    defaultValues: { enterpriseName: "" },
  });
  const [messageState, setMessageState] = useStableBlast<IMessageState>({
    editMode: true,
    hasExecuteOnce: false,
  });
  const stepUtilsStore = useStepStore();
  const jobInformationStore = useJobInformationStore();

  const handleContinue = () => {
    jobInformationStore.setEnterpriseName(getValues("enterpriseName"));
    !messageState.hasExecuteOnce && props.onComplete();
    setMessageState({ editMode: false, hasExecuteOnce: true });
  };

  const historyStore = useHistoryStore();

  useEffect(() => {
    if (historyStore.hasHistoryStatus(ContractStepStatus.RegulatoryData)) {
      const enterpriseName = historyStore.getHistoryValue(
        ContractStepStatus.RegulatoryData,
        HistoryFields.CompanyName
      ) as string;

      if (enterpriseName) {
        setValue("enterpriseName", enterpriseName);
        handleContinue();
      }
    }
  }, []);

  return (
    <MessageBubble
      sender={messageState.editMode ? MessageSenderType.Bot : MessageSenderType.User}
    >
      {messageState.editMode ? (
        <Stack direction="column" space={16} paddingY={8}>
          <h1 className="font-bold">
            Escribe el nombre de la empresa en la que trabajas
          </h1>
          <InputFilled
            label=""
            control={control}
            name="enterpriseName"
            placeholder="Ej: Banco Guayaquil"
          />
          <Button
            onClick={handleContinue}
            disabled={watch("enterpriseName").length < 3}
            size="sm"
            label="Continuar"
          />
        </Stack>
      ) : (
        <BubbleFilled
          fileds={[
            {
              name: "Nombre de la empresa",
              value: jobInformationStore.enterpriseName,
            },
          ]}
          editable={stepUtilsStore.currentStep == CSAProccessStepType.Work}
          onEdit={() => {
            setMessageState({ editMode: true });
          }}
        />
      )}
    </MessageBubble>
  );
});
