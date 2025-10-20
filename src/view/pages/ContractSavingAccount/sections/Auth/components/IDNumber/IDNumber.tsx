import { FC, memo, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageBubble, MessageSenderType } from '../../../../components/MessageBubble';
import { Stack } from '@/components/Stack';
import SegmentedControl, {
  IdType,
} from '../../../../../ContractSavingAccount/components/SegmentedControl';

import { Button, InputFilled } from '@/view/shared/components';
import { IMessageProps, IMessageState } from '@/view/pages/ContractSavingAccount/interfaces';
import { useBiometricSecurity, useObtenerDatosCedula } from '@/actions/implementations';
import { TermsAndConditionsModal } from '@/view/pages/ContractSavingAccount/modals';

import { useCSAStore } from '@/view/pages/ContractSavingAccount/store/useCSA';

import {
  CSAProccessStepType,
  useStepStore,
} from '@/view/pages/ContractSavingAccount/store/useStepStore';
import useStableBlast from '@/view/shared/hooks/useStableBlast';
import { BubbleFilled } from '@/view/pages/ContractSavingAccount/components/BubbleFilled';
import { AnalyticsService, GTMEventName } from '@/services/analytics/AnalyticsService';

import { InputPatterns } from '@/view/utils';
import { getToken } from '@/services';
import { getSafeFirstName } from '@/actions/helpers/names';

export const IDNumber: FC<IMessageProps> = memo((props) => {
  const [messageState, setMessageState] = useStableBlast<IMessageState>({
    editMode: true,
    hasExecuteOnce: false,
  });
  const formIdentification = useForm<{
    identification: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      identification: '',
    },
  });
  formIdentification;
  const code = formIdentification.watch('identification');
  useEffect(() => {
    if (blockedByError) {
      setBlockedByError(false);
      formIdentification.clearErrors('identification');
    }
  }, [code]);
  const [blockedByError, setBlockedByError] = useState(false);

  const [activeTab, setActiveTab] = useState<IdType>('cedula');
  const preValidation = useBiometricSecurity();
  const getInfoPersona = useObtenerDatosCedula();
  const IDRef = useRef<HTMLDivElement | null>(null);
  const [disabledContinue, setDisabledContinue] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const csaStore = useCSAStore();
  const stepUtils = useStepStore();

  useEffect(() => {
    AnalyticsService.sendEvent({
      pasoProceso: GTMEventName.Validacion,
      pageTitle: 'ModalValidacionIdentificacion',
      section: 'activación-inicio',
    });
  }, []);

  useEffect(() => {
    const subscription = formIdentification.watch((value) => {
      preValidation.reset();
      const id = value.identification;

      const isValid =
        activeTab === 'cedula' ? /^\d{10}$/.test(id || '') : /^[A-Z0-9]{6,20}$/i.test(id || '');

      if (!isValid) {
      }

      setDisabledContinue(!isValid);
    });

    return () => subscription.unsubscribe();
  }, [formIdentification.watch, activeTab]);

  useEffect(() => {
    formIdentification.setValue('identification', '');
  }, [activeTab]);

  const handleContinue = async () => {
    csaStore.setIdentification(formIdentification.getValues('identification'));
    csaStore.setTipoIdentification(activeTab === 'cedula' ? 'CEDULA' : 'PASAPORTE');
    setDisabledContinue(true);

    await getToken(formIdentification.getValues('identification'));

    getInfoPersona.mutate(
      {
        identificacion: useCSAStore.getState().identification,
      },
      {
        onSuccess: (data) => {
          if (!data.success || !data.data || data.code == 500) {
            props.onComplete(true);
            setMessageState({ editMode: false, hasExecuteOnce: true });
            return;
          }
          csaStore.setFingerprintCode(data.data.codigoDactilar);
          csaStore.setFirstName(getSafeFirstName(data?.data?.nombres));

          formIdentification.clearErrors();
          props.onComplete(true);
          setMessageState({ editMode: false, hasExecuteOnce: true });
        },

        onError: (error) => {
          formIdentification.setError('identification', {
            message: error.message,
          });
        },
      }
    );
  };

  return (
    <MessageBubble
      ref={(ref) => {
        if (ref) {
          IDRef.current = ref;
          IDRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      sender={messageState.editMode ? MessageSenderType.Bot : MessageSenderType.User}
      isLast
    >
      {messageState.editMode ? (
        <Stack direction="column" space={16} paddingY={8}>
          <strong>Ingresa la cédula o pasaporte del titular de la tarjeta</strong>

          <SegmentedControl
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              csaStore.setTipoIdentification(tab === 'cedula' ? 'CEDULA' : 'PASAPORTE');
              formIdentification.clearErrors();
            }}
          />

          <InputFilled
            label=""
            name="identification"
            rules={{
              required: 'Este campo es obligatorio',
              minLength: {
                value: activeTab === 'cedula' ? 10 : 6,
                message:
                  activeTab === 'cedula'
                    ? 'Debe tener 10 dígitos'
                    : 'Debe tener al menos 6 caracteres',
              },
              maxLength: {
                value: activeTab === 'cedula' ? 10 : 11,
                message:
                  activeTab === 'cedula'
                    ? 'Debe tener 10 dígitos'
                    : 'Debe tener entre 9 y 11 caracteres',
              },
              pattern: {
                value: activeTab === 'cedula' ? /^[0-9]+$/ : /^[A-Za-z0-9]+$/,
                message: activeTab === 'cedula' ? 'Solo números' : 'Solo letras o números',
              },
            }}
            pattern={activeTab === 'cedula' ? InputPatterns.number : InputPatterns.text}
            maxlength={activeTab === 'cedula' ? 10 : 11}
            placeholder={activeTab === 'cedula' ? 'Ej: 1712345678' : 'Ej: A654321'}
            control={formIdentification.control}
          />

          <div className="px-2">
            <Button
              size="sm"
              disabled={disabledContinue || preValidation.isPending || blockedByError}
              showSpinner={preValidation.isPending}
              onClick={handleContinue}
              label="Continuar"
            />
          </div>
        </Stack>
      ) : (
        <BubbleFilled
          editable={stepUtils.currentStep == CSAProccessStepType.Personal}
          fileds={[
            {
              name: activeTab === 'cedula' ? 'Cédula' : 'Pasaporte',
              value: useCSAStore.getState().identification,
            },
          ]}
          onEdit={() => {
            props.onEdit && props.onEdit();
            setMessageState({
              editMode: true,
              hasExecuteOnce: props.onEdit == undefined,
            });
            IDRef.current?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              IDRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      )}
      <TermsAndConditionsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </MessageBubble>
  );
});
