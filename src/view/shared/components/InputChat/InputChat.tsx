import { ChangeEvent, FC } from "react";
import { IonIcon } from "@ionic/react";
import { send } from "ionicons/icons";
import { classx } from "@/view/utils";
import styles from "./inputChat.module.scss";

interface InputChatProps {
  showSendBtn?: boolean;
  onClick?: () => void;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputChat: FC<InputChatProps> = ({
  showSendBtn = true,
  onClick,
  value,
  onChange,
}) => {
  return (
    <div className={styles.inputChatWrapper}>
      <label
        htmlFor="inputChat"
        aria-label="icon chat"
        className={classx(styles.inputChatIconWrapper, styles.inputChatIconWrapperLeft)}
      >
        <img src={""} alt="AssistantIcon" className={styles.inputChatIcon} />
      </label>

      <input
        type="text"
        id="inputChat"
        autoComplete="off"
        placeholder="Búsqueda"
        className={styles.inputChat}
        onClick={onClick}
        onChange={onChange}
        value={value}
      />

      {showSendBtn && (
        <button
          type="submit"
          aria-label="send button"
          className={classx(
            styles.inputChatSendBtn,
            styles.inputChatIconWrapper,
            styles.inputChatIconWrapperRight
          )}
        >
          <IonIcon
            icon={send}
            className={classx(
              styles.inputChatIconSend,
              value?.trim() && styles.inputChatIconSendValid
            )}
          />
        </button>
      )}
    </div>
  );
};
