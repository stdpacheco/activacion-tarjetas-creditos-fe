import { Stack } from "@/components/Stack";
import {
  MessageBubble,
  MessageSenderType,
} from "@/view/pages/ContractSavingAccount/components/MessageBubble";
import { Button } from "@/view/shared/components";
import { forwardRef, memo, PropsWithChildren, useState } from "react";

interface ISingleActionMessageProps {
  isLoading?: boolean;
  textBody?: string | React.ReactNode;
  textButton: string;
  onAction: () => void;
  className?: string;
}

export const SingleActionMessage = memo(
  forwardRef<HTMLDivElement, PropsWithChildren<ISingleActionMessageProps>>(
    ({ className, ...props }, ref?) => {
      const [showButton, setShowButton] = useState(true);

      return (
        <MessageBubble ref={ref} isLast sender={MessageSenderType.Bot} >
          <Stack direction="column" space={16}>
            {props.textBody && (
              typeof props.textBody === 'string'
                ? <p className="text-base">{props.textBody}</p>
                : props.textBody
            )}
            {showButton && (
              <Button
                size="sm"
                className={className}
                label={props.textButton}
                showSpinner={props.isLoading}
                onClick={() => {
                  setShowButton(false);
                  props.onAction();
                }}
              />
            )}
          </Stack>
        </MessageBubble>
      );
    }
  )
);
