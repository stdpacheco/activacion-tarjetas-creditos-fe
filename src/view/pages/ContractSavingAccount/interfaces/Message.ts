import { ReactNode } from "react";
import { MessageSenderType, MessageType } from "../types";

export interface IMessage {
  id?: string;
  type: MessageType;
  sender?: MessageSenderType;
  text?: string;
  isLast?: boolean;
  IC?: ReactNode;
}

export interface IMessageProps {
  onComplete: (result?: any) => void;
  onEdit?: () => void;
}

export interface IMessageStore {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  hasExecuteOnce: boolean;
  setHasExecuteOnce: (value: boolean) => void;
}

export interface IMessageState {
  editMode: boolean;
  hasExecuteOnce: boolean;
}
