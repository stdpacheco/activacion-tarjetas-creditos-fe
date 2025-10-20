import { create } from "zustand";
import { useHistoryStore } from "../store/useHistoryStore";

export const useChatUtilStore = create<{

  loading: boolean;
  setLoading: (value: boolean) => void;
  passToMessages: <T>(params: {
    from: T[];
    to: (value: T) => void;
    onComplete?: () => void;
    delay?: number;
  }) => Promise<void>;
}>()((set, _get) => {
  return {
    loading: false,
    setLoading: (value: boolean) => {
      set({ loading: value });
    },
    passToMessages: async ({ from, to, delay = 1000, onComplete }) => {
      const historyStore = useHistoryStore.getState();

      set({ loading: true });
      setTimeout(
        () => {
          from.forEach(async (item, index, array) => {
            await new Promise<void>((resolve) => {
              setTimeout(
                () => {
                  to(item);
                  resolve();
                },
                historyStore.loadingHistory ? 0 : delay * index
              );
            });
            if (array.length == index + 1) {
              setTimeout(
                () => {
                  set({ loading: false });
                  onComplete && onComplete();
                },
                historyStore.loadingHistory ? 0 : delay * 1.2
              );
            }
          });
        },
        historyStore.loadingHistory ? 0 : delay
      );
    },
  };
});
