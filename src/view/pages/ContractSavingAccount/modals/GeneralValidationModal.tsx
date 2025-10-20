import { Stack } from "@/components/Stack";

import { Button } from "@/view/shared/components";
import { Modal } from "@/view/shared/modals";
import { FC, useEffect } from "react";

interface IGeneralValidationModalProps {
  isOpen: boolean;
  image?: string;
  title?: string;
  description?: string;
  actionPrimary?: {
    text: string;
    onAction: () => void;
  };
  actionSecondary?: {
    text: string;
    onAction: () => void;
  };
  loading?: boolean;
}

export const GeneralValidationModal: FC<IGeneralValidationModalProps> = (props) => {
  

  const handlePrimaryAction = () => {
    if (props.actionPrimary?.onAction) {
     
      props.actionPrimary.onAction();
    }
  };

  const handleSecondaryAction = () => {
    if (props.actionSecondary?.onAction) {
      
      props.actionSecondary.onAction();
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      
    }
  }, [props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      className="items-end sm:items-center lg:items-center md:items-center"
      contentClass="max-w-[100%] h-auto lg:h-auto md:h-auto  sm:max-w-[100%] md:max-w-[70%] lg:max-w-[30%] grid items-center"
    >
      <div className="p-4">
        <Stack direction="column" space={32}>
          <h1 className="font-bold  text-center">{props?.title ?? ""}</h1>
          <div className="flex justify-center">
            {props?.image && <img src={props.image} />}
          </div>
          <p className="text-base text-center">{props.description ?? ""}</p>
          <div className="px-0 lg:px-8 sm:px-0 md:px-2 w-full">
            <Stack direction="column" space={16}>
              {props.actionPrimary && (
                <Button
                  className="text-base"
                  onClick={handlePrimaryAction}
                  label={props.actionPrimary.text}
                  size="sm"
                  showSpinner={props.loading || false}
                />
              )}
              {props.actionSecondary && (
                <button
                  className="text-base font-semibold p-2 underline text-link cursor-pointer"
                  onClick={handleSecondaryAction}
                  type="button"
                >
                  {props.actionSecondary.text}
                </button>
              )}
            </Stack>
          </div>
        </Stack>
      </div>
    </Modal>
  );
};
