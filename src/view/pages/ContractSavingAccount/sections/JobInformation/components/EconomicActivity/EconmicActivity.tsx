import {
  MessageBubble,
  MessageSenderType,
} from "@/view/pages/ContractSavingAccount/components/MessageBubble";
import { FC, memo, useEffect } from "react";
import {
  IMessageProps,
  IMessageState,
} from "@/view/pages/ContractSavingAccount/interfaces";
import { useJobInformationStore } from "../../store/useJobInformationStore";
import { Stack } from "@/components/Stack";
import { BubbleFilled } from "@/view/pages/ContractSavingAccount/components/BubbleFilled";
import { Button, InputFilled } from "@/view/shared/components";
import { useForm } from "react-hook-form";
import { useCSAStore } from "@/view/pages/ContractSavingAccount/store/useCSA";
import { Edit } from "akar-icons";
import {
  CSAProccessStepType,
  useStepStore,
} from "@/view/pages/ContractSavingAccount/store/useStepStore";
import useStableBlast from "@/view/shared/hooks/useStableBlast";
import { useHistoryStore } from "@/view/pages/ContractSavingAccount/store/useHistoryStore";
import { ContractStepStatus, HistoryFields } from "@/domain/Entities";

export const EconomicActivity: FC<IMessageProps> = memo((props) => {
  const [messageState, setMessageState] = useStableBlast<IMessageState>({
    editMode: true,
    hasExecuteOnce: false,
  });
  const csaStore = useCSAStore();
  const jobInformation = useJobInformationStore();
  const { control, setValue, getValues, setFocus } = useForm<{
    ruc: string;
    activityName: string;
  }>({
    defaultValues: { ruc: `${csaStore.identification}001`, activityName: "" },
  });
  const stepUtils = useStepStore();

  const handelContinue = () => {
    jobInformation.setRuc(getValues("ruc"));
    !messageState.hasExecuteOnce && props.onComplete();
    setMessageState({ editMode: false, hasExecuteOnce: true });
  };

  const historyStore = useHistoryStore();

  useEffect(() => {
    if (historyStore.hasHistoryStatus(ContractStepStatus.RegulatoryData)) {
      const economicActivity = historyStore.getHistoryValue(
        ContractStepStatus.RegulatoryData,
        HistoryFields.EconomicActivity
      );

      if (economicActivity) {
        setValue("activityName", economicActivity.toTitleCase());
        jobInformation.setEconomicActivity({
          idCodigo: 0,
          strValor: economicActivity,
          strCodigoHost: "",
          strValor2: "",
          strValor3: "",
          strValor4: "",
          strValor5: "",
          strValorHost: "",
        });

        handelContinue();
      }
    }
  }, []);

  return (
    <MessageBubble
      sender={messageState.editMode ? MessageSenderType.Bot : MessageSenderType.User}
    >
      {messageState.editMode ? (
        <Stack direction="column" space={16} paddingY={8}>
          <Stack direction="column">
            <strong>Listo, llenamos tu RUC por ti</strong>
            <p className="text-base">
              Esta información es obtenida del SRI con tu cédula
            </p>
          </Stack>
          <InputFilled
            label="RUC"
            name="ruc"
            control={control}
            leadingIcon={
              <Edit
                className="text-link"
                onClick={() => {
                  setFocus("ruc");
                }}
              />
            }
          />
          <div
          >
            <InputFilled
              disabled={true}
              label="Actividad económica"
              name="activityName"
              control={control}
              leadingIcon={
                <Edit
                  className="text-link"
                />
              }
            />
          </div>
          <Button
            onClick={handelContinue}
            size="sm"
            disabled={jobInformation.economicActivity?.idCodigo == undefined}
            label="Continuar"
          />
        </Stack>
      ) : (
        <BubbleFilled
          editable={stepUtils.currentStep == CSAProccessStepType.Work}
          fileds={[
            { name: "RUC", value: jobInformation.ruc },
            {
              name: "Actividad económica",
              value: jobInformation.economicActivity.strValor.toTitleCase(),
            },
          ]}
          onEdit={() => {
            setMessageState({ editMode: true });
          }}
        />
      )}
    </MessageBubble>
  );
});
