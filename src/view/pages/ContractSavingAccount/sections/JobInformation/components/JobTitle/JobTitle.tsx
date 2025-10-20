import {
  MessageBubble,
  MessageSenderType,
} from "@/view/pages/ContractSavingAccount/components/MessageBubble";
import {
  IMessageProps,
  IMessageState,
} from "@/view/pages/ContractSavingAccount/interfaces";
import { FC, memo, useEffect } from "react";
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

export const JobTitle: FC<IMessageProps> = memo((props) => {
  const { control, watch, getValues, setValue } = useForm<{ jobTitle: string }>({
    defaultValues: { jobTitle: "" },
  });
  const [messageState, setMessageState] = useStableBlast<IMessageState>({
    editMode: true,
    hasExecuteOnce: false,
  });
  const stepUtilsStore = useStepStore();
  const jobInformationStore = useJobInformationStore();

  const handleContinue = () => {
    jobInformationStore.setJobTitle(getValues("jobTitle"));
    !messageState.hasExecuteOnce && props.onComplete();
    setMessageState({ editMode: false, hasExecuteOnce: true });
  };

  const historyStore = useHistoryStore();

  useEffect(() => {
    if (historyStore.hasHistoryStatus(ContractStepStatus.RegulatoryData)) {
      const jobTitle = historyStore.getHistoryValue(
        ContractStepStatus.RegulatoryData,
        HistoryFields.JobTitle
      ) as string;

      if (jobTitle) {
        setValue("jobTitle", jobTitle);
        handleContinue();
      }
    }
  }, []);

  return (
    <MessageBubble
      ref={(ref) => ref && ref.scrollIntoView()}
      sender={messageState.editMode ? MessageSenderType.Bot : MessageSenderType.User}
    >
      {messageState.editMode ? (
        <Stack direction="column" space={16} paddingY={8}>
          <h1 className="font-bold">Ahora, cuéntanos cuál es tu cargo</h1>
          <InputFilled
            label=""
            control={control}
            name="jobTitle"
            placeholder="Ej: Asistente"
          />
          <Button
            onClick={handleContinue}
            disabled={watch("jobTitle").length < 3}
            size="sm"
            label="Continuar"
          />
        </Stack>
      ) : (
        <BubbleFilled
          fileds={[
            {
              name: "Cargo",
              value: jobInformationStore.jobTitle,
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
