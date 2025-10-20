import classNames from "classnames";
import { forwardRef, memo, PropsWithChildren, ReactNode, useEffect } from "react";
import { MessageSenderType } from "../types";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface IMessageBubbleProps {
  sender: MessageSenderType;
  text?: string;
  children?: ReactNode;
  isLast?: boolean;
  className?: string;
  section?: string;
}

const MessageBubble = memo(
  forwardRef<HTMLDivElement, PropsWithChildren<IMessageBubbleProps>>(
    ({ children, ...props }, ref?) => {

      const containerClasses = classNames("flex", {
        "justify-end": props.sender == MessageSenderType.User,
        "justify-start": props.sender == MessageSenderType.Bot,
      });
      const bubbleClasses = classNames(
        "relative",
        "px-5",
        "py-3",
        "rounded-2xl",
        "max-w-[90%] sm:max-w-[90%] md:max-w-[50%] lg:max-w-[40%]",
        "w-[fit-content]",
        {
          "bg-white": props?.sender == MessageSenderType.Bot,
          "bg-color-link-variant": props?.sender == MessageSenderType.User,
          "text-start": props?.sender == MessageSenderType.Bot,
          "text-end": props?.sender == MessageSenderType.User,
        }
      );

      const commonStyles = {
        "before:contents-['']": true,
        "before:absolute": true,
        "before:bottom-0": true,
        "before:h-5": true,
        "before:w-5": true,
        "after:contents-['']": true,
        "after:absolute": true,
        "after:bottom-0": true,
        "after:z-10": true,
        "after:h-5": true,
        "after:w-2": true,
      };

      const botStyles = {
        "before:left-[-8px]": true,
        "before:bg-white": true,
        "after:bg-color-tertiary": true,
        "after:left-[-8px]": true,
        "before:rounded-br-[16px]": true,
        "after:rounded-br-[16px]": true,
      };

      const userStyles = {
        "before:right-[-8px]": true,
        "before:bg-color-link-variant": true,
        "after:bg-color-tertiary": true,
        "before:rounded-bl-[16px]": true,
        "after:rounded-bl-[8px]": true,
        "after:right-[-8px]": true,
      };

      const tailClasess = classNames({
        ...(props.isLast ? commonStyles : ""),
        ...(props.isLast
          ? props.sender === MessageSenderType.Bot
            ? botStyles
            : userStyles
          : ""),
      });

      useEffect(() => {
        if (props.section == "GuiaBiometría") {
         
        }
      });

      return (
        <AnimatePresence>
          <motion.div
            ref={ref}
            className={clsx(containerClasses)}
            animate={{
              scale: 1,
              opacity: 1,
              transformOrigin: props.sender == MessageSenderType.Bot ? "left" : "right",
            }}
            initial={{
              scale: 0.75,
              opacity: 0,
              transformOrigin: props.sender == MessageSenderType.Bot ? "left" : "right",
            }}
          >
            <section className={clsx(bubbleClasses, props.className)}>
              {props.text ? <p className="text-base">{props.text}</p> : null}
              {children ? children : null}
              <div className={tailClasess}></div>
            </section>
          </motion.div>
        </AnimatePresence>
      );
    }
  )
);

export { MessageSenderType, MessageBubble };
