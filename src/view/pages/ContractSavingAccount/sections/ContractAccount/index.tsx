import {
  FC,
  forwardRef,
  Fragment,
  memo,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { IMessage, ISeptionProps } from "../../interfaces";
import { MessageBubble } from "../../components/MessageBubble";
import { Stack } from "@/components/Stack";
import { MessageSenderType, MessageType } from "../../types";
import { useChatUtilStore } from "../../hooks/useChatUtils";
import {  ContractOTP, FinishContract } from "./components";

export const ContractAccountSection: FC<ISeptionProps> = memo(
  forwardRef<HTMLDivElement, PropsWithChildren<ISeptionProps>>(({ ...props }, ref?) => {
    const [showMessages, setShowMessages] = useState<IMessage[]>([]);
    const chatUtils = useChatUtilStore();

    const OTPMessages: IMessage[] = [
      {
        type: MessageType.Interactive,
        IC: (
          <ContractOTP
            onComplete={(_code: string) => {
              chatUtils.passToMessages<IMessage>({
                from: successContractMessages,
                to: (message) => setShowMessages((state) => [...state, message]),
              });
            }}
          />
        ),
      },
    ];

    const successContractMessages: IMessage[] = [
      {
        type: MessageType.Interactive,
        IC: <FinishContract onComplete={() => {}} />,
      },
    ];

    useEffect(() => {
      if (props.initiateLoad && showMessages.length == 0) {
        chatUtils.passToMessages<IMessage>({
          from: OTPMessages,
          to: (message) => setShowMessages((state) => [...state, message]),
        });
      }
    }, [props.initiateLoad]);

    return (
      <Fragment>
        {showMessages.length != 0 ? (
          <Stack ref={ref} direction="column" space={16}>
            {showMessages.map((msg, index) => {
              return msg?.type == MessageType.Text ? (
                <MessageBubble
                  key={index}
                  sender={msg.sender ?? MessageSenderType.Bot}
                  text={msg.text}
                  isLast={msg.isLast}
                />
              ) : (
                <Fragment key={index}>{msg.IC}</Fragment>
              );
            })}
          </Stack>
        ) : null}
      </Fragment>
    );
  })
);
