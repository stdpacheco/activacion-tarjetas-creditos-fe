import { IMessageStore } from "../interfaces";

export const INITIAL_MESSAGE_STORE: IMessageStore = {
  isEditing: true,
  setIsEditing: () => {},
  hasExecuteOnce: false,
  setHasExecuteOnce: (_value) => {},
};
