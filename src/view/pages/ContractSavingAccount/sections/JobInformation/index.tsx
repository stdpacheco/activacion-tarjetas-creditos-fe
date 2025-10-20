import {
  forwardRef,
  Fragment,
  memo,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { IMessage, ISeptionProps } from "../../interfaces";
import { Stack } from "@/components/Stack";
import { MessageSenderType, MessageType } from "../../types";
import { MessageBubble } from "../../components/MessageBubble";
import { useChatUtilStore } from "../../hooks/useChatUtils";

import { Button } from "@/view/shared/components";

export const JobInformationSection = memo(
  forwardRef<HTMLDivElement, PropsWithChildren<ISeptionProps>>(({ ...props }, ref?) => {
    const [showMessages, setShowMessages] = useState<IMessage[]>([]);
    const [action, setAction] = useState<
      { name: string; action: () => void } | undefined
    >(undefined);
    const chatUtils = useChatUtilStore();

    useEffect(() => {
      setAction(action);
    });

    const startedMessages: IMessage[] = [
      {
        type: MessageType.Text,
        text: "Ya estás más cerca de tener tu cuenta 👏🏼",
        sender: MessageSenderType.Bot,
      },
      {
        type: MessageType.Text,
        text: "Ya estás más cerca de tener tu cuenta 👏🏼",
        sender: MessageSenderType.Bot,
      },
    ];

    const hanldleInit = () => {
      chatUtils.passToMessages<IMessage>({
        from: startedMessages,
        to: (value) => setShowMessages((state) => [...state, value]),
      });
    };

    useEffect(() => {
      if (props.initiateLoad && showMessages.length == 0) {
        hanldleInit();
      }
    }, [props.initiateLoad]);

    return (
      <Fragment>
        {showMessages.length != 0 ? (
          <div ref={ref}>
            <Stack direction="column" space={16}>
              {showMessages.map((message, index) =>
                message.type == MessageType.Text ? (
                  <MessageBubble
                    key={index}
                    sender={message.sender ?? MessageSenderType.Bot}
                    text={message.text}
                    isLast={message.isLast}
                  />
                ) : (
                  <Fragment key={index}>{message.IC}</Fragment>
                )
              )}
            </Stack>
          </div>
        ) : null}
        {action ? (
          <div className="flex justify-center">
            <Button

              className="w-[90%] sm:w-[90%] md:w-[40%] lg:w-[24%]"
              size="sm"
              label={action.name}
              onClick={action.action}
            />
          </div>
        ) : null}
      </Fragment>
    );
  })
);
